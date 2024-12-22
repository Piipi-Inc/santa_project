import cn from 'classnames';
import styles from './index.module.scss';
import { Title } from 'shared/components/Title';
import { useStore } from 'store';
import { Elf } from 'shared/components/Elf';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { StoryTellingStore } from './store';
import { useEffect } from 'react';
import { Screens } from 'store/screen/types/enums';

const StoryTelling = observer(() => {
  const {
    screenStore: { setScreen },
    user: { userInfo }
  } = useStore();

  const store = useLocalObservable(() => new StoryTellingStore());

  const handleButtonClick = () => {
    setScreen(Screens.PREFERENCES);
  };

  useEffect(() => {
    store.run();
  }, []);

  return (
    <div className={styles.storyTelling}>
      <Title className={styles.title} />

      <div className={cn(styles.santaWrap, styles[`santaWrap_${store.step}`])}>
        <div className={styles.santa} />
        <div className={styles.bubble}>
          <span className={styles.text}>пойду-ка я хорошенько нажрусь</span>
        </div>
      </div>
      <div className={cn(styles.elfWrap, styles[`elfWrap_${store.step}`])}>
        {userInfo && <Elf className={styles.elf} username={userInfo.username} />}
        <div className={styles.bubble}>
          <span className={styles.text}>
            Ёбаный старый
            <br />
            дед, ты обещал
            <br />
            нам тоже подарки.
            <br />
            Ну и детям там...
          </span>
        </div>
      </div>
      <div className={cn(styles.button, store.step === 'finish' && styles.button__visible)} onClick={handleButtonClick}>
        дальше
      </div>
    </div>
  );
});

export default StoryTelling;
