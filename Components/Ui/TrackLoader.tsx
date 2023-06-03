import styles from "@styles/Components/TrackLoader.module.scss";

import global from "@styles/Pages/global.module.scss";

export const TrackLoader = (): JSX.Element => {
  const { track__container } = styles;
  const { container } = global;
  return (
    <>
      <div className={container}>
        {Array(20)
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
