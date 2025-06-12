import { FC } from "react";

import styles from "@styles/Components/NoData.module.scss";

export const NoData: FC = () => {
  const { info__container } = styles;
  return (
    <div className={info__container}>
      <p>Désolé vous n&apos;avez pas assez de données ! Essayez une autre période</p>
    </div>
  );
};
