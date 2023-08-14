import ElementCreator from '../../../../../../utils/element-creator';
import View from '../../../../../view';
import fieldsetParams from '../../input-params';
import CountryInputParams from './country-params';

export default class CountryInputView extends View {
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
    const label = this.createLabel(CountryInputParams.label.for, CountryInputParams.label.textContent);
    this.addInnerElement(label);
    const input = this.createInput(CountryInputParams.input.id);
    this.addInnerElement(input);
    this.getValue(input);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
    this.validateCountry(input, errorSpan);
    this.showError(input, errorSpan);
  }

  private createInput(id: string): HTMLInputElement {
    const input = new ElementCreator(fieldsetParams.select).getElement() as HTMLInputElement;
    input.setAttribute('id', id);
    input.setAttribute('required', fieldsetParams.input.required);
    const countriesObj = CountryInputParams.countries;
    countriesObj.forEach((element, i: number) => {
      input.append(this.createOption(countriesObj[i].code, countriesObj[i].countryName));
    });
    return input;
  }

  public getValue(element: HTMLInputElement): string {
    // console.log(element.value);
    return element.value;
  }

  private createOption(value: string, text: string): HTMLElement {
    const option = new ElementCreator(CountryInputParams.option).getElement();
    option.setAttribute('value', value);
    option.textContent = text;
    return option;
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

  private validateCountry(element: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    element.addEventListener('change', () => {
      this.getValue(element);
      if (element.validity.valid) {
        errorSpan.textContent = '';
        errorSpan.classList.add(CountryInputParams.errorSpan.cssClasses);
      } else {
        this.showError(element, errorMessage);
      }
    });
  }

  public showError(input: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    if (input.validity.valueMissing) {
      errorSpan.textContent = 'Choose country';
    }
    errorSpan.classList.add(CountryInputParams.errorSpan.cssClassesActive);
  }
}
