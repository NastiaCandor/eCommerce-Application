import Noty from 'noty';
import { EMAIL_VALIDATION_TEXT, PASSWORD_VALIDATION_TEXT, wrapperParams } from '../../../types';
import ClientAPI from '../../utils/Client';
import ElementCreator from '../../utils/ElementCreator';
import View from '../View';
import loginParams from './login-params';

export default class LoginView extends View {
  clientAPI: ClientAPI;

  constructor() {
    super(loginParams.section);
    this.clientAPI = new ClientAPI();
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    const wrapper = new ElementCreator(wrapperParams);
    const innerWrapper = new ElementCreator(loginParams.innerWrapper);

    this.injectTitle(innerWrapper);
    this.injectLoginForm(innerWrapper);
    this.injectFormSubtitle(innerWrapper);

    wrapper.getElement().classList.add('login__wrapper');
    wrapper.addInnerElement(innerWrapper);
    super.addInnerElement(wrapper);
  }

  private injectTitle(wrapper: ElementCreator): void {
    const title = new ElementCreator(loginParams.title);
    wrapper.addInnerElement(title);
  }

  private injectFormSubtitle(wrapper: ElementCreator): void {
    const newCustomer = new ElementCreator(loginParams.newCustomerText);
    newCustomer.addInnerElement(new ElementCreator(loginParams.newCustomerLink));
    wrapper.addInnerElement(newCustomer);
  }

  private injectLoginForm(wrapper: ElementCreator): void {
    const form = new ElementCreator(loginParams.form);
    this.fillLoginForm(form);
    wrapper.addInnerElement(form);
  }

  private fillLoginForm(form: ElementCreator): void {
    const emailBox = new ElementCreator(loginParams.loginBox);
    const emailInputBox = new ElementCreator(loginParams.inputBox);
    const emailIcon = new ElementCreator(loginParams.inputIcon).getElement();
    emailIcon.classList.add('login__icon_user');
    const emailTitle = new ElementCreator(loginParams.emailTitle);
    const emailInput = this.getEmailInput();
    const emailError = new ElementCreator(loginParams.inputError);
    emailInputBox.addInnerElement([emailInput, emailTitle]);
    emailBox.addInnerElement([emailIcon, emailInputBox, emailError]);
    this.traceEmailInput(emailInput, emailError);

    const passwordBox = new ElementCreator(loginParams.loginBox);
    const passwordInputBox = new ElementCreator(loginParams.inputBox);
    const passwordIcon = new ElementCreator(loginParams.inputIcon).getElement();
    passwordIcon.classList.add('login__icon_lock');
    const passwordTitle = new ElementCreator(loginParams.passwordTitle);
    const passwordInput = this.getPasswordInput();
    const passwordEyeIcon = new ElementCreator(loginParams.passwordEyeIcon);
    this.showPasswordFunctionality(passwordEyeIcon, passwordInput as HTMLInputElement);
    passwordInputBox.addInnerElement([passwordInput, passwordTitle, passwordEyeIcon]);
    const passwordError = new ElementCreator(loginParams.inputError);
    passwordBox.addInnerElement([passwordIcon, passwordInputBox, passwordError]);
    this.tracePasswordInput(passwordInput, passwordError);

    const loginBtn = new ElementCreator(loginParams.loginBtn);

    form.getElement().addEventListener('submit', (e: Event) => {
      e.preventDefault();
      if (this.checkInputValidation(emailInput, passwordInput)) {
        this.checkLogin(emailInput, passwordInput);
      }
    });
    form.addInnerElement([emailBox, passwordBox, loginBtn]);
  }

  private showPasswordFunctionality(eyeIcon: ElementCreator, input: HTMLInputElement): void {
    const icon = eyeIcon.getElement();
    icon.addEventListener('click', () => {
      if (input.type === 'password') {
        input.setAttribute('type', 'text');
        icon.classList.add('login__password-eye_open');
        icon.classList.remove('login__password-eye_closed');
      } else {
        input.setAttribute('type', 'password');
        icon.classList.add('login__password-eye_closed');
        icon.classList.remove('login__password-eye_open');
      }
    });
  }

  private getEmailInput(): HTMLElement {
    const emailInput = new ElementCreator(loginParams.emailInput).getElement();
    emailInput.setAttribute('required', '');
    emailInput.setAttribute('placeholder', ' ');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('autocomplete', 'username');

    return emailInput;
  }

  private traceEmailInput(input: HTMLElement, errorElement: ElementCreator): void {
    const errorText = errorElement.getElement();
    input.addEventListener('keyup', () => {
      const email = (input as HTMLInputElement).value;
      if (this.validateEmail(email)) {
        errorText.textContent = '';
        input.classList.remove('_invalid');
      } else {
        errorText.textContent = EMAIL_VALIDATION_TEXT;
        input.classList.add('_invalid');
      }
    });
  }

  private validateEmail(email: string): boolean {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return !!email.match(pattern);
  }

  private tracePasswordInput(input: HTMLElement, errorElement: ElementCreator): void {
    const errorText = errorElement.getElement();
    input.addEventListener('keyup', () => {
      const password = (input as HTMLInputElement).value;
      const validation = this.validatePassword(password);
      if (validation.length === 0) {
        errorText.textContent = '';
        input.classList.remove('_invalid');
      } else {
        let display = '';
        validation.forEach((rule) => {
          display += `<br>${rule}`;
        });
        errorText.innerHTML = `${PASSWORD_VALIDATION_TEXT}${display}`;
        input.classList.add('_invalid');
      }
    });
  }

  private validatePassword(password: string): string[] {
    const result = [];
    if (password.length < 7) result.push('- At least 8 caracters');
    if (!password.match(/[A-Z]/g)) result.push('- At least one uppercase letter');
    if (!password.match(/[a-z]/g)) result.push('- At least one lowercase letter');
    if (!password.match(/[0-9]/g)) result.push('- At least one digit');
    if (!password.match(/\)|!|@|#|\$|%|\(|\^|&|\*/gi)) result.push('- At least one special character (e.g., !@#$%^&*)');
    if (password[0] === ' ' || password[password.length - 1] === ' ') {
      result.push('- No leading or trailing whitespace');
    }
    return result;
  }

  private checkInputValidation(emailInput: HTMLElement, passwordInput: HTMLElement): boolean {
    return !emailInput.classList.contains('_invalid') && !passwordInput.classList.contains('_invalid');
  }

  private getPasswordInput(): HTMLElement {
    const passwordInput = new ElementCreator(loginParams.passwordInput).getElement();
    passwordInput.setAttribute('required', '');
    passwordInput.setAttribute('placeholder', ' ');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('autocomplete', 'current-password');

    return passwordInput;
  }

  private showSideBarMessage(messageText: string, type: string): void {
    new Noty({
      theme: 'mint',
      text: messageText,
      timeout: 3000,
      progressBar: true,
      type: type === 'success' ? 'success' : 'error',
    }).show();
  }

  private async checkLogin(emailInput: HTMLElement, passwordInput: HTMLElement): Promise<void> {
    const email = (emailInput as HTMLInputElement).value;
    const password = (passwordInput as HTMLInputElement).value;

    const loginAPI = this.clientAPI.loginClient(email, password);
    loginAPI()
      .then((data) => {
        if (data.statusCode === 200) {
          const { firstName } = data.body.customer;
          const { lastName } = data.body.customer;
          if (firstName && lastName) {
            const message = `${loginParams.loginSuccessMessage}, ${data.body.customer.firstName} ${data.body.customer.lastName}!`;
            this.showSideBarMessage(message, 'success');
          } else {
            const message = `${loginParams.loginSuccessMessage}!`;
            this.showSideBarMessage(message, 'success');
          }
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          this.showSideBarMessage(loginParams.loginErrorMessage, 'error');
        } else {
          this.showSideBarMessage(loginParams.serverErrorMessage, 'error');
          console.log(error.status);
        }
      });
  }
}
