import flatpickr from 'flatpickr';
import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import fieldsetParams from '../../registration/form-component/input-component/input-params';
import DateInputParams from '../../registration/form-component/input-component/date-fieldset-view/date-params';

export default class ProfileDateView extends View {
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
    const label = this.createLabel(DateInputParams.label.for, DateInputParams.label.textContent);
    this.addInnerElement(label);
    const input = this.createInput(DateInputParams.input.type, DateInputParams.input.id);
    flatpickr(input, {
      maxDate: this.getDate13yo(),
      dateFormat: 'Y-m-d',
    });
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      input.setAttribute('type', 'date');
      input.setAttribute('max', this.getDate13yo());
      input.removeAttribute('readonly');
    }

    this.addInnerElement(input);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
    this.validateDate(input, errorSpan);
  }

  private getDate13yo(): string {
    const today = new Date();
    let day = today.getDate().toString();
    let month = (today.getMonth() + 1).toString();
    const year = today.getFullYear() - 13;

    if (Number(day) < 10) {
      day = `0${day}`;
    }
    if (Number(month) < 10) {
      month = `0${month}`;
    }
    const todayDate = `${year}-${month}-${day}`;
    return todayDate;
  }

  public createInput(type: string, id: string): HTMLInputElement {
    const input = new ElementCreator(fieldsetParams.input).getElement() as HTMLInputElement;
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('required', fieldsetParams.input.required);
    input.setAttribute('disabled', 'true');
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

  private checkDate(str: string) {
    const reg = /(0[1-9]|[12][0-9]|3[01])(\/|-)(0[1-9]|1[1,2])(\/|-)(19|20)\d{2}/;
    const result = reg.test(str);
    return result;
  }

  private validateDate(element: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    element.addEventListener('input', () => {
      const checkRes = this.checkDate(element.value);
      if (element.validity.valid || checkRes) {
        errorSpan.textContent = '';
        errorSpan.classList.add(DateInputParams.errorSpan.cssClasses);
        element.classList.add(DateInputParams.input.cssClassesValid);
      } else {
        this.showError(element, errorMessage);
      }
    });
  }

  public showError(date: HTMLInputElement, errorMessage: HTMLElement) {
    const errorSpan = errorMessage;
    if (!date.value) {
      errorSpan.textContent = 'Enter your date of birth. You have to be at least 13 years old to register';
    }
    errorSpan.classList.add(DateInputParams.errorSpan.cssClassesActive);
  }
}
