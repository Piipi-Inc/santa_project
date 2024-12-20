import BackButton from "src/shared/components/BackButton";
import styles from "./index.module.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "src/store";
import { useState } from "react";
import { Elf } from "src/shared/components/Elf";

const UserPage = observer(() => {
  const {
    goBack,
    user: { userInfo, saveUserName, saveUserPreferences },
  } = useStore();

  const [preferencesValue, setPreferencesValue] = useState(
    userInfo.preferences
  );
  const [nameValue, setNameValue] = useState(userInfo.name);

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreferencesValue(e.target.value);
  };

  const handleNameChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const saveNewName = async () => {
    if (userInfo.name === nameValue) return;
    await saveUserName(nameValue);
  };

  const saveNewPreferences = async () => {
    if ((userInfo.preferences = preferencesValue)) return;
    await saveUserPreferences(preferencesValue);
  };

  return (
    <div className={styles.userPage}>
      <BackButton className={styles.backButton} onClick={goBack} />
      <span className={styles.title}>Моё письмо</span>

      <div className={styles.letter}>
        <span className={styles.letter__title}>
          На Новый год за все свои
          <br />
          мучения я хочу получить:
        </span>
        <textarea
          className={styles.textarea}
          onChange={handleChangeInput}
          value={preferencesValue}
          placeholder="хочу..."
          maxLength={140}
        />
      </div>

      {preferencesValue !== userInfo.preferences && (
        <button className={styles.button} onClick={saveNewPreferences}>
          изменить
        </button>
      )}

      <div className={styles.side_panel}>
        <Elf className={styles.icon} username={userInfo.username} />

        <div className={styles.userInfo}>
          <span className={styles.username}>@{userInfo.username}</span>
          <span className={styles.nameWrap}>
            <input
              onChange={handleNameChangeInput}
              className={styles.name}
              value={nameValue}
            />
            {userInfo.name !== nameValue && (
              <span onClick={saveNewName} className={styles.pen} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
});

export default UserPage;
