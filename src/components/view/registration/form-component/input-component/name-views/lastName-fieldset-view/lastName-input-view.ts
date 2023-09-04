import ElementCreator from '../../../../../../utils/ElementCreator';
import View from '../../../../../View';
import fieldsetParams from '../../input-params';
import nameInputParams from '../name-input-params';

export default class LastNameInputView extends View {
  constructor() {
    super(fieldsetParams.fieldset);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.insertFieldsetItems();
    this.setCssClasses(nameInputParams.fieldset.cssClasses);
  }

  public insertFieldsetItems(): void {
    // eslint-disable-next-line max-len
    const label = this.createLabel(nameInputParams.label.lastName.for, nameInputParams.label.lastName.textContent);
    this.addInnerElement(label);
    const input = this.createInput(nameInputParams.input.type, nameInputParams.input.lastName.id);
    this.addInnerElement(input);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
    this.validateName(input, errorSpan);
    this.showError(input, errorSpan);
  }

  public createInput(type: string, id: string): HTMLInputElement {
    const input = new ElementCreator(fieldsetParams.input).getElement() as HTMLInputElement;
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('minLength', nameInputParams.input.minLength);
    input.setAttribute('required', fieldsetParams.input.required);
    input.setAttribute('pattern', nameInputParams.input.pattern);
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

  private validateName(element: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    element.addEventListener('input', () => {
      if (element.validity.valid) {
        errorSpan.textContent = '';
        errorSpan.classList.add(nameInputParams.errorSpan.cssClasses);
      } else {
        this.showError(element, errorMessage);
      }
    });
  }

  public showError(input: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    if (input.validity.valueMissing) {
      errorSpan.textContent = 'Enter your last name';
    } else if (input.validity.tooShort) {
      errorSpan.textContent = `Last name should be at least ${input.minLength} characters long; you entered ${input.value.length}`;
    } else if (input.validity.patternMismatch) {
      errorSpan.textContent = 'Last name should contain only english letters';
    }
    errorSpan.classList.add(nameInputParams.errorSpan.cssClassesActive);
  }
}
