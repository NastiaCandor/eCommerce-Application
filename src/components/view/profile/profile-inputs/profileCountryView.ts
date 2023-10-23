import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import fieldsetParams from '../../registration/form-component/input-component/input-params';
import CountryInputParams from '../../registration/form-component/input-component/address/country-fieldset-view/country-params';

export default class ProfileCountryView extends View {
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
    const label = this.createLabel(CountryInputParams.label.textContent);
    this.addInnerElement(label);
    const input = this.createInput();
    this.addInnerElement(input);
    this.getValue(input);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
    this.validateCountry(input, errorSpan);
  }

  public createInput(): HTMLSelectElement {
    const input = new ElementCreator(fieldsetParams.select).getElement() as HTMLSelectElement;
    input.setAttribute('required', fieldsetParams.input.required);
    const countriesObj = CountryInputParams.countries;
    countriesObj.forEach((element, i: number) => {
      input.append(this.createOption(countriesObj[i].code, countriesObj[i].countryName));
    });
    return input;
  }

  public getValue(element: HTMLSelectElement): string {
    return element.value;
  }

  public createOption(value: string, text: string): HTMLElement {
    const option = new ElementCreator(CountryInputParams.option).getElement();
    option.setAttribute('value', value);
    option.textContent = text;
    return option;
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

  public validateCountry(element: HTMLSelectElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    this.getValue(element);
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

  public showError(input: HTMLSelectElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    if (input.validity.valueMissing) {
      errorSpan.textContent = 'Please choose a country';
    }
    errorSpan.classList.add(CountryInputParams.errorSpan.cssClassesActive);
  }
}
