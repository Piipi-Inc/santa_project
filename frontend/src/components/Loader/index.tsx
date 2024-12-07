import styles from "./index.module.scss";
import SantaImage from "./imgs/santa.svg?react";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <h1 className={styles.title}>Тайный Санта</h1>
      <SantaImage className={styles.image} />
    </div>
  );
};

export default Loader;
