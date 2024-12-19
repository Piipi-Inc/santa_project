import Background from "./images/bg.svg?react";
import styles from "./index.module.scss";
import cn from "classnames";

const getText = (isAdmin, isStarted, adminUserName) => {
  if (isAdmin && isStarted) return "заново";
  if (isAdmin && !isStarted) return "начать";
  if (!isAdmin && !isStarted)
    return `игра начнется,<br/>когда решит @${adminUserName}`;
  return `игра<br/>завершилась`;
};

export const LobbyButton = ({
  className,
  isAdmin,
  adminUserName,
  isStarted,
}: {
  className?: string;
  isAdmin: boolean;
  adminUserName: string;
  isStarted: boolean;
}) => {
  const rootStyles = cn(styles.lobbyButton, className, {
    [styles.lobbyButton__isNonAdmin]: !isAdmin,
  });

  return (
    <div className={rootStyles}>
      <Background className={styles.background} />
      <span
        className={styles.text}
        dangerouslySetInnerHTML={{
          __html: getText(isAdmin, isStarted, adminUserName),
        }}
      />
    </div>
  );
};
