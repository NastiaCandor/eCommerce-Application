import Noty from 'noty';
import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import fieldsetParams from '../../registration/form-component/input-component/input-params';
import EmailInputParams from '../../registration/form-component/input-component/email-fieldset-view/email-params';
import ClientAPI from '../../../utils/Client';

export default class ProfileEmailInputView extends View {
  clientAPI: ClientAPI;

  constructor(clientAPI: ClientAPI) {
    super(fieldsetParams.fieldset);
    this.clientAPI = clientAPI;
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.insertFieldsetItems();
  }

  public insertFieldsetItems(): void {
    const label = this.createLabel(EmailInputParams.label.for, EmailInputParams.label.textContent);
    this.addInnerElement(label);
    const input = this.createInput(EmailInputParams.input.type);
    this.addInnerElement(input);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
    this.validateEmail(input, errorSpan);
    this.showError(input, errorSpan);
  }

  protected createInput(type: string): HTMLInputElement {
    const input = new ElementCreator(fieldsetParams.input).getElement() as HTMLInputElement;
    input.setAttribute('disabled', 'true');
    input.setAttribute('type', type);
    input.setAttribute('id', type);
    input.setAttribute('minLength', EmailInputParams.input.minLength);
    input.setAttribute('required', fieldsetParams.input.required);
    return input;
  }

  private createLabel(forAttr: string, text: string): ElementCreator {
    const label = new ElementCreator(fieldsetParams.label);
    label.setAttribute('for', forAttr);
    label.setTextContent(text);
    return label;
  }

  private createErrorText(): HTMLElement {
    const errorSpan = new ElementCreator(fieldsetParams.errorSpan).getElement();
    return errorSpan;
  }

  public checkEmail(str: string) {
    const reg = /^[^ ]+@[^ ]+\.[a-z]{2,20}$/;
    const result = reg.test(str);
    return result;
  }

  private validateEmail(element: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    element.addEventListener('input', () => {
      if (element.validity.valid && this.checkEmail(element.value)) {
        errorSpan.textContent = '';
        errorSpan.classList.add(EmailInputParams.errorSpan.cssClasses);
        element.classList.remove(EmailInputParams.input.cssClassesInvalid);
      } else {
        this.showError(element, errorMessage);
      }
    });
  }

  private showErrorMessage(): void {
    new Noty({
      theme: 'light',
      text: 'Please check your connection',
      timeout: 3000,
      progressBar: true,
      type: 'alert',
    }).show();
  }

  public async checkEmailExist(element: HTMLInputElement, errorSpan: HTMLElement, currentEmail: string) {
    element.addEventListener('blur', () => {
      const getCustomerEmailAPI = this.clientAPI.getCustomerByEmail(element.value);
      getCustomerEmailAPI()
        .then(async (data) => {
          if (data.statusCode === 200) {
            if (currentEmail === element.value) {
              console.log('this is my current email');
              return;
            }
            if (data.body.results.length !== 0) {
              this.showError(element, errorSpan, EmailInputParams.errorText);
            }
          }
        })
        .catch((error) => {
          if (error.status === undefined) {
            this.showErrorMessage();
          } else {
            console.log(error.status);
          }
        });
    });
  }

  public showError(email: HTMLInputElement, errorMessageEl: HTMLElement, errorText?: string) {
    if (!email.getAttribute('disabled')) {
      const errorSpan = errorMessageEl;
      if (email.validity.valueMissing) {
        errorSpan.textContent = 'Enter your e-mail address';
      }
      if (email.validity.typeMismatch) {
        errorSpan.textContent = 'Email address is invalid. Please enter a valid email address, e.g. "user@example.com"';
      }
      if (email.validity.tooShort) {
        errorSpan.textContent = `Email should be at least ${email.minLength} characters long; you entered ${email.value.length}`;
      }
      if (!this.checkEmail(email.value)) {
        errorSpan.textContent = 'Email address is invalid. Please enter a valid email address, e.g. "user@example.com"';
      }
      if (errorText) {
        errorSpan.textContent = errorText;
      }
      errorSpan.classList.add(EmailInputParams.errorSpan.cssClassesActive);
      email.classList.add(EmailInputParams.input.cssClassesInvalid);
    }
  }
}
