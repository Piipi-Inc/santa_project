import { Elf } from "src/shared/components/Elf";
import styles from "./index.module.scss";

export const Participant = ({
  username,
  name,
}: {
  username: string;
  name: string;
}) => {
  return (
    <div className={styles.participant}>
      <div className={styles.iconWrap}>
        <Elf className={styles.icon} username={username} />
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  );
};
