/* eslint-disable @typescript-eslint/comma-dangle */
import ElementCreator from '../../../../../utils/element-creator';
import View from '../../../../view';
import fieldsetParams from '../input-params';
import passwordInputParams from './password-params';

export default class PasswordInputView extends View {
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
    // eslint-disable-next-line max-len
    const label = this.createLabel(passwordInputParams.label.for, passwordInputParams.label.textContent);
    this.addInnerElement(label);
    const input = this.createInput(passwordInputParams.input.type);
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
    // input.setAttribute('minLength', passwordInputParams.input.minLength);
    input.setAttribute('required', fieldsetParams.input.required);
    // input.setAttribute('pattern', passwordInputParams.input.pattern);
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

  private validateEmail(element: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    element.addEventListener('input', () => {
      if (element.validity.valid && this.checkPassword(element.value)) {
        errorSpan.textContent = '';
        errorSpan.classList.add(passwordInputParams.errorSpan.cssClasses);
        element.classList.remove(passwordInputParams.input.cssClassesInvalid);
      } else {
        this.showError(element, errorMessage);
      }
    });
  }

  public checkPassword(str: string) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const result = reg.test(str);
    console.log(result);
    return result;
  }

  public showError(password: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    if (password.validity.valueMissing) {
      errorSpan.textContent = 'Enter your password';
    }
    if (!this.checkPassword(password.value)) {
      console.log('No');
      // eslint-disable-next-line operator-linebreak
      errorSpan.textContent =
        'Password should contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number';
    }
    errorSpan.classList.add(passwordInputParams.errorSpan.cssClassesActive);
    password.classList.add(passwordInputParams.input.cssClassesInvalid);
  }
}
