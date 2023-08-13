import { LoginParamsType, wrapperParams } from '../../../types';
import ClientAPI from '../../utils/Client';
import ElementCreator from '../../utils/element-creator';
import View from '../View';

const loginParams: LoginParamsType = {
  section: {
    tag: 'section',
    cssClasses: ['login'],
  },
  innerWrapper: {
    tag: 'div',
    cssClasses: ['login__section'],
  },
  title: {
    tag: 'h2',
    cssClasses: ['login__title'],
    textContent: 'Sign In',
  },
  form: {
    tag: 'form',
    cssClasses: ['login__form'],
  },
  emailInput: {
    tag: 'input',
    cssClasses: ['login__email-input'],
  },
  emailTitle: {
    tag: 'label',
    cssClasses: ['login__mail-label', 'login__form-label'],
    textContent: 'Email Address',
  },
  passwordInput: {
    tag: 'input',
    cssClasses: ['login__password-input'],
  },
  passwordTitle: {
    tag: 'label',
    cssClasses: ['login__password-label', 'login__form-label'],
    textContent: 'password',
  },
  loginBtn: {
    tag: 'button',
    cssClasses: ['login__form-btn', 'button'],
    textContent: 'Sign In',
  },
  newCustomerText: {
    tag: 'p',
    cssClasses: ['login__new-customer-text'],
    textContent: 'Don`t have an account? ',
  },
  newCustomerLink: {
    tag: 'a',
    cssClasses: ['login__new-customer-link'],
    textContent: 'Creat one!',
    link: '#',
  },
};

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
    const emailTitle = new ElementCreator(loginParams.emailTitle);
    const emailInput = this.getEmailInput();
    const passwordTitle = new ElementCreator(loginParams.passwordTitle);
    const passwordInput = this.getPasswordInput();
    const loginBtn = new ElementCreator(loginParams.loginBtn);

    form.getElement().addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.checkLogin(emailInput, passwordInput);
    });

    form.addInnerElement([emailTitle, emailInput, passwordTitle, passwordInput, loginBtn]);
  }

  private getEmailInput(): HTMLElement {
    const emailInput = new ElementCreator(loginParams.emailInput).getElement();
    emailInput.setAttribute('required', '');
    emailInput.setAttribute('placeholder', 'email address');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('autocomplete', 'username');

    return emailInput;
  }

  private getPasswordInput(): HTMLElement {
    const passwordInput = new ElementCreator(loginParams.passwordInput).getElement();
    passwordInput.setAttribute('required', '');
    passwordInput.setAttribute('placeholder', 'password');
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
