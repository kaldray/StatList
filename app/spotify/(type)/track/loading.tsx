import { TrackLoader } from "@components/Ui/TrackLoader";

export default async function SpotifyLoading() {
  return (
    <>
      <TrackLoader itemsLength={20} />;
    </>
  );
}
