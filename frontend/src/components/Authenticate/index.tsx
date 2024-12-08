import { Title } from "src/shared/components/Title";
import styles from "./index.module.scss";
import { Speech } from "src/shared/components/Speech";

const Authenticate = () => {
  return (
    <div className={styles.authenticate}>
      <Title className={styles.title} />
      <div className={styles.image} />
      <Speech
        className={styles.speech}
        textClassName={styles.speechText}
        text="и кто же ты?"
      />
    </div>
  );
};

export default Authenticate;
