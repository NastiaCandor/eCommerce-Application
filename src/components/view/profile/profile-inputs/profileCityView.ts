import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import fieldsetParams from '../../registration/form-component/input-component/input-params';
import CityInputParams from '../../registration/form-component/input-component/address/city-fieldset-view/city-params';

export default class ProfileCityView extends View {
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
    const label = this.createLabel(CityInputParams.label.textContent);
    this.addInnerElement(label);
    const input = this.createInput();
    this.addInnerElement(input);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
    this.validateCity(input, errorSpan);
  }

  public createInput(): HTMLInputElement {
    const input = new ElementCreator(fieldsetParams.input).getElement() as HTMLInputElement;
    input.setAttribute('type', CityInputParams.input.type);
    input.setAttribute('minLength', CityInputParams.input.minLength);
    input.setAttribute('required', fieldsetParams.input.required);
    input.setAttribute('pattern', CityInputParams.input.pattern);
    return input;
  }

  public createLabel(text: string): ElementCreator {
    const label = new ElementCreator(fieldsetParams.label);
    label.setTextContent(text);
    return label;
  }

  public createErrorText(): HTMLElement {
    const errorSpan = new ElementCreator(fieldsetParams.errorSpan).getElement();
    return errorSpan;
  }

  public validateCity(element: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    element.addEventListener('input', () => {
      if (element.validity.valid) {
        errorSpan.textContent = '';
        errorSpan.classList.add(CityInputParams.errorSpan.cssClasses);
      } else {
        this.showError(element, errorMessage);
      }
    });
    element.addEventListener('change', () => {
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
      errorSpan.textContent = 'Please fill in this address field';
    } else if (input.validity.tooShort) {
      errorSpan.textContent = `City name should be at least ${input.minLength} characters long; you entered ${input.value.length}`;
    } else if (input.validity.patternMismatch) {
      errorSpan.textContent = 'City name should contain only english letters';
    }
    errorSpan.classList.add(CityInputParams.errorSpan.cssClassesActive);
  }
}
