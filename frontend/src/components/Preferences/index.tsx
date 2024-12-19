import cn from "classnames";
import styles from "./index.module.scss";
import { useStore } from "src/store";
import { Elf } from "src/shared/components/Elf";
import { Title } from "src/shared/components/Title";
import { observer, useLocalObservable } from "mobx-react-lite";
import { PreferencesStore } from "./store";
import { useRef } from "react";

const Preferences = observer(() => {
  const {
    user: {
      saveUserPreferences,
      userInfo: { username },
    },
    screenStore: { setScreen },
  } = useStore();

  const store = useLocalObservable(
    () => new PreferencesStore({ saveUserPreferences, setScreen })
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
      <div className={styles.letter}>
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
