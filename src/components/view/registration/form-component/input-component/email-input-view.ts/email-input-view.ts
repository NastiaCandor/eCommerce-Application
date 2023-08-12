/* eslint-disable @typescript-eslint/comma-dangle */
import ElementCreator from '../../../../../utils/element-creator';
import View from '../../../../view';
import EmailInputParams from './email-params';
import fieldsetParams from '../input-params';

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
    // this.validateEmail();
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
      if (element.validity.valid) {
        errorSpan.textContent = '';
        errorSpan.classList.add(EmailInputParams.errorSpan.cssClasses);
      } else {
        this.showError(element, errorMessage);
      }
    });
  }

  public showError(email: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    if (email.validity.valueMissing) {
      errorSpan.textContent = 'Enter your e-mail address';
    } else if (email.validity.typeMismatch) {
      errorSpan.textContent = 'Entered value needs to be an e-mail address';
    } else if (email.validity.tooShort) {
      errorSpan.textContent = `Email should be at least ${email.minLength} characters long; you entered ${email.value.length}`;
    }
    errorSpan.classList.add(EmailInputParams.errorSpan.cssClassesActive);
  }
}
