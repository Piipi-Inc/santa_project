import cn from "classnames";
import styles from "./index.module.scss";
import { simpleHash } from "src/shared/utils/simpleHash";

const elfAmount = 7;

export const Elf = ({
  username,
  className,
}: {
  username: string;
  className: string;
}) => {
  const elfNum = (simpleHash(username) % elfAmount) + 1;
  return <div className={cn(styles.elf, styles[`elf_${elfNum}`], className)} />;
};
