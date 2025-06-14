import { lazy } from "react";

// import { ArtistWrapper } from "@src/components/Spotify/ArtistWrapper";
import { useSearchParams } from "react-router";

const PeriodChoice = lazy(() => import("@src/components/PeriodChoice"));

export const clientLoader = async () => {
  const res = await fetch("/api/spotify/client");
  return await res.json();
};

const Artist = () => {
  const [queryParams, setQueryParams] = useSearchParams();

  function getShortTermArtist(): void {
    setQueryParams({ time_range: "short_term" });
  }

  function getLongTermArtist(): void {
    setQueryParams({ time_range: "long_term" });
  }

  function getMediummTermArtist(): void {
    setQueryParams({ time_range: "medium_term" });
  }

  return (
    <>
      <PeriodChoice
        getShortTermArtist={getShortTermArtist}
        getLongTermArtist={getLongTermArtist}
        getMediummTermArtist={getMediummTermArtist}
      />
      {/* <ArtistWrapper queryParams={queryParams} /> */}
    </>
  );
};

export default Artist;
