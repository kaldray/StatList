import { Suspense } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

import { ErrorProps } from "next/error";

import { Loader } from "@components/index";
import styles from "@styles/Pages/global.module.scss";
import { UserTopArtist } from "types/deezer";

const DeezerArtistCard = dynamic(async () => await import("@components/Deezer/DeezerArtistCard"), { suspense: true });

const Error = dynamic(async () => await import("next/error"));

export const ArtistWrapper = (): JSX.Element => {
  const { container } = styles;

  const fetcher = async (url: string): Promise<UserTopArtist> => {
    const res = await fetch(url);
    return await res.json();
  };

  type FetcherType = Parameters<typeof fetcher>;

  const { data, error, isValidating } = useSWR<UserTopArtist | undefined, ErrorProps>(
    ["/api/deezer/artists"],
    async ([url]: [FetcherType["0"]]) => await fetcher(url),
    { keepPreviousData: true, revalidateOnFocus: false }
  );

  return (
    <>
      <section className={container}>
        {error != null && <Error statusCode={error.statusCode} />}
        {data !== undefined &&
          data.data.length > 0 &&
          data.data.map((item, index) => {
            return (
              <Suspense fallback={<Loader />} key={item.id}>
                <DeezerArtistCard index={index + 1} items={item} isValidating={isValidating} />
              </Suspense>
            );
          })}
      </section>
    </>
  );
};
