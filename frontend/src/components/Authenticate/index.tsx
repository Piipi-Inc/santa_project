import { Title } from "src/shared/components/Title";
import styles from "./index.module.scss";
import { Speech } from "src/shared/components/Speech";
import { useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { AuthenticateScreenStore } from "./store";
import cn from "classnames";
import { useStore } from "src/store";

const Authenticate = observer(() => {
  const { handleAuth } = useStore();
  const store = useLocalObservable(
    () => new AuthenticateScreenStore({ handleAuth })
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
  } = store;

  useEffect(() => {
    run();
  }, []);

  return (
    <div className={styles.authenticate}>
      <Title className={styles.title} />
      <div className={styles.image} />
      <Speech
        className={styles.speech}
        textClassName={styles.speechText}
        text="и кто же ты?"
      />
      <div
        className={cn(
          styles.inputBlock,
          styles.inputBlock__login,
          styles[`inputBlock__login-${step}`]
        )}
      >
        <div className={styles.inputWrap}>
          <label className={styles.label} htmlFor="login">
            Логин:
          </label>
          <input
            onChange={handleLoginInput}
            maxLength={13}
            className={styles.input}
            id="login"
          />
        </div>
        <button
          onClick={handleSubmitLogin}
          className={cn(styles.button, isLoginValid && styles.button_active)}
        ></button>
      </div>
      <div
        className={cn(
          styles.inputBlock,
          styles.inputBlock__password,
          styles[`inputBlock__password-${step}`]
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
    </div>
  );
});

export default Authenticate;
