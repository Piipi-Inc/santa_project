import {
  action, computed, makeObservable, observable,
} from 'mobx';
import { wait } from 'src/shared/utils/wait';
import { LoginPasswordPayload } from 'src/store/types/types';

export class AuthenticateScreenStore {
  private _step: 'start' | 'login' | 'password' = 'start';

  private _isLoginValid = false;

  private _isPasswordValid = false;

  private _isLoginFailed = false;

  private readonly authenticate: ({
    login,
    password,
  }: LoginPasswordPayload) => Promise<void>;

  private login = '';

  private password = '';

  constructor({
    authenticate,
  }: {
    authenticate: ({ login, password }: LoginPasswordPayload) => Promise<void>;
  }) {
    this.authenticate = authenticate;
    makeObservable<
      this,
      | '_step'
      | 'setStep'
      | '_isLoginValid'
      | 'setIsLoginValid'
      | '_isPasswordValid'
      | 'setIsPasswordValid'
      | '_isLoginFailed'
    >(this, {
      _step: observable,
      setStep: action,
      step: computed,

      _isLoginValid: observable,
      setIsLoginValid: action,
      isLoginValid: computed,

      _isPasswordValid: observable,
      setIsPasswordValid: action,
      isPasswordValid: computed,

      _isLoginFailed: observable,
      setIsLoginFailed: action,
      isLoginFailed: computed,
    });
  }

  public run = async () => {
    await wait(300);
    this.setStep('login');
  };

  public handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isNotEmpty = e.target.value.length > 0;
    this.login = e.target.value;
    this.setIsLoginValid(isNotEmpty);
    this.setIsLoginFailed(false);
  };

  public handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isNotEmpty = e.target.value.length > 0;
    this.password = e.target.value;
    this.setIsPasswordValid(isNotEmpty);
  };

  public handleSubmitLogin = () => {
    if (!this.login) return
    this.setIsLoginValid(false);
    this.setStep('password');
    this.setIsLoginFailed(false);
  };

  public handleSubmitPassword = async () => {
    try {
      await this.authenticate({ login: this.login, password: this.password });
    } catch (error) {
      if (error.status === 404) {
        this.setIsLoginFailed(true);
        this.setStep('login')
      }
    }

  };

  public handleInputClick = (input: "login") => {
    if (this.step === "password") {
      this.setStep('login')
      this.setIsLoginValid(true);
    }
  }

  private setStep = (step: AuthenticateScreenStore['_step']) => {
    this._step = step;
  };

  public get step() {
    return this._step;
  }

  private setIsLoginValid = (value: boolean) => {
    this._isLoginValid = value;
  };

  private setIsPasswordValid = (value: boolean) => {
    this._isPasswordValid = value;
  };

  public get isLoginValid() {
    return this._isLoginValid;
  }

  public get isPasswordValid() {
    return this._isPasswordValid;
  }

  public setIsLoginFailed = (value: boolean) => {
    this._isLoginFailed = value;
  }

  public get isLoginFailed() {
    return this._isLoginFailed;
  }
}
