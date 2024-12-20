import cn from "classnames";
import styles from "./index.module.scss";
import { useStore } from "src/store";
import { Elf } from "src/shared/components/Elf";
import { Title } from "src/shared/components/Title";
import { observer, useLocalObservable } from "mobx-react-lite";
import { PreferencesStore } from "./store";
import { useRef } from "react";
import mark1 from "./images/mark_1.png";
import mark2 from "./images/mark_2.png";
import mark3 from "./images/mark_3.png";
import mark4 from "./images/mark_4.png";

const Preferences = observer(() => {
  const {
    user: {
      saveUserPreferences,
      userInfo: { username },
      saveStoryTellingCompleted,
    },

    screenStore: { setScreen },
  } = useStore();

  const store = useLocalObservable(
    () =>
      new PreferencesStore({
        saveUserPreferences,
        setScreen,
        saveProgress: saveStoryTellingCompleted,
      })
  );

  const preferencesRef = useRef("");

  const handlePreferencesInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    preferencesRef.current = e.target.value;
  };

  const handleButtonClick = () => {
    if (preferencesRef.current === "") return;

    store.handleButtonClick({ preferences: preferencesRef.current });
  };

  return (
    <div className={styles.preferences}>
      <Title className={styles.title} />
      <Elf className={styles.elf} username={username} />
      <div
        className={cn(
          styles.letter,
          store.isRunningAnimation && styles.letter_disappear
        )}
      >
        <div
          className={cn(
            styles.letter__content,
            store.isRunningAnimation && styles.letter__content_hidden
          )}
        >
          <span className={styles.letter__title}>
            На Новый год за все свои
            <br />
            мучения я хочу получить:
          </span>
          <textarea
            onChange={handlePreferencesInput}
            className={styles.textarea}
            placeholder="хочу..."
            maxLength={140}
          />
        </div>
        <div
          className={cn(
            styles.address,
            store.isRunningAnimation && styles.address_visible
          )}
        >
          <span className={styles.address__text}>
            <b>Кому:</b> Санте
          </span>
          <span className={styles.address__text}>
            <b>Куда:</b> Амэрика
          </span>
        </div>
        <div
          className={cn(
            styles.cover,
            store.isRunningAnimation && styles.cover_visible
          )}
        />
        <div
          className={cn(
            styles.marks,
            store.isRunningAnimation && styles.marks_visible
          )}
        >
          <img className={cn(styles.mark, styles.mark_4)} src={mark4} />
          <img className={cn(styles.mark, styles.mark_2)} src={mark2} />
          <img className={cn(styles.mark, styles.mark_3)} src={mark3} />
          <img className={cn(styles.mark, styles.mark_1)} src={mark1} />
        </div>
      </div>

      <div
        className={cn(
          styles.button,
          store.isRunningAnimation && styles.button_hidden
        )}
        onClick={handleButtonClick}
      >
        отправить
      </div>
    </div>
  );
});

export default Preferences;
