/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/comma-dangle */
import { postcodeValidator } from 'postcode-validator';
import ElementCreator from '../../../utils/element-creator';
import View from '../../view';
import formParams from './form-params';
import WrapperParams from '../../wrapper-params';
import PostcodeInputParams from './input-component/address/postcode-fieldset-view/postcode-params';
import EmailInputView from './input-component/email-fieldset-view/email-input-view';
import FirstNameInputView from './input-component/name-views/firstName-fieldset-view/firstName-input-view';
import LastNameInputView from './input-component/name-views/lastName-fieldset-view/lastName-input-view';
import PasswordInputView from './input-component/password-fieldset-view/password-input-view';
import DateInputView from './input-component/date-fieldset-view/date-input-view';
import StreetInputView from './input-component/address/street-input-view/street-input-view';
import CityInputView from './input-component/address/city-fieldset-view/city-input-view';
import CountryInputView from './input-component/address/country-fieldset-view/country-input-view';
import PostcodeInputView from './input-component/address/postcode-fieldset-view/postcode-input-view';
import CheckboxView from './input-component/address/checkbox-view/checkbox-view';
import CheckboxInputParams from './input-component/address/checkbox-view/checkbox-params';
import { ElementParamsType } from '../../../../types';
import CityInputParams from './input-component/address/city-fieldset-view/city-params';
import StreetInputParams from './input-component/address/street-input-view/street-params';
import CountryInputParams from './input-component/address/country-fieldset-view/country-params';

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

  private checkboxSameAdrs: CheckboxView;

  private checkboxDefaultShip: CheckboxView;

  private checkboxDefaultBill: CheckboxView;

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
    this.checkboxSameAdrs = new CheckboxView();
    this.checkboxDefaultShip = new CheckboxView();
    this.checkboxDefaultBill = new CheckboxView();
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
      this.checkboxSameAdrs,
      this.checkboxDefaultShip
    );
    this.addInnerElement(shipAdrsWrapper);
    this.cityShipInput.getChildren()[1].setAttribute('id', CityInputParams.forId.ship);
    this.cityShipInput.getChildren()[0].setAttribute('for', CityInputParams.forId.ship);
    this.streetShipInput.getChildren()[1].setAttribute('id', StreetInputParams.forId.ship);
    this.streetShipInput.getChildren()[0].setAttribute('for', StreetInputParams.forId.ship);
    this.countryShipSelect.getChildren()[1].setAttribute('id', CountryInputParams.forId.ship);
    this.countryShipSelect.getChildren()[0].setAttribute('for', CountryInputParams.forId.ship);
    this.postcodeShipInput.getChildren()[1].setAttribute('id', PostcodeInputParams.forId.ship);
    this.postcodeShipInput.getChildren()[0].setAttribute('for', PostcodeInputParams.forId.ship);

    this.checkboxSameAdrs.createInput(CheckboxInputParams.input.type, CheckboxInputParams.forId.sameAdrs);
    this.checkboxSameAdrs.createLabel(
      CheckboxInputParams.forId.sameAdrs,
      CheckboxInputParams.labelTextContent.sameAdrs
    );

    this.checkboxDefaultShip.createInput(CheckboxInputParams.input.type, CheckboxInputParams.forId.defaultShip);
    this.checkboxDefaultShip.createLabel(
      CheckboxInputParams.forId.defaultShip,
      CheckboxInputParams.labelTextContent.defaultShip
    );

    const billAdrsWrapper = this.createAdrsWrapper(
      WrapperParams,
      formParams.heading.billing.text,
      this.cityBillInput,
      this.streetBillInput,
      this.countryBillSelect,
      this.postcodeBillInput,
      this.checkboxSameAdrs,
      this.checkboxDefaultBill
    );
    this.addInnerElement(billAdrsWrapper);

    this.cityBillInput.getChildren()[1].setAttribute('id', CityInputParams.forId.bill);
    this.cityBillInput.getChildren()[0].setAttribute('for', CityInputParams.forId.bill);
    this.streetBillInput.getChildren()[1].setAttribute('id', StreetInputParams.forId.bill);
    this.streetBillInput.getChildren()[0].setAttribute('for', StreetInputParams.forId.bill);
    this.countryBillSelect.getChildren()[1].setAttribute('id', CountryInputParams.forId.bill);
    this.countryBillSelect.getChildren()[0].setAttribute('for', CountryInputParams.forId.bill);
    this.postcodeBillInput.getChildren()[1].setAttribute('id', PostcodeInputParams.forId.bill);
    this.postcodeBillInput.getChildren()[0].setAttribute('for', PostcodeInputParams.forId.bill);

    this.checkboxDefaultBill.createInput(CheckboxInputParams.input.type, CheckboxInputParams.forId.defaultBill);
    this.checkboxDefaultBill.createLabel(
      CheckboxInputParams.forId.defaultBill,
      CheckboxInputParams.labelTextContent.defaultBill
    );

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
    checkboxSameAdrs: CheckboxView,
    checkboxDefault: CheckboxView
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
    wrapper.addInnerElement(checkboxDefault);
    if (hdnText === 'Shipping Address') {
      wrapper.addInnerElement(checkboxSameAdrs);
    }
    return wrapper;
  }

  private validateInput(): void {
    const formEl = this.getElement();
    const inputsArr = this.getInputsArr();
    for (let i = 0; i < inputsArr.length; i += 1) {
      this.submitInvalid(formEl, inputsArr[i]);
    }
  }

  private checkShipPostcode() {
    const shipCountry = this.countryShipSelect.getElement().children[1] as HTMLSelectElement;
    const shipPostcode = this.postcodeShipInput.getElement().children[1] as HTMLInputElement;
    const errorShipPostcode = this.postcodeShipInput.getElement().children[2] as HTMLElement;
    shipPostcode.addEventListener('input', () => {
      try {
        this.checkPostcodeFunc(shipPostcode.value, shipCountry.value, errorShipPostcode, shipPostcode);
      } catch (error) {
        errorShipPostcode.textContent = 'Please choose a country';
      }
    });
    shipCountry.addEventListener('change', () => {
      try {
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
    try {
      this.checkPostcodeFunc(billPostcode.value, billCountry.value, errorBillPostcode, billPostcode);
    } catch (error) {
      errorBillPostcode.textContent = 'Please choose a country';
    }
    billPostcode.addEventListener('input', () => {
      try {
        this.checkPostcodeFunc(billPostcode.value, billCountry.value, errorBillPostcode, billPostcode);
      } catch (error) {
        errorBillPostcode.textContent = 'Please choose a country';
      }
    });
    billCountry.addEventListener('change', () => {
      try {
        this.checkPostcodeFunc(billPostcode.value, billCountry.value, errorBillPostcode, billPostcode);
      } catch (error) {
        errorBillPostcode.textContent = 'Please choose a country';
      }
    });
  }

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

  private sameAddress() {
    const checked = this.checkboxSameAdrs.sameAdrs;
    return checked;
  }

  private copyAdrsValues(
    inputForShip: HTMLInputElement | HTMLSelectElement,
    inputForBill: HTMLInputElement | HTMLSelectElement,
    billError: HTMLElement,
    checkbox: HTMLInputElement
  ) {
    const inputBill = inputForBill;
    checkbox.addEventListener('change', () => {
      if (this.sameAddress()) {
        inputBill.value = inputForShip.value;
        if (inputForBill instanceof HTMLInputElement) {
          this.streetBillInput.validateStreet(inputForBill, billError);
          this.cityBillInput.validateCity(inputForBill, billError);
          this.checkBillPostcode();
        }
        if (inputForBill instanceof HTMLSelectElement) {
          this.countryBillSelect.validateCountry(inputForBill, billError);
        }
      }
    });
    inputForShip.addEventListener('input', () => {
      if (this.sameAddress()) {
        inputBill.value = inputForShip.value;
        if (inputForBill instanceof HTMLInputElement) {
          this.streetBillInput.validateStreet(inputForBill, billError);
          this.cityBillInput.validateCity(inputForBill, billError);
          this.checkBillPostcode();
        }
      }
    });
  }

  private callSameAdrs() {
    const shipCity = this.cityShipInput.getElement().children[1] as HTMLInputElement;
    const billCity = this.cityBillInput.getElement().children[1] as HTMLInputElement;
    const billCityError = this.cityBillInput.getElement().children[2] as HTMLElement;

    const shipCountry = this.countryShipSelect.getElement().children[1] as HTMLSelectElement;
    const billCountry = this.countryBillSelect.getElement().children[1] as HTMLSelectElement;
    const billCountryError = this.countryBillSelect.getElement().children[2] as HTMLElement;

    const shipStreet = this.streetShipInput.getElement().children[1] as HTMLSelectElement;
    const billStreet = this.streetBillInput.getElement().children[1] as HTMLSelectElement;
    const billStreetError = this.streetBillInput.getElement().children[2] as HTMLElement;

    const shipPostcode = this.postcodeShipInput.getElement().children[1] as HTMLSelectElement;
    const billPostcode = this.postcodeBillInput.getElement().children[1] as HTMLSelectElement;
    const billPostcodeError = this.postcodeBillInput.getElement().children[2] as HTMLElement;
    const checkbox = this.checkboxSameAdrs.getElement().children[0] as HTMLInputElement;

    this.copyAdrsValues(shipCity, billCity, billCityError, checkbox);
    this.copyAdrsValues(shipCountry, billCountry, billCountryError, checkbox);
    this.copyAdrsValues(shipStreet, billStreet, billStreetError, checkbox);
    this.copyAdrsValues(shipPostcode, billPostcode, billPostcodeError, checkbox);
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

  private submitInvalid(el: HTMLElement, input: HTMLInputElement): void {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    el.addEventListener('submit', (el) => {
      if (!input.validity.valid) {
        el.preventDefault();
      }
    });
  }

  private createSubmitBtn(): ElementCreator {
    const btn = new ElementCreator(formParams.button);
    btn.setAttribute('type', formParams.button.type);
    btn.setTextContent(formParams.button.textContent);
    return btn;
  }
}
