import styles from "./index.module.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "src/store";
import { Participant } from "./components/Participant";
import { LobbyButton } from "./components/LobbyButton";

const Lobby = observer(() => {
  const {
    lobbiesStore: { currentLobby },
    user: { userInfo },
  } = useStore();

  if (!currentLobby || !userInfo) return;

  const { lobby_id, lobby_name, admin_username, is_started } = currentLobby;
  const isAdmin = admin_username === userInfo.username;
  const creatorUsername = isAdmin ? "вы" : `@${admin_username}`;

  return (
    <div className={styles.lobby}>
      <div className={styles.header}>
        <span className={styles.lobby__code}>{lobby_id}</span>
        <span className={styles.lobby__name}>{lobby_name}</span>
        <span className={styles.lobby__admin}>
          создатель: {creatorUsername}
        </span>
      </div>
      <div className={styles.letter} />
      <LobbyButton
        className={styles.button}
        isAdmin={isAdmin}
        adminUserName={admin_username}
        isStarted={is_started}
      />
      <div className={styles.content}>
        <span className={styles.elfs}>Эльфы</span>
        <div className={styles.participants}>
          {currentLobby.participants.map((participant) => (
            <Participant
              key={participant.id}
              name={participant.name}
              username={participant.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Lobby;
