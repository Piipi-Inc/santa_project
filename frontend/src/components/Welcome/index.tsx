import { Title } from 'shared/components/Title';
import { Speech } from 'shared/components/Speech';
import { useStore } from 'store';
import styles from './index.module.scss';

const Welcome = () => {
  const { handleWelcomeScenario } = useStore();

  const buttons = [
    { text: 'да', callback: () => handleWelcomeScenario('login') },
    { text: 'нет', callback: () => handleWelcomeScenario('register') }
  ];

  return (
    <div className={styles.welcome}>
      <Title className={styles.title} />
      <div className={styles.image} />
      <Speech className={styles.speech} textClassName={styles.speechText} text="знакомы?" />
      <div className={styles.buttonWrap}>
        {buttons.map((answer, index) => (
          <button onClick={answer.callback} key={index} className={styles.button}>
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
