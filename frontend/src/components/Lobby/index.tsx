import { useState } from "react";
import styles from "./index.module.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "src/store";
import { Participant } from "./components/Participant";
import { LobbyButton } from "./components/LobbyButton";
import BackButton from "src/shared/components/BackButton";
import Letter from "./components/Letter";

const Lobby = observer(() => {
  const {
    lobbiesStore: { currentLobby, currentGift },
    user: { userInfo },
    goBack,
  } = useStore();

  if (!currentLobby || !userInfo) return;

  const { lobby_id, lobby_name, admin_username, is_started } = currentLobby;
  const isAdmin = admin_username === userInfo.username;
  const creatorUsername = isAdmin ? "вы" : `@${admin_username}`;

  const [isLetterVisible, setIsLetterVisible] = useState(false);

  return (
    <div className={styles.lobby}>
      <BackButton className={styles.backBtn} onClick={goBack} />
      <div className={styles.header}>
        <span className={styles.lobby__code}>{lobby_id}</span>
        <span className={styles.lobby__name}>{lobby_name}</span>
        <span className={styles.lobby__admin}>
          создатель: {creatorUsername}
        </span>
      </div>
      {currentLobby.is_started && currentGift && <div className={styles.letter} onClick={() => setIsLetterVisible(true)} />}
      {isLetterVisible && <Letter setIsLetterVisible={setIsLetterVisible} />}
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
              has_gift={participant.has_gift}
              is_started={currentLobby.is_started}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Lobby;
