import styles from "@styles/Components/PeriodChoice.module.scss";

export const PeriodChoiceLoader = () => {
  const { search__container__loader } = styles;
  return (
    <>
      <div className={search__container__loader}>
        <h1></h1>
        <div>
          {Array(3)
            .fill(3)
            .map((val, index) => (
              <button key={index}></button>
            ))}
        </div>
      </div>
    </>
  );
};
