import styles from "./index.module.scss";
import cn from "classnames";

export const Title = ({ className }: { className: string }) => {
  return <h1 className={cn(styles.title, className)}>Тайный Санта</h1>;
};
