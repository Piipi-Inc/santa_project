import React, { useRef } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store';
import styles from './index.module.scss';

const Main = observer(() => {
  const {
    lobbiesStore: { userLobbies, joinLobby },
  } = useStore();

  const lobbyCodeRef = useRef('');

  const handleJoinLobby = async () => {
    if (lobbyCodeRef.current === '') return;

    await joinLobby({ lobby_id: lobbyCodeRef.current });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    lobbyCodeRef.current = e.target.value;
  };

  return (
    <div className={styles.main}>
      <h3 className={styles.title}>Выбери лобби</h3>
      <div className={styles.inputBlock}>
        <div className={styles.inputWrap}>
          <label className={styles.label} htmlFor="password">
            Найти лобби:
          </label>
          <input
            placeholder="код"
            maxLength={6}
            className={styles.input}
            onChange={handleInputChange}
            id="password"
          />
        </div>
        <button className={styles.button} onClick={handleJoinLobby} />
      </div>

      <div className={styles.lobbies}>
        <h4 className={styles.lobbies__title}>Мои лобби</h4>

        <div className={styles.lobbies__list}>
          {userLobbies?.map((lobby) => (
            <div
              key={lobby.lobby_code}
              className={cn(
                styles.lobby,
                lobby.is_started && styles.lobby__finished,
              )}
            >
              <span className={styles.lobby__code}>{lobby.lobby_code}</span>
              <span className={styles.lobby__name}>{lobby.lobby_name}</span>
              <span className={styles.lobby__participants}>
                {lobby.is_started && 'игра прошла'}
                {!lobby.is_started && `${lobby.participants_count} эльфа`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Main;
