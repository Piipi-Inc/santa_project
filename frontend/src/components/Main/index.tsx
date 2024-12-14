import React, { useRef } from "react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { useStore } from "src/store";
import styles from "./index.module.scss";
import { Elf } from "src/shared/components/Elf";
import { LobbyTable } from "./components/LobbyTable";

const Main = observer(() => {
  const {
    lobbiesStore: { userLobbies, joinLobby },
    user: { userInfo },
  } = useStore();

  const lobbyCodeRef = useRef("");

  const handleJoinLobby = async () => {
    if (lobbyCodeRef.current === "") return;

    await joinLobby({ lobby_id: lobbyCodeRef.current });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    lobbyCodeRef.current = e.target.value;
  };

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
            onChange={handleInputChange}
            id="password"
          />
        </div>
        <button className={styles.button} onClick={handleJoinLobby} />
      </div>

      <div className={styles.lobbies}>
        <h4 className={styles.lobbies__title}>Мои лобби</h4>
        <div className={styles.buttons__wrap}>
          <span className={styles.button__label}>Создать лобби</span>
        </div>
        <LobbyTable userLobbies={userLobbies} />
      </div>
    </div>
  );
});

export default Main;
