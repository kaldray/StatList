import React from "react";

import styles from "@styles/Components/Pagination.module.scss";

type PaginationProps = {
  nextPage: () => void;
  previousPage: () => void;
  previousIsActive: boolean;
  nextIsActive: boolean;
};

export const Pagination = ({ nextPage, previousPage, previousIsActive, nextIsActive }: PaginationProps) => {
  const { pagination__container } = styles;
  return (
    <>
      <div className={pagination__container}>
        <button aria-disabled={previousIsActive} disabled={previousIsActive} onClick={previousPage}>
          Précédent
        </button>
        <button disabled={nextIsActive} onClick={nextPage}>
          Suivant
        </button>
      </div>
    </>
  );
};
