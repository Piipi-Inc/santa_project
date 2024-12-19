import { Title } from 'src/shared/components/Title';
import { Speech } from 'src/shared/components/Speech';
import { useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import cn from 'classnames';
import { useStore } from 'src/store';
import { AuthenticateScreenStore } from './store';
import styles from './index.module.scss';
import BackButton from 'src/shared/components/BackButton';

const Authenticate = observer(() => {
  const { authenticate, goBack, auth_scenario, handleRegisterEnd } = useStore();
  const store = useLocalObservable(
    () => new AuthenticateScreenStore({ authenticate, auth_scenario, handleRegisterEnd }),
  );
  const {
    run,
    step,
    handleLoginInput,
    isLoginValid,
    handleSubmitLogin,
    isPasswordValid,
    handlePasswordInput,
    handleSubmitPassword,
    isNameValid,
    handleNameInput,
    handleSubmitName,
    handleInputClick,
    isLoginFailed,
  } = store;

  useEffect(() => {
    run();
  }, []);

  return (
    <div className={styles.authenticate}>
      <BackButton className={styles.backBtn} onClick={goBack} />
      <Title className={styles.title} />

      <div className={cn(
        styles.image,
        isLoginFailed && styles.image_failedLogin,
        step === 'finish' && styles.image_finish
      )} />
      <Speech
        className={cn(
          styles.speech,
          isLoginFailed && styles.speech_failedLogin,
          step === 'name' && styles.speech_name,
          step === 'finish' && styles.speech_finish
        )}
        textClassName={cn(
          styles.speechText,
          isLoginFailed && styles.speechText_failedLogin,
          step === 'name' && styles.speechText_name,
          step === 'finish' && styles.speechText_finish,
        )}
        text={
          isLoginFailed
          ? "я такого не знаю!"
          : step === 'name'
          ? "а зовут то тебя как?"
          : step === 'finish'
          ? "оk, я тебя запомню."
          : "и кто же ты?"
        }
      />
      <div
        className={cn(
          styles.inputBlock,
          styles.inputBlock__login,
          styles[`inputBlock__login-${step}`],
        )}
      >
        <div className={styles.inputWrap}>
          <label className={styles.label} htmlFor="login">
            Логин:
          </label>
          <input
            onClick={() => handleInputClick('login')}
            onChange={handleLoginInput}
            maxLength={13}
            className={styles.input}
            id="login"
          />
        </div>
        <button
          onClick={handleSubmitLogin}
          className={cn(styles.button, isLoginValid && styles.button_active)}
        />
      </div>
      <div
        className={cn(
          styles.inputBlock,
          styles.inputBlock__password,
          styles[`inputBlock__password-${step}`],
        )}
      >
        <div className={styles.inputWrap}>
          <label className={styles.label} htmlFor="password">
            Пароль:
          </label>
          <input
            onChange={handlePasswordInput}
            maxLength={13}
            className={styles.input}
            id="password"
          />
        </div>
        <button
          onClick={handleSubmitPassword}
          className={cn(styles.button, isPasswordValid && styles.button_active)}
        />
      </div>

      <div
        className={cn(
          styles.inputBlock,
          styles.inputBlock__name,
          styles[`inputBlock__name-${step}`],
        )}
      >
        <div className={styles.inputWrap}>
          <label className={styles.label} htmlFor="name">
            Имя:
          </label>
          <input
            onChange={handleNameInput}
            maxLength={13}
            className={styles.input}
            id="name"
          />
        </div>
        <button
          onClick={handleSubmitName}
          className={cn(styles.button, isNameValid && styles.button_active)}
        />
      </div>
    </div>
  );
});

export default Authenticate;
