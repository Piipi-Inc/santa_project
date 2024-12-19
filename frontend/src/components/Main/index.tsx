import React, { useRef } from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { useStore } from "src/store";
import styles from "./index.module.scss";
import { Elf } from "src/shared/components/Elf";
import { LobbyTable } from "./components/LobbyTable";

const Main = observer(() => {
  const {
    lobbiesStore: { userLobbies, joinLobby, createLobby, goToLobby },
    user: { userInfo },
  } = useStore();

  const lobbyCodeRef = useRef("");
  const lobbyNameRef = useRef("");

  const handleJoinLobby = async () => {
    if (lobbyCodeRef.current === "") return;

    await joinLobby({ lobby_id: lobbyCodeRef.current });
  };

  const handleCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    lobbyCodeRef.current = e.target.value;
  };

  const handleLobbyNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    lobbyNameRef.current = e.target.value;
  };

  const handleCreateLobby = () => {
    if (!lobbyNameRef.current) return;

    createLobby({lobby_name: lobbyNameRef.current})
  }

  return (
    <div className={styles.main}>
      {userInfo && (
        <div className={styles.avatarWrap}>
          <Elf username={userInfo.username} className={styles.avatar} />
        </div>
      )}
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
            onChange={handleCodeInputChange}
            id="password"
          />
        </div>
        <button className={styles.button} onClick={handleJoinLobby} />
      </div>

      <div className={styles.lobbies}>
        <h4 className={styles.lobbies__title}>Мои лобби</h4>
        <div className={styles.create__wrap}>
          <span className={styles.create__label}>Создать лобби</span>
          <span className={styles.create__inputWrap}>
            <input
              placeholder="название"
              maxLength={29}
              className={styles.create__input}
              onChange={handleLobbyNameInputChange}
              id="lobbyName"
            />
          </span>

          <span className={styles.create__icon} onClick={handleCreateLobby} />
        </div>
        <LobbyTable userLobbies={userLobbies} goToLobby={goToLobby} />
      </div>
    </div>
  );
});

export default Main;
