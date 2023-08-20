import ElementCreator from '../../../../../../utils/ElementCreator';
import View from '../../../../../View';
import fieldsetParams from '../../input-params';
import PostcodeInputParams from './postcode-params';

export default class PostcodeInputView extends View {
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
    const label = this.createLabel(PostcodeInputParams.label.textContent);
    this.addInnerElement(label);
    const input = this.createInput(PostcodeInputParams.input.type);
    this.addInnerElement(input);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
    this.validationEvent(input, errorSpan);
    this.showError(input, errorSpan);
  }

  private createInput(type: string): HTMLInputElement {
    const input = new ElementCreator(fieldsetParams.input).getElement() as HTMLInputElement;
    input.setAttribute('type', type);
    input.setAttribute('minLength', PostcodeInputParams.input.minLength);
    input.setAttribute('required', fieldsetParams.input.required);
    return input;
  }

  private createLabel(text: string): ElementCreator {
    const label = new ElementCreator(fieldsetParams.label);
    label.setTextContent(text);
    return label;
  }

  private createErrorText(): HTMLElement {
    const errorSpan = new ElementCreator(fieldsetParams.errorSpan).getElement();
    return errorSpan;
  }

  private validationEvent(element: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    element.addEventListener('input', () => {
      if (element.validity.valid) {
        errorSpan.textContent = '';
        errorSpan.classList.add(PostcodeInputParams.errorSpan.cssClasses);
      } else {
        this.showError(element, errorMessage);
      }
    });
  }

  public getValuePostcode(element: HTMLInputElement): string {
    console.log(element.value);
    return element.value;
  }

  public showError(input: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    errorSpan.textContent = 'Please enter a valid postcode';
    errorSpan.classList.add(PostcodeInputParams.errorSpan.cssClassesActive);
    input.classList.add(PostcodeInputParams.input.cssClassesInvalid);
  }
}
