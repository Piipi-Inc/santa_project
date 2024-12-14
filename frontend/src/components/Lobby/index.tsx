import styles from "./index.module.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "src/store";

const Lobby = observer(() => {
  const {
    lobbiesStore: { currentLobby },
    user: { userInfo },
  } = useStore();

  if (!currentLobby || !userInfo) return;

  const { lobby_id, lobby_name, is_admin } = currentLobby;

  return (
    <div className={styles.lobby}>
      <div className={styles.header}>
        <span className={styles.lobby__code}>{currentLobby.lobby_id}</span>
        <span className={styles.lobby__name}>{currentLobby.lobby_name}</span>
        {is_admin && <span className={styles.lobby__admin}>создатель: вы</span>}
      </div>
      {currentLobby.participants.map((participant) => (
        <span key={participant.id}>{participant.name}</span>
      ))}
    </div>
  );
});

export default Lobby;
