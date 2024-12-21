import { AxiosError } from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';
import { wait } from 'shared/utils/wait';
import { LoginPasswordPayload } from 'store/types/types';

export class AuthenticateScreenStore {
  private _step: 'start' | 'login' | 'password' | 'name' | 'finish' = 'start';
  private _auth_scenario: 'login' | 'register';
  private _isLoginValid = false;
  private _isPasswordValid = false;
  private _isNameValid = false;
  private _isLoginFailed = false;
  private readonly authenticate: ({ login, password, name }: LoginPasswordPayload & { name?: string }) => Promise<void>;
  private readonly handleRegisterEnd: () => Promise<void>;
  private login = '';
  private password = '';
  private name = '';

  constructor({
    authenticate,
    auth_scenario,
    handleRegisterEnd
  }: {
    authenticate: ({ login, password }: LoginPasswordPayload) => Promise<void>;
    auth_scenario: 'login' | 'register';
    handleRegisterEnd: () => Promise<void>;
  }) {
    this.authenticate = authenticate;
    this._auth_scenario = auth_scenario;
    this.handleRegisterEnd = handleRegisterEnd;
    makeObservable<
      this,
      | '_step'
      | 'setStep'
      | '_isLoginValid'
      | 'setIsLoginValid'
      | '_isPasswordValid'
      | 'setIsPasswordValid'
      | '_isNameValid'
      | 'setIsNameValid'
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

      _isNameValid: observable,
      setIsNameValid: action,
      isNameValid: computed,

      _isLoginFailed: observable,
      setIsLoginFailed: action,
      isLoginFailed: computed
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

  public handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isNotEmpty = e.target.value.length > 0;
    this.name = e.target.value;
    this.setIsNameValid(isNotEmpty);
  };

  public handleSubmitLogin = () => {
    if (!this.login) return;
    if (!this._isLoginValid) return;
    this.setIsLoginValid(false);
    this.setStep('password');
    this.setIsLoginFailed(false);
  };

  public handleSubmitPassword = async () => {
    if (!this._isPasswordValid) return;
    if (this._auth_scenario === 'login') {
      try {
        await this.authenticate({ login: this.login, password: this.password });
      } catch (error) {
        if ((error as AxiosError).status === 404) {
          this.setIsLoginFailed(true);
          this.setStep('login');
        }
      }
    } else {
      this.setStep('name');
    }
  };

  public handleSubmitName = async () => {
    if (!this._isNameValid) return;
    try {
      await this.authenticate({ login: this.login, password: this.password, name: this.name });
      this.setStep('finish');
      await wait(2000);
      await this.handleRegisterEnd();
    } catch (error) {
      this.setStep('login');
    }
  };

  public handleInputClick = (input: 'login') => {
    if (this.step === 'password') {
      this.setStep('login');
      this.setIsLoginValid(true);
    }
  };

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

  private setIsNameValid = (value: boolean) => {
    this._isNameValid = value;
  };

  public get isLoginValid() {
    return this._isLoginValid;
  }

  public get isPasswordValid() {
    return this._isPasswordValid;
  }

  public get isNameValid() {
    return this._isNameValid;
  }

  public setIsLoginFailed = (value: boolean) => {
    this._isLoginFailed = value;
  };

  public get isLoginFailed() {
    return this._isLoginFailed;
  }
}
