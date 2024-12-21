import styles from './index.module.scss';
import { useStore } from 'store';

type Props = {
  setIsLetterVisible: (value: boolean) => void;
};

const Letter = ({ setIsLetterVisible }: Props) => {
  const {
    lobbiesStore: { currentGift }
  } = useStore();

  const replaceLinks = (text: string): string => {
    const urlRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;

    const result = text.replace(urlRegex, (match) => {
      return `<a href="${match}">ссылка</a>`;
    });

    return result;
  };

  if (!currentGift) return null;

  return (
    <div className={styles.letterPopUp}>
      <div className={styles.letter}>
        <div className={styles.letterIntro}>На Новый год за все свои мучения я хочу получить:</div>
        <div
          className={styles.letterPreferences}
          dangerouslySetInnerHTML={{
            __html: replaceLinks(currentGift?.preferences || '')
          }}
        ></div>
      </div>
      <div className={styles.info}>
        <span className={styles.infoUsername}>
          Твой подарок получит
          <br />@{currentGift.username}
        </span>
        <span className={styles.infoName}>({currentGift.name})</span>
        <div className={styles.backBtn} onClick={() => setIsLetterVisible(false)}></div>
      </div>
    </div>
  );
};

export default Letter;
