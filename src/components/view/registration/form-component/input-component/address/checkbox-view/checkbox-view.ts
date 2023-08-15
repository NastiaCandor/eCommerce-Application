import ElementCreator from '../../../../../../utils/element-creator';
import View from '../../../../../view';
import fieldsetParams from '../../input-params';
import CheckboxInputParams from './checkbox-params';

export default class CheckboxView extends View {
  public sameAdrs: boolean;

  constructor() {
    super(fieldsetParams.fieldset);
    this.render();
    this.sameAdrs = false;
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.insertFieldsetItems();
    this.setCssClasses(CheckboxInputParams.fieldset);
  }

  public insertFieldsetItems(): void {
    const input = this.createInput(CheckboxInputParams.input.type, CheckboxInputParams.input.id);
    this.addInnerElement(input);
    this.changeChecked(input);
    // eslint-disable-next-line max-len
    const label = this.createLabel(CheckboxInputParams.label.for, CheckboxInputParams.label.textContent);
    this.addInnerElement(label);
    // eslint-disable-next-line max-len
    const error = this.createErrorText(CheckboxInputParams.span.textContent, CheckboxInputParams.span.cssClasses);
    label.addInnerElement(error);
    // this.validateCity(input, errorSpan);
    // this.showError(input, errorSpan);
  }

  private createInput(type: string, id: string): HTMLInputElement {
    const input = new ElementCreator(CheckboxInputParams.input).getElement() as HTMLInputElement;
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    // input.setAttribute('disabled', CheckboxInputParams.input.disabled);
    input.setAttribute('required', fieldsetParams.input.required);
    return input;
  }

  private createLabel(forAttr: string, text: string): ElementCreator {
    const label = new ElementCreator(fieldsetParams.label);
    label.setAttribute('for', forAttr);
    label.setTextContent(text);
    return label;
  }

  private createErrorText(text: string, css: string[]): ElementCreator {
    const errorSpan = new ElementCreator(fieldsetParams.errorSpan);
    errorSpan.setTextContent(text);
    errorSpan.setCssClasses(css);
    return errorSpan;
  }

  private changeChecked(element: HTMLInputElement) {
    element.addEventListener('change', () => {
      if (!this.sameAdrs) {
        this.sameAdrs = true;
      } else this.sameAdrs = false;
      console.log(this.sameAdrs);
    });
  }

  // public showError(input: HTMLInputElement, errorMessage: HTMLElement) {
  //   const errorSpan = errorMessage;
  //   if (input.validity.valueMissing) {
  //     errorSpan.textContent = 'Enter city name';
  //   } else if (input.validity.tooShort) {
  //     errorSpan.textContent = `City name should be at least
  // ${input.minLength} characters long; you entered ${input.value.length}`;
  //   } else if (input.validity.patternMismatch) {
  //     errorSpan.textContent = 'City name should contain only english letters';
  //   }
  //   errorSpan.classList.add(CheckboxInputParams.errorSpan.cssClassesActive);
  // }
}
