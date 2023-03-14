import styles from "@styles/Components/TrackLoader.module.scss";

export const TrackLoader = (): JSX.Element => {
  const { track__container } = styles;
  return (
    <>
      <div className={track__container}>
        <span></span>
        <p></p>
        <div></div>
      </div>
    </>
  );
};
