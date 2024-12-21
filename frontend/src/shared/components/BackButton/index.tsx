import cn from 'classnames';
import styles from './index.module.scss';

type Props = {
  className: string;
  onClick: () => void;
};

const BackButton = ({ className, onClick }: Props) => {
  return <div className={cn(styles.back, className)} onClick={onClick} />;
};

export default BackButton;
