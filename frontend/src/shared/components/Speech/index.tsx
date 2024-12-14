import cn from 'classnames';
import styles from './index.module.scss';

export function Speech({
  className,
  textClassName,
  text,
}: {
  className: string;
  textClassName: string;
  text: string;
}) {
  return (
    <div className={cn(styles.speech, className)}>
      <span className={cn(styles.text, textClassName)}>{text}</span>
    </div>
  );
}
