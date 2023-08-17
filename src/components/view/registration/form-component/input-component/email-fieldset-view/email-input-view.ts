import ElementCreator from '../../../../../utils/ElementCreator';
import View from '../../../../View';
import fieldsetParams from '../input-params';
import EmailInputParams from './email-params';

export default class EmailInputView extends View {
  constructor() {
    super(fieldsetParams.fieldset);
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

  private createInput(type: string): HTMLInputElement {
    const input = new ElementCreator(fieldsetParams.input).getElement() as HTMLInputElement;
    input.setAttribute('type', type);
    input.setAttribute('id', type);
    input.setAttribute('minLength', EmailInputParams.input.minLength);
    input.setAttribute('required', fieldsetParams.input.required);
    // input.setAttribute('pattern', EmailInputParams.input.pattern);
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

  private checkEmail(str: string) {
    const reg = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
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

  public showError(email: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    if (email.validity.valueMissing) {
      errorSpan.textContent = 'Enter your e-mail address';
    }
    if (email.validity.typeMismatch) {
      errorSpan.textContent = 'Email address is invalid. Please enter a valid email address';
    }
    if (email.validity.tooShort) {
      errorSpan.textContent = `Email should be at least ${email.minLength} characters long; you entered ${email.value.length}`;
    }
    if (!this.checkEmail(email.value)) {
      errorSpan.textContent = 'Email address is invalid. Please enter a valid email address';
    }
    errorSpan.classList.add(EmailInputParams.errorSpan.cssClassesActive);
    email.classList.add(EmailInputParams.input.cssClassesInvalid);
  }
}
