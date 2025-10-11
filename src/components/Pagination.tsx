import styles from "@styles/Components/Pagination.module.scss";
import type { PaginationProps } from "@src/types/Components";
import { useTransition } from "react";

const Pagination = ({
  nextPageAction,
  previousPageAction,
  previousIsActive,
  nextIsActive,
  dataLenght,
}: PaginationProps) => {
  const { pagination__container } = styles;
  const [isPendingPrev, startTransitionPrev] = useTransition();
  const [isPendingNext, startTransitionNext] = useTransition();

  if (dataLenght === 0) {
    return null;
  }

  async function nextPage() {
    startTransitionNext(async () => {
      await nextPageAction();
    });
  }
  async function previousPage() {
    startTransitionPrev(async () => {
      await previousPageAction();
    });
  }

  return (
    <>
      <div className={pagination__container}>
        <button
          style={{ opacity: isPendingPrev ? "0.3" : "1" }}
          aria-disabled={previousIsActive}
          disabled={previousIsActive}
          onClick={previousPage}>
          Précédent
        </button>
        <button style={{ opacity: isPendingNext ? 0.3 : 1 }} disabled={nextIsActive} onClick={nextPage}>
          Suivant
        </button>
      </div>
    </>
  );
};

export default Pagination;
