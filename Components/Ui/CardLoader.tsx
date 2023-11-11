import styles from "@styles/Components/CardLoader.module.scss";
import global from "@styles/Pages/global.module.scss";

interface CardLoaderProps {
  itemsLength: number;
}

export const CardLoader = ({ itemsLength }: CardLoaderProps): JSX.Element => {
  const { card__container } = styles;
  const { container } = global;
  return (
    <>
      <section className={container}>
        {Array(itemsLength)
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
