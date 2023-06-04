import styles from "@styles/Components/TrackLoader.module.scss";

import global from "@styles/Pages/global.module.scss";

type TrackLoaderProps = {
  itemsLength: number;
};

export const TrackLoader = ({ itemsLength }: TrackLoaderProps): JSX.Element => {
  const { track__container } = styles;
  const { container } = global;
  return (
    <>
      <div className={container}>
        {Array(itemsLength)
          .fill(20)
          .map(() => {
            return (
              <>
                <div style={{ opacity: 0.5 }} className={track__container}>
                  <p></p>
                  <span></span>
                  <div></div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};
