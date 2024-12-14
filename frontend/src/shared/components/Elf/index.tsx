import styles from "./index.module.scss";
import { simpleHash } from "src/shared/utils/simpleHash";
import { useStore } from "src/store";
import cn from 'classnames';

const elfAmount = 7

export const Elf = ({className}: {className: string}) => {
    const {currentUser} = useStore()
    const elfNum = simpleHash(currentUser.username) % elfAmount + 1
    return <div className={cn(styles.elf, styles[`elf_${elfNum}`], className)} />
}
