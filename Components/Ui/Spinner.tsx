import styles from "@styles/Components/Spinner.module.scss";

export const Spinner = () => {
  const { spinner } = styles;
  return (
    <>
      <div className={spinner}></div>
    </>
  );
};
