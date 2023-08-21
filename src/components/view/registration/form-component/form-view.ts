/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/comma-dangle */
import { postcodeValidator } from 'postcode-validator';
import { Address } from '@commercetools/platform-sdk';
import Noty from 'noty';
import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
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
import Router from '../../../router/Router';
import PAGES from '../../../router/pages';
import ClientAPI from '../../../utils/Client';

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

  private router: Router;

  clientAPI: ClientAPI;

  public sameAdrs: boolean;

  constructor(router: Router) {
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
    this.clientAPI = new ClientAPI();
    this.sameAdrs = false;
    this.router = router;
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.insertFormItems();
    this.setAttribute('novalidate', 'true');
    this.submitForm();
    this.checkShipPostcode();
    this.checkBillPostcode();
    this.callSameAdrs();
    this.changeChecked();
  }

  private insertFormItems(): void {
    const wrapper = new ElementCreator(WrapperParams);
    const heading = new ElementCreator(formParams.heading);
    heading.setTextContent(formParams.heading.basicInfo.text);
    wrapper.addInnerElement(heading);
    wrapper.addInnerElement(this.addSignInLink());
    wrapper.addInnerElement(this.emailInput);
    wrapper.addInnerElement(this.passwordInput);
    wrapper.addInnerElement(this.firstNameInput);
    wrapper.addInnerElement(this.lastNameInput);
    wrapper.addInnerElement(this.dateInput);
    wrapper.setCssClasses(formParams.basicInfoDiv.cssClasses);
    this.addInnerElement([heading, wrapper]);
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

  private addSignInLink(): ElementCreator {
    const signInDiv = new ElementCreator(formParams.signInDiv);
    const signInLink = new ElementCreator(formParams.signInLink);
    signInLink.setAttribute('href', '#');
    const signInElement = signInLink.getElement();
    signInElement.addEventListener('click', () => {
      this.router.navigate(PAGES.LOG_IN);
    });
    signInDiv.addInnerElement(signInLink);
    return signInDiv;
  }

  private checkShipPostcode() {
    const shipCountry = this.countryShipSelect.getChildren()[1] as HTMLSelectElement;
    const shipPostcode = this.postcodeShipInput.getChildren()[1] as HTMLInputElement;
    const errorShipPostcode = this.postcodeShipInput.getChildren()[2] as HTMLElement;
    shipPostcode.addEventListener('input', () => {
      this.checkPostcode(shipPostcode, shipCountry, errorShipPostcode);
    });
    shipCountry.addEventListener('change', () => {
      this.checkPostcode(shipPostcode, shipCountry, errorShipPostcode);
    });
  }

  private checkPostcode(postcode: HTMLInputElement, country: HTMLSelectElement, errorSpan: HTMLElement) {
    try {
      this.checkPostcodeFunc(postcode.value, country.value, errorSpan, postcode);
    } catch (error) {
      // eslint-disable-next-line no-param-reassign
      errorSpan.textContent = 'Please choose a country';
    }
  }

  private checkBillPostcode() {
    const billCountry = this.countryBillSelect.getChildren()[1] as HTMLSelectElement;
    const billPostcode = this.postcodeBillInput.getChildren()[1] as HTMLInputElement;
    const errorBillPostcode = this.postcodeBillInput.getChildren()[2] as HTMLElement;
    this.checkPostcode(billPostcode, billCountry, errorBillPostcode);
    billPostcode.addEventListener('input', () => {
      this.checkPostcode(billPostcode, billCountry, errorBillPostcode);
    });
    billCountry.addEventListener('change', () => {
      this.checkPostcode(billPostcode, billCountry, errorBillPostcode);
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

  private changeChecked() {
    const checkbox = this.checkboxSameAdrs.getChildren()[0] as HTMLInputElement;
    checkbox.addEventListener('change', () => {
      this.sameAdrs = checkbox.checked;
    });
  }

  private copyAdrsValues(
    inputForShip: HTMLInputElement | HTMLSelectElement,
    inputForBill: HTMLInputElement | HTMLSelectElement,
    billError: HTMLElement,
    checkbox: HTMLInputElement
  ) {
    const inputBill = inputForBill;

    checkbox.addEventListener('change', () => {
      if (!this.sameAdrs) {
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
      if (this.sameAdrs) {
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
  }

  private callSameAdrs() {
    const shipCity = this.cityShipInput.getChildren()[1] as HTMLInputElement;
    const billCity = this.cityBillInput.getChildren()[1] as HTMLInputElement;
    const billCityError = this.cityBillInput.getChildren()[2] as HTMLElement;

    const shipCountry = this.countryShipSelect.getChildren()[1] as HTMLSelectElement;
    const billCountry = this.countryBillSelect.getChildren()[1] as HTMLSelectElement;
    const billCountryError = this.countryBillSelect.getChildren()[2] as HTMLElement;

    const shipStreet = this.streetShipInput.getChildren()[1] as HTMLSelectElement;
    const billStreet = this.streetBillInput.getChildren()[1] as HTMLSelectElement;
    const billStreetError = this.streetBillInput.getChildren()[2] as HTMLElement;

    const shipPostcode = this.postcodeShipInput.getChildren()[1] as HTMLSelectElement;
    const billPostcode = this.postcodeBillInput.getChildren()[1] as HTMLSelectElement;
    const billPostcodeError = this.postcodeBillInput.getChildren()[2] as HTMLElement;
    const checkbox = this.checkboxSameAdrs.getChildren()[0] as HTMLInputElement;

    this.copyAdrsValues(shipCity, billCity, billCityError, checkbox);
    this.copyAdrsValues(shipCountry, billCountry, billCountryError, checkbox);
    this.copyAdrsValues(shipStreet, billStreet, billStreetError, checkbox);
    this.copyAdrsValues(shipPostcode, billPostcode, billPostcodeError, checkbox);
  }

  private getInputsArr(): (HTMLInputElement | HTMLSelectElement)[] {
    const inputsArr = [];
    const inputEmail = this.emailInput.getChildren()[1] as HTMLInputElement;
    const inputPassword = this.passwordInput.getChildren()[1] as HTMLInputElement;
    const inputFirstName = this.firstNameInput.getChildren()[1] as HTMLInputElement;
    const inputLastName = this.lastNameInput.getChildren()[1] as HTMLInputElement;
    const inputDate = this.dateInput.getChildren()[1] as HTMLInputElement;
    const inputShipCity = this.cityShipInput.getChildren()[1] as HTMLInputElement;
    const inputShipStreet = this.streetShipInput.getChildren()[1] as HTMLInputElement;
    const selectShipCountry = this.countryShipSelect.getChildren()[1] as HTMLSelectElement;
    const inputShipPostcode = this.postcodeShipInput.getChildren()[1] as HTMLInputElement;
    const inputBillCity = this.cityBillInput.getChildren()[1] as HTMLInputElement;
    const inputBillStreet = this.streetBillInput.getChildren()[1] as HTMLInputElement;
    const selectBillCountry = this.countryBillSelect.getChildren()[1] as HTMLSelectElement;
    const inputBillPostcode = this.postcodeBillInput.getChildren()[1] as HTMLInputElement;
    inputsArr.push(inputEmail);
    inputsArr.push(inputPassword);
    inputsArr.push(inputFirstName);
    inputsArr.push(inputLastName);
    inputsArr.push(inputDate);
    inputsArr.push(inputShipCity);
    inputsArr.push(inputShipStreet);
    inputsArr.push(selectShipCountry);
    inputsArr.push(inputShipPostcode);
    inputsArr.push(inputBillCity);
    inputsArr.push(inputBillStreet);
    inputsArr.push(selectBillCountry);
    inputsArr.push(inputBillPostcode);
    return inputsArr;
  }

  private checkInputsValidity() {
    const arr = this.getInputsArr();
    const result: (HTMLSelectElement | HTMLInputElement)[] = [];
    arr.forEach((element) => {
      if (element.classList.contains('reg-form__input-invalid')) {
        result.push(element);
      }
    });
    return result.length === 0;
  }

  private getDefaultStatuses(): boolean[] {
    const defaultShip = this.checkboxDefaultShip.getChildren()[0] as HTMLInputElement;
    const defaultBill = this.checkboxDefaultBill.getChildren()[0] as HTMLInputElement;
    const defaultStatusArr = [];
    defaultStatusArr.push(defaultShip.checked, defaultBill.checked);
    return defaultStatusArr;
  }

  private makeAdrsObj(
    cityInput: HTMLInputElement,
    streetInput: HTMLInputElement,
    countrySelect: HTMLSelectElement,
    postcodeInput: HTMLInputElement
  ) {
    const shipAdrsObj: Address = {
      city: cityInput.value,
      streetName: streetInput.value,
      country: countrySelect.value,
      postalCode: postcodeInput.value,
    };
    return shipAdrsObj;
  }

  private makeAdrsArr(): Address[] {
    const adrsArr = [];
    adrsArr.push(
      this.makeAdrsObj(
        this.getInputsArr()[5] as HTMLInputElement,
        this.getInputsArr()[6] as HTMLInputElement,
        this.getInputsArr()[7] as HTMLSelectElement,
        this.getInputsArr()[8] as HTMLInputElement
      ),
      this.makeAdrsObj(
        this.getInputsArr()[9] as HTMLInputElement,
        this.getInputsArr()[10] as HTMLInputElement,
        this.getInputsArr()[11] as HTMLSelectElement,
        this.getInputsArr()[12] as HTMLInputElement
      )
    );
    return adrsArr;
  }

  private async signUp() {
    const email = this.getInputsArr()[0].value;
    const password = this.getInputsArr()[1].value;
    const fName = this.getInputsArr()[2].value;
    const lName = this.getInputsArr()[3].value;
    const dateOfBirth = this.getInputsArr()[4].value;
    const adrsArr = this.makeAdrsArr();

    const defStatusArr = this.getDefaultStatuses();
    let defaultShipAdrs;
    let defaultBillAdrs;
    if (defStatusArr[0]) {
      defaultShipAdrs = 0;
    } else if (!defStatusArr[0]) {
      defaultShipAdrs = undefined;
    }
    if (defStatusArr[1]) {
      defaultBillAdrs = 1;
    } else if (!defStatusArr[1]) {
      defaultBillAdrs = undefined;
    }
    try {
      const signUpAPI = await this.clientAPI.registerClient(
        email,
        password,
        fName,
        lName,
        dateOfBirth,
        adrsArr,
        [0],
        [1],
        defaultShipAdrs,
        defaultBillAdrs
      );
      if (signUpAPI.statusCode === 201) {
        this.showRegMessage();
        this.login(email, password);
      } else if (signUpAPI.statusCode && signUpAPI.statusCode >= 500) {
        this.showSignUpErrorMessage(formParams.serverProblemMessage);
      }
    } catch {
      this.showSignUpErrorMessage(formParams.errorSignUpMessage);
    }
  }

  private showRegMessage(): void {
    new Noty({
      theme: 'mint',
      text: formParams.signUpMessage,
      timeout: 3000,
      progressBar: true,
      type: 'success',
    }).show();
  }

  private showLoginErrorMessage(): void {
    new Noty({
      theme: 'mint',
      text: formParams.errorLoginMessage,
      timeout: 3000,
      progressBar: true,
      type: 'error',
    }).show();
  }

  private showSignUpErrorMessage(message: string): void {
    new Noty({
      theme: 'mint',
      text: message,
      timeout: 3000,
      progressBar: true,
      type: 'error',
    }).show();
  }

  private async login(email: string, password: string) {
    try {
      const loginAPI = await this.clientAPI.loginClient(email, password);
      if (loginAPI.statusCode === 200) {
        this.router.navigate(PAGES.MAIN);
      } else if (loginAPI.statusCode === undefined) {
        this.showLoginErrorMessage();
      }
    } catch {
      this.showLoginErrorMessage();
    }
  }

  private submitForm(): void {
    const formEl = this.getElement() as HTMLFormElement;
    formEl.addEventListener('submit', (el) => {
      console.log(formEl.checkValidity());
      this.checkInputsValidity();
      el.preventDefault();
      if (formEl.checkValidity() && this.checkInputsValidity()) {
        this.signUp();
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
