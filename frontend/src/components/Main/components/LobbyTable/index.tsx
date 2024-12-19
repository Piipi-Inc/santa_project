import cn from "classnames";
import styles from "./index.module.scss";
import { UserLobby } from "src/api/types/types";

export const LobbyTable = ({
  userLobbies,
  goToLobby,
}: {
  userLobbies: UserLobby[];
  goToLobby: ({ lobbyId }: { lobbyId: string; }) => Promise<void>
}) => {
  return (
    <div className={styles.lobbies__list}>
      {userLobbies?.map((lobby) => {
        const handleGoToLobby = () => goToLobby({lobbyId: lobby.lobby_code})
        return ( <div
          key={lobby.lobby_code}
          className={cn(
            styles.lobby,
            lobby.is_started && styles.lobby__finished
          )}
          onClick={handleGoToLobby}
        >
          <span className={styles.lobby__code}>{lobby.lobby_code}</span>
          <span className={styles.lobby__name}>{lobby.lobby_name}</span>
          <span className={styles.lobby__participants}>
            {lobby.is_started && "игра прошла"}
            {!lobby.is_started && `${lobby.participants_count} эльфа`}
          </span>
        </div>
      )})}
    </div>
  );
};
