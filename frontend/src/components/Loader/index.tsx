import styles from "./index.module.scss";
import SantaImage from "src/shared/images/santa.svg?react";
import { Title } from "src/shared/components/Title";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Title className={styles.title} />
      <SantaImage className={styles.image} />
    </div>
  );
};

export default Loader;
