import styles from "@styles/Components/CardLoader.module.scss";

export const CardLoader = () => {
  const { card__container } = styles;
  return (
    <>
      <div className={card__container}>
        <p></p>
        <span></span>
        <div></div>
      </div>
    </>
  );
};
