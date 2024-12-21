import { Elf } from 'shared/components/Elf';
import styles from './index.module.scss';
import cn from 'classnames';

export const Participant = ({
  username,
  name,
  has_gift,
  is_started
}: {
  username: string;
  name: string;
  has_gift: boolean;
  is_started: boolean;
}) => {
  return (
    <div className={cn(styles.participant, is_started && !has_gift && styles.participant_noGift)}>
      <div className={styles.iconWrap}>
        <Elf className={styles.icon} username={username} />
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  );
};
