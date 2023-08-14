import { wrapperParams } from '../../../types';
import ClientAPI from '../../utils/Client';
import ElementCreator from '../../utils/element-creator';
import View from '../View';
import loginParams from './login-params';

export default class LoginView extends View {
  clientAPI: ClientAPI;

  constructor() {
    super(loginParams.section);
    this.clientAPI = new ClientAPI();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
    this.appendToDom();
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
    emailInputBox.addInnerElement([emailInput, emailTitle]);
    emailBox.addInnerElement([emailIcon, emailInputBox]);

    const passwordBox = new ElementCreator(loginParams.loginBox);
    const passwordInputBox = new ElementCreator(loginParams.inputBox);
    const passwordIcon = new ElementCreator(loginParams.inputIcon).getElement();
    passwordIcon.classList.add('login__icon_lock');
    const passwordTitle = new ElementCreator(loginParams.passwordTitle);
    const passwordInput = this.getPasswordInput();
    const passwordEyeIcon = new ElementCreator(loginParams.passwordEyeIcon);
    this.showPasswordFunctionality(passwordEyeIcon, passwordInput as HTMLInputElement);
    passwordInputBox.addInnerElement([passwordInput, passwordTitle, passwordEyeIcon]);
    passwordBox.addInnerElement([passwordIcon, passwordInputBox]);

    const loginBtn = new ElementCreator(loginParams.loginBtn);

    form.getElement().addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.checkLogin(emailInput, passwordInput);
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
    console.log(input);
  }

  private getEmailInput(): HTMLElement {
    const emailInput = new ElementCreator(loginParams.emailInput).getElement();
    emailInput.setAttribute('required', '');
    emailInput.setAttribute('placeholder', ' ');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('autocomplete', 'username');

    return emailInput;
  }

  private getPasswordInput(): HTMLElement {
    const passwordInput = new ElementCreator(loginParams.passwordInput).getElement();
    passwordInput.setAttribute('required', '');
    passwordInput.setAttribute('placeholder', ' ');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('autocomplete', 'current-password');

    return passwordInput;
  }

  private async checkLogin(emailInput: HTMLElement, passwordInput: HTMLElement): Promise<void> {
    const email = (emailInput as HTMLInputElement).value;
    const password = (passwordInput as HTMLInputElement).value;

    const loginAPI = this.clientAPI.loginClient(email, password);
    loginAPI()
      .then((data) => {
        if (data.statusCode === 200) {
          console.log(`Hello ${data.body.customer.firstName} ${data.body.customer.lastName}!`);
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          console.log('Wrong email address or password');
        } else {
          console.log(error.status);
        }
      });
  }

  private appendToDom(): void {
    document.body.appendChild(this.getElement());
  }
}
