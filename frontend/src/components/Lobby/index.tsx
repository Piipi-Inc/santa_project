import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useStore } from 'store';
import { Participant } from './components/Participant';
import { LobbyButton } from './components/LobbyButton';
import BackButton from 'shared/components/BackButton';
import Letter from './components/Letter';
import { LobbyStore } from './store';
import cn from 'classnames';
import { wait } from 'shared/utils/wait';

const Lobby = observer(() => {
  const {
    lobbiesStore,
    lobbiesStore: { currentLobby, currentGift, startGame, restartGame },
    user: { userInfo },
    goBack
  } = useStore();

  const store = useLocalObservable(() => new LobbyStore({ lobbiesStore }));
  const [clickedCopy, setClickedCopy] = useState(false);

  useEffect(() => {
    if (currentLobby) store.init({ lobbyId: currentLobby.lobby_id });

    return () => store.dispose();
  }, []);

  if (!currentLobby || !userInfo) return;

  const { lobby_id, lobby_name, admin_username, is_started } = currentLobby;
  const isAdmin = admin_username === userInfo.username;
  const creatorUsername = isAdmin ? 'вы' : `@${admin_username}`;

  const handleStartGame = () => {
    if (isAdmin && !currentLobby.is_started) {
      startGame({ isAdmin });
      return;
    }

    if (isAdmin && currentLobby.is_started) {
      restartGame({ isAdmin });
    }
  };

  const copyToClipBoard = async () => {
    setClickedCopy(true);
    const textarea = document.createElement('textarea');

    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.left = '-9999px';

    textarea.value = lobby_id;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand('copy');

    document.body.removeChild(textarea);

    await wait(3000);
    setClickedCopy(false);
  };

  const isLetterPreviewVisible = currentLobby.is_started && currentGift;

  return (
    <div className={styles.lobby}>
      <BackButton className={styles.backBtn} onClick={goBack} />
      <div className={styles.header}>
        <div className={styles.codeWrap}>
          <span className={styles.lobby__code}>{lobby_id}</span>
          <span className={cn(styles.copyCode, clickedCopy && styles.copyCode_copied)} onClick={copyToClipBoard}></span>
        </div>
        <span className={styles.lobby__name}>{lobby_name}</span>
        <span className={styles.lobby__admin}>создатель: {creatorUsername}</span>
      </div>

      <div
        className={cn(styles.letter, isLetterPreviewVisible && styles.letter__visible)}
        onClick={() => store.setIsLetterVisible(true)}
      />

      {store.isLetterVisible && <Letter setIsLetterVisible={store.setIsLetterVisible} />}
      <LobbyButton
        className={styles.button}
        isAdmin={isAdmin}
        adminUserName={admin_username}
        isStarted={is_started}
        onClick={handleStartGame}
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
