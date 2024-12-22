import BackButton from 'shared/components/BackButton';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import { useState } from 'react';
import { Elf } from 'shared/components/Elf';

const UserPage = observer(() => {
  const {
    goBack,
    init,
    user: { userInfo, saveUserName, saveUserPreferences, logout }
  } = useStore();

  const [preferencesValue, setPreferencesValue] = useState(userInfo?.preferences || '');
  const [nameValue, setNameValue] = useState(userInfo?.name || '');

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreferencesValue(e.target.value);
  };

  const handleNameChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleExitBtnClick = async () => {
    await logout();
    await init();
  };

  const saveNewName = async () => {
    if (userInfo?.name === nameValue) return;
    await saveUserName(nameValue);
  };

  const saveNewPreferences = async () => {
    if (userInfo?.preferences === preferencesValue || !preferencesValue) return;
    await saveUserPreferences({ preferences: preferencesValue });
  };

  if (!userInfo) return null;

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
          value={preferencesValue ?? ''}
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
            <input onChange={handleNameChangeInput} className={styles.name} value={nameValue} />
            {userInfo?.name !== nameValue && <span onClick={saveNewName} className={styles.pen} />}
          </span>
          <span className={styles.exitBtn} onClick={handleExitBtnClick}>
            выйти
          </span>
        </div>
      </div>
    </div>
  );
});

export default UserPage;
