import ElementCreator from '../../../utils/element-creator';
import View from '../../view';
import formParams from './form-params';
import EmailInputView from './input-component/email-input-view/email-input-view';
import FirstNameInputView from './input-component/name-input-views/firstName-input-view/firstName-input-view';
import LastNameInputView from './input-component/name-input-views/lastName-input-view/lastName-input-view';
import PasswordInputView from './input-component/password-input-view/password-input-view';
import DateInputView from './input-component/date-input-view/date-input-view';
import StreetInputView from './input-component/address/street-input-view/street-input-view';
import CityInputView from './input-component/address/city-input-view/city-input-view';

export default class FormView extends View {
  private emailInput: EmailInputView;

  private firstNameInput: FirstNameInputView;

  private lastNameInput: LastNameInputView;

  private passwordInput: PasswordInputView;

  private dateInput: DateInputView;

  private streetInput: StreetInputView;

  private cityInput: CityInputView;

  constructor() {
    super(formParams.form);
    this.emailInput = new EmailInputView();
    this.firstNameInput = new FirstNameInputView();
    this.lastNameInput = new LastNameInputView();
    this.passwordInput = new PasswordInputView();
    this.dateInput = new DateInputView();
    this.streetInput = new StreetInputView();
    this.cityInput = new CityInputView();
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.insertFormItems();
    this.setAttribute('novalidate', 'true');
    this.validateInput();
  }

  private insertFormItems(): void {
    this.addInnerElement(this.emailInput);
    this.addInnerElement(this.firstNameInput);
    this.addInnerElement(this.lastNameInput);
    this.addInnerElement(this.passwordInput);
    this.addInnerElement(this.dateInput);
    this.addInnerElement(this.streetInput);
    this.addInnerElement(this.cityInput);
    const submitBtn = this.createSubmitBtn();
    this.addInnerElement(submitBtn);
  }

  private validateInput(): void {
    const formEl = this.getElement();
    const inputsArr = this.getInputsArr();
    // const spansArr = this.getSpansArr();
    for (let i = 0; i < inputsArr.length; i += 1) {
      this.submitInvalid(formEl, inputsArr[i]);
    }
  }

  private getInputsArr(): HTMLInputElement[] {
    const inputsArr = [];
    const inputEmail = this.emailInput.getElement().children[1] as HTMLInputElement;
    const inputFirstName = this.firstNameInput.getElement().children[1] as HTMLInputElement;
    const inputLastName = this.lastNameInput.getElement().children[1] as HTMLInputElement;
    const inputPassword = this.passwordInput.getElement().children[1] as HTMLInputElement;
    const inputDate = this.dateInput.getElement().children[1] as HTMLInputElement;
    const inputStreet = this.streetInput.getElement().children[1] as HTMLInputElement;
    const inputCity = this.cityInput.getElement().children[1] as HTMLInputElement;
    inputsArr.push(inputEmail);
    inputsArr.push(inputFirstName);
    inputsArr.push(inputLastName);
    inputsArr.push(inputPassword);
    inputsArr.push(inputDate);
    inputsArr.push(inputStreet);
    inputsArr.push(inputCity);
    return inputsArr;
  }

  private getSpansArr(): HTMLElement[] {
    const spansArr = [];
    const errorSpanEmail = this.emailInput.getElement().children[2] as HTMLElement;
    const errorSpanFName = this.firstNameInput.getElement().children[2] as HTMLElement;
    const errorSpanLName = this.lastNameInput.getElement().children[2] as HTMLElement;
    const errorSpanPassword = this.passwordInput.getElement().children[2] as HTMLElement;
    const errorSpanDate = this.dateInput.getElement().children[2] as HTMLElement;
    const errorSpanStreet = this.streetInput.getElement().children[2] as HTMLElement;
    const errorSpanCity = this.cityInput.getElement().children[2] as HTMLElement;
    spansArr.push(errorSpanEmail);
    spansArr.push(errorSpanFName);
    spansArr.push(errorSpanLName);
    spansArr.push(errorSpanPassword);
    spansArr.push(errorSpanDate);
    spansArr.push(errorSpanStreet);
    spansArr.push(errorSpanCity);
    return spansArr;
  }

  private submitInvalid(el: HTMLElement, input: HTMLInputElement): void {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    el.addEventListener('submit', (el) => {
      if (!input.validity.valid) {
        // this.emailInput.showError(input, errorMessage);
        el.preventDefault();
      }
    });
  }

  private createSubmitBtn(): ElementCreator {
    const btn = new ElementCreator(formParams.button);
    btn.setType(formParams.button.type);
    btn.setTextContent(formParams.button.textContent);
    return btn;
  }
}
