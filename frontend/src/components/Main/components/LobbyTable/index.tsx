import cn from "classnames";
import styles from "./index.module.scss";
import { UserLobby } from "src/api/types/types";

export const LobbyTable = ({ userLobbies }: { userLobbies: UserLobby[] }) => {
  return (
    <div className={styles.lobbies__list}>
      {userLobbies?.map((lobby) => (
        <div
          key={lobby.lobby_code}
          className={cn(
            styles.lobby,
            lobby.is_started && styles.lobby__finished
          )}
        >
          <span className={styles.lobby__code}>{lobby.lobby_code}</span>
          <span className={styles.lobby__name}>{lobby.lobby_name}</span>
          <span className={styles.lobby__participants}>
            {lobby.is_started && "игра прошла"}
            {!lobby.is_started && `${lobby.participants_count} эльфа`}
          </span>
        </div>
      ))}
    </div>
  );
};