import BackButton from 'shared/components/BackButton';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store';
import { useState, useRef, useLayoutEffect } from 'react';
import { Elf } from 'shared/components/Elf';
import { replaceWithLink, setEndOfContenteditable, extractUrlsAndText } from 'shared/utils/replaceWithLink';

const UserPage = observer(() => {
  const {
    goBack,
    init,
    user: { userInfo, saveUserName, saveUserPreferences, logout }
  } = useStore();

  const [changePreferencesVisible, setChangePreferencesVisible] = useState(false);
  const [nameValue, setNameValue] = useState(userInfo?.name || '');
  const letterRef = useRef<HTMLDivElement | null>(null);
  const letterValue = useRef(userInfo?.preferences || '');

  const handleChangeInput = (e: any) => {
    if (letterValue.current !== userInfo.preferences && !changePreferencesVisible) setChangePreferencesVisible(true);
    letterValue.current = e.target.innerHTML;
    letterRef.current.innerHTML = replaceWithLink(letterValue.current);
    setEndOfContenteditable(letterRef.current);
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
    if (userInfo?.preferences === letterValue.current || !letterValue) return;
    setChangePreferencesVisible(false);
    await saveUserPreferences({ preferences: extractUrlsAndText(letterValue.current) });
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
        <div
          contentEditable
          ref={letterRef}
          dangerouslySetInnerHTML={{ __html: replaceWithLink(letterValue.current) }}
          className={styles.textarea}
          suppressContentEditableWarning={true}
          onInput={handleChangeInput}
          placeholder="хочу..."
          maxLength={140}
        />
      </div>

      {changePreferencesVisible && (
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
