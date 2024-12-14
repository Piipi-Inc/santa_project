import cn from 'classnames';
import styles from './index.module.scss';

export function Title({ className }: { className: string }) {
  return <h1 className={cn(styles.title, className)}>Тайный Санта</h1>;
}
