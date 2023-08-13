import ElementCreator from '../../../../../../utils/element-creator';
import View from '../../../../../view';
import fieldsetParams from '../../input-params';
import CityInputParams from './city-params';

export default class CityInputView extends View {
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
    const label = this.createLabel(CityInputParams.label.for, CityInputParams.label.textContent);
    this.addInnerElement(label);
    const input = this.createInput(CityInputParams.input.type, CityInputParams.input.id);
    this.addInnerElement(input);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
    this.validateName(input, errorSpan);
    this.showError(input, errorSpan);
  }

  private createInput(type: string, id: string): HTMLInputElement {
    const input = new ElementCreator(fieldsetParams.input).getElement() as HTMLInputElement;
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('minLength', CityInputParams.input.minLength);
    input.setAttribute('required', fieldsetParams.input.required);
    input.setAttribute('pattern', CityInputParams.input.pattern);
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
        errorSpan.classList.add(CityInputParams.errorSpan.cssClasses);
      } else {
        this.showError(element, errorMessage);
      }
    });
  }

  public showError(input: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    if (input.validity.valueMissing) {
      errorSpan.textContent = 'Enter city name';
    } else if (input.validity.tooShort) {
      errorSpan.textContent = `City name should be at least ${input.minLength} characters long; you entered ${input.value.length}`;
    } else if (input.validity.patternMismatch) {
      errorSpan.textContent = 'City name should contain only letters';
    }
    errorSpan.classList.add(CityInputParams.errorSpan.cssClassesActive);
  }
}
