/* eslint-disable @typescript-eslint/comma-dangle */
import { postcodeValidator } from 'postcode-validator';
import ElementCreator from '../../../utils/element-creator';
import View from '../../view';
import formParams from './form-params';
import WrapperParams from '../../wrapper-params';
import PostcodeInputParams from './input-component/address/postcode-input-view/postcode-params';
import EmailInputView from './input-component/email-input-view/email-input-view';
import FirstNameInputView from './input-component/name-input-views/firstName-input-view/firstName-input-view';
import LastNameInputView from './input-component/name-input-views/lastName-input-view/lastName-input-view';
import PasswordInputView from './input-component/password-input-view/password-input-view';
import DateInputView from './input-component/date-input-view/date-input-view';
import StreetInputView from './input-component/address/street-input-view/street-input-view';
import CityInputView from './input-component/address/city-input-view/city-input-view';
import CountryInputView from './input-component/address/country-input-view/country-input-view';
import PostcodeInputView from './input-component/address/postcode-input-view/postcode-input-view';
import CheckboxView from './input-component/address/checkbox-view/checkbox-view';
import { ElementParamsType } from '../../../../types';

export default class FormView extends View {
  private emailInput: EmailInputView;

  private firstNameInput: FirstNameInputView;

  private lastNameInput: LastNameInputView;

  private passwordInput: PasswordInputView;

  private dateInput: DateInputView;

  private streetShipInput: StreetInputView;

  private cityShipInput: CityInputView;

  private countryShipSelect: CountryInputView;

  private postcodeShipInput: PostcodeInputView;

  private streetBillInput: StreetInputView;

  private cityBillInput: CityInputView;

  private countryBillSelect: CountryInputView;

  private postcodeBillInput: PostcodeInputView;

  private checkbox: CheckboxView;

  constructor() {
    super(formParams.form);
    this.emailInput = new EmailInputView();
    this.firstNameInput = new FirstNameInputView();
    this.lastNameInput = new LastNameInputView();
    this.passwordInput = new PasswordInputView();
    this.dateInput = new DateInputView();
    this.streetShipInput = new StreetInputView();
    this.cityShipInput = new CityInputView();
    this.countryShipSelect = new CountryInputView();
    this.postcodeShipInput = new PostcodeInputView();
    this.streetBillInput = new StreetInputView();
    this.cityBillInput = new CityInputView();
    this.countryBillSelect = new CountryInputView();
    this.postcodeBillInput = new PostcodeInputView();
    this.checkbox = new CheckboxView();
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.insertFormItems();
    this.setAttribute('novalidate', 'true');
    this.validateInput();
    this.checkShipPostcode();
    this.checkBillPostcode();
    this.callSameAdrs();
  }

  private insertFormItems(): void {
    this.addInnerElement(this.emailInput);
    this.addInnerElement(this.firstNameInput);
    this.addInnerElement(this.lastNameInput);
    this.addInnerElement(this.passwordInput);
    this.addInnerElement(this.dateInput);
    const shipAdrsWrapper = this.createAdrsWrapper(
      WrapperParams,
      formParams.heading.shipping.text,
      this.cityShipInput,
      this.streetShipInput,
      this.countryShipSelect,
      this.postcodeShipInput,
      this.checkbox
    );
    this.addInnerElement(shipAdrsWrapper);
    const billAdrsWrapper = this.createAdrsWrapper(
      WrapperParams,
      formParams.heading.billing.text,
      this.cityBillInput,
      this.streetBillInput,
      this.countryBillSelect,
      this.postcodeBillInput,
      this.checkbox
    );
    this.addInnerElement(billAdrsWrapper);
    const submitBtn = this.createSubmitBtn();
    this.addInnerElement(submitBtn);
  }

  private createAdrsWrapper(
    params: ElementParamsType,
    hdnText: string,
    city: CityInputView,
    street: StreetInputView,
    country: CountryInputView,
    postcode: PostcodeInputView,
    checkbox: CheckboxView
  ): ElementCreator {
    const wrapper = new ElementCreator(params);
    wrapper.setCssClasses(formParams.addressDiv.cssClasses);
    const hdn = new ElementCreator(formParams.heading);
    hdn.setTextContent(hdnText);
    wrapper.addInnerElement(hdn);
    wrapper.addInnerElement(city);
    wrapper.addInnerElement(street);
    wrapper.addInnerElement(country);
    wrapper.addInnerElement(postcode);
    if (hdnText === 'Shipping Address') {
      wrapper.addInnerElement(checkbox);
    }
    return wrapper;
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
    const inputShipStreet = this.streetShipInput.getElement().children[1] as HTMLInputElement;
    const inputShipCity = this.cityShipInput.getElement().children[1] as HTMLInputElement;
    const inputShipPostcode = this.postcodeShipInput.getElement().children[1] as HTMLInputElement;
    const inputBillStreet = this.streetBillInput.getElement().children[1] as HTMLInputElement;
    const inputBillCity = this.cityBillInput.getElement().children[1] as HTMLInputElement;
    const inputBillPostcode = this.postcodeBillInput.getElement().children[1] as HTMLInputElement;
    inputsArr.push(inputEmail);
    inputsArr.push(inputFirstName);
    inputsArr.push(inputLastName);
    inputsArr.push(inputPassword);
    inputsArr.push(inputDate);
    inputsArr.push(inputShipStreet);
    inputsArr.push(inputShipCity);
    inputsArr.push(inputShipPostcode);
    inputsArr.push(inputBillStreet);
    inputsArr.push(inputBillCity);
    inputsArr.push(inputBillPostcode);
    return inputsArr;
  }

  private checkShipPostcode() {
    const shipCountry = this.countryShipSelect.getElement().children[1] as HTMLSelectElement;
    const shipPostcode = this.postcodeShipInput.getElement().children[1] as HTMLInputElement;
    const errorShipPostcode = this.postcodeShipInput.getElement().children[2] as HTMLElement;
    shipPostcode.addEventListener('input', () => {
      try {
        // eslint-disable-next-line max-len
        this.checkPostcodeFunc(shipPostcode.value, shipCountry.value, errorShipPostcode, shipPostcode);
      } catch (error) {
        errorShipPostcode.textContent = 'Please choose a country';
      }
    });
    shipCountry.addEventListener('change', () => {
      try {
        // eslint-disable-next-line max-len
        this.checkPostcodeFunc(shipPostcode.value, shipCountry.value, errorShipPostcode, shipPostcode);
      } catch (error) {
        errorShipPostcode.textContent = 'Please choose a country';
      }
    });
  }

  private checkBillPostcode() {
    const billCountry = this.countryBillSelect.getElement().children[1] as HTMLSelectElement;
    const billPostcode = this.postcodeBillInput.getElement().children[1] as HTMLInputElement;
    const errorBillPostcode = this.postcodeBillInput.getElement().children[2] as HTMLElement;
    billPostcode.addEventListener('input', () => {
      try {
        // eslint-disable-next-line max-len
        this.checkPostcodeFunc(billPostcode.value, billCountry.value, errorBillPostcode, billPostcode);
      } catch (error) {
        errorBillPostcode.textContent = 'Please choose a country';
      }
    });
    billCountry.addEventListener('change', () => {
      try {
        // eslint-disable-next-line max-len
        this.checkPostcodeFunc(billPostcode.value, billCountry.value, errorBillPostcode, billPostcode);
      } catch (error) {
        errorBillPostcode.textContent = 'Please choose a country';
      }
    });
  }

  // eslint-disable-next-line max-len
  private checkPostcodeFunc(postcode: string, country: string, errorEl: HTMLElement, input: HTMLInputElement) {
    const errorSpan = errorEl;
    if (postcodeValidator(postcode, country)) {
      errorSpan.textContent = '';
      errorSpan.classList.add(PostcodeInputParams.errorSpan.cssClasses);
      input.classList.remove(PostcodeInputParams.input.cssClassesInvalid);
    } else {
      this.postcodeShipInput.showError(input, errorSpan);
    }
  }

  // private getSpansArr(): HTMLElement[] {
  //   const spansArr = [];
  //   const errorSpanEmail = this.emailInput.getElement().children[2] as HTMLElement;
  //   const errorSpanFName = this.firstNameInput.getElement().children[2] as HTMLElement;
  //   const errorSpanLName = this.lastNameInput.getElement().children[2] as HTMLElement;
  //   const errorSpanPassword = this.passwordInput.getElement().children[2] as HTMLElement;
  //   const errorSpanDate = this.dateInput.getElement().children[2] as HTMLElement;
  //   const errorSpanStreet = this.streetShipInput.getElement().children[2] as HTMLElement;
  //   const errorSpanCity = this.cityShipInput.getElement().children[2] as HTMLElement;
  //   const errorSpanPostcode = this.postcodeShipInput.getElement().children[2] as HTMLElement;
  //   spansArr.push(errorSpanEmail);
  //   spansArr.push(errorSpanFName);
  //   spansArr.push(errorSpanLName);
  //   spansArr.push(errorSpanPassword);
  //   spansArr.push(errorSpanDate);
  //   spansArr.push(errorSpanStreet);
  //   spansArr.push(errorSpanCity);
  //   spansArr.push(errorSpanPostcode);
  //   return spansArr;
  // }

  private sameAddress() {
    const checked = this.checkbox.sameAdrs;
    return checked;
  }

  private copyAdrsValues(
    inputForShip: HTMLInputElement | HTMLSelectElement,
    inputForBill: HTMLInputElement | HTMLSelectElement,
    checkbox: HTMLInputElement
  ) {
    const inputBill = inputForBill;
    checkbox.addEventListener('change', () => {
      if (this.sameAddress()) {
        inputBill.value = inputForShip.value;

        // this.cityBillInput.setAttribute('style', 'display:none');
        // this.countryBillSelect.setAttribute('style', 'display:none');
        // this.streetBillInput.setAttribute('style', 'display:none');
        // this.postcodeBillInput.setAttribute('style', 'display:none');
      } else {
        // this.cityBillInput.removeAttribute('style');
        // this.countryBillSelect.removeAttribute('style');
        // this.streetBillInput.removeAttribute('style');
        // this.postcodeBillInput.removeAttribute('style');
      }
    });
    inputForShip.addEventListener('input', () => {
      if (this.sameAddress()) {
        inputBill.value = inputForShip.value;
      }
    });
  }

  private callSameAdrs() {
    const shipCity = this.cityShipInput.getElement().children[1] as HTMLInputElement;
    const billCity = this.cityBillInput.getElement().children[1] as HTMLInputElement;
    const shipCountry = this.countryShipSelect.getElement().children[1] as HTMLSelectElement;
    const billCountry = this.countryBillSelect.getElement().children[1] as HTMLSelectElement;
    const shipStreet = this.streetShipInput.getElement().children[1] as HTMLSelectElement;
    const billStreet = this.streetBillInput.getElement().children[1] as HTMLSelectElement;
    const shipPostcode = this.postcodeShipInput.getElement().children[1] as HTMLSelectElement;
    const billPostcode = this.postcodeBillInput.getElement().children[1] as HTMLSelectElement;
    const checkbox = this.checkbox.getElement().children[0] as HTMLInputElement;

    this.copyAdrsValues(shipCity, billCity, checkbox);
    this.copyAdrsValues(shipCountry, billCountry, checkbox);
    this.copyAdrsValues(shipStreet, billStreet, checkbox);
    this.copyAdrsValues(shipPostcode, billPostcode, checkbox);
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
