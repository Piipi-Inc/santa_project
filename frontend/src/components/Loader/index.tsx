import SantaImage from 'shared/images/santa.svg?react';
import { Title } from 'shared/components/Title';
import styles from './index.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Title className={styles.title} />
      <SantaImage className={styles.image} />
    </div>
  );
};

export default Loader;
