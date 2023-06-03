import styles from "@styles/Components/CardLoader.module.scss";
import global from "@styles/Pages/global.module.scss";

export const CardLoader = (): JSX.Element => {
  const { card__container } = styles;
  const { container } = global;
  return (
    <>
      <section className={container}>
        {Array(20)
          .fill(20)
          .map(() => {
            return (
              <>
                <div style={{ opacity: 0.5 }} className={card__container}>
                  <p></p>
                  <span></span>
                  <div></div>
                </div>
              </>
            );
          })}
      </section>
    </>
  );
};
