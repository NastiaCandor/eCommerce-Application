/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-template */
import { postcodeValidator } from 'postcode-validator';
import Noty from 'noty';
import { Address } from '@commercetools/platform-sdk';
import View from '../../View';
import ClientAPI from '../../../utils/Client';
import ElementCreator from '../../../utils/ElementCreator';
import BillAdrsParams from './bill-adrs-view-params';
import BillAddressItemView from '../address-item-view/BillAddressItemView';
import '../../../../assets/img/location-pin.svg';
import StreetInputView from '../../registration/form-component/input-component/address/street-input-view/street-input-view';
import CityInputView from '../../registration/form-component/input-component/address/city-fieldset-view/city-input-view';
import CountryInputView from '../../registration/form-component/input-component/address/country-fieldset-view/country-input-view';
import PostcodeInputView from '../../registration/form-component/input-component/address/postcode-fieldset-view/postcode-input-view';
import PostcodeInputParams from '../../registration/form-component/input-component/address/postcode-fieldset-view/postcode-params';

export default class ProfileBillAdrsView extends View {
  private streetInput: StreetInputView;

  private cityInput: CityInputView;

  private countryInput: CountryInputView;

  private postcodeInput: PostcodeInputView;

  private clientAPI: ClientAPI;

  private currentVersion: number;

  constructor(clientAPI: ClientAPI) {
    super(BillAdrsParams.addressWrapper);
    this.clientAPI = clientAPI;
    this.streetInput = new StreetInputView();
    this.cityInput = new CityInputView();
    this.countryInput = new CountryInputView();
    this.postcodeInput = new PostcodeInputView();
    this.render();
    this.currentVersion = 0;
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
    this.checkPostcodeEvents();
  }

  private async renderInnerWrapper() {
    const topPart = this.createTopPart();
    this.addInnerElement(topPart);

    const popUpBack = this.createPopUpBack();
    this.addInnerElement(popUpBack);

    const addNewAdrsForm = this.showNewAdrsForm();
    this.addInnerElement(addNewAdrsForm);
    const addNewAdrsFormEl = addNewAdrsForm.getElement() as HTMLFormElement;

    const closePopUpBtn = this.createClosePopUpBtn(addNewAdrsForm, popUpBack);
    addNewAdrsForm.addInnerElement(closePopUpBtn);

    const addNewAdrsBtn = this.createAddNewAdrsBtn();
    this.addInnerElement(addNewAdrsBtn);

    addNewAdrsBtn.getElement().addEventListener('click', async () => {
      this.currentVersion = await this.getCustomerVersion();
      this.toggleAppearClasses(addNewAdrsForm.getElement(), popUpBack.getElement());
    });

    const adrsItemsWrapper = this.createAdrsItemsWrapper();
    this.addInnerElement(adrsItemsWrapper);
    const defaultID = (await this.getDefaultAddressID()) as string;
    const adrsArr = this.getBillingAddresses();
    (await adrsArr).forEach((adrs) => {
      const adrsID = adrs.id as string;
      let defaultStatus = 'false';
      if (adrsID === defaultID) {
        defaultStatus = 'true';
      } else if (adrsID !== defaultID) {
        defaultStatus = 'false';
      }
      const streetName = adrs.streetName as string;
      const cityName = adrs.city as string;
      const countryName = adrs.country as string;
      const postalCode = adrs.postalCode as string;
      const adrsItem = new BillAddressItemView(this.clientAPI);
      adrsItem.renderInnerWrapper(streetName, cityName, countryName, postalCode, adrsID, defaultStatus);
      adrsItemsWrapper.addInnerElement(adrsItem);
    });
    this.submitForm(addNewAdrsFormEl, addNewAdrsForm, popUpBack);
  }

  private createAdrsItemsWrapper() {
    const adrsItemsWrapper = new ElementCreator(BillAdrsParams.addressItemsWrapper);
    // const element = adrsItemsWrapper.getElement() as Element;
    // element.addEventListener('click', (el: Event) => {
    //   const { target } = el;
    //   if ((target as HTMLElement).classList.contains('default-adrs__wrapper')) {
    //     this.getElement().replaceChildren();
    //     this.renderInnerWrapper();
    //   }
    // });
    return adrsItemsWrapper;
  }

  private showNewAdrsForm() {
    const adrsForm = new ElementCreator(BillAdrsParams.form);

    const { streetInput } = this;
    adrsForm.addInnerElement(streetInput);
    const { cityInput } = this;
    adrsForm.addInnerElement(cityInput);
    const { countryInput } = this;
    adrsForm.addInnerElement(countryInput);
    const { postcodeInput } = this;
    adrsForm.addInnerElement(postcodeInput);
    const saveBtn = this.createSaveBtn();
    adrsForm.addInnerElement(saveBtn);
    return adrsForm;
  }

  private createClosePopUpBtn(adrsFormEl: ElementCreator, popUpBackEl: ElementCreator) {
    const closePopUpBtn = new ElementCreator(BillAdrsParams.popUpCloseBtn);
    const closePopUpBtnCross = new ElementCreator(BillAdrsParams.popUpCloseBtnImg);
    closePopUpBtn.addInnerElement(closePopUpBtnCross);
    closePopUpBtn.getElement().addEventListener('click', () => {
      this.toggleAppearClasses(adrsFormEl.getElement(), popUpBackEl.getElement());
    });
    return closePopUpBtn;
  }

  private toggleAppearClasses(formEl: HTMLElement, popUpBack: HTMLElement) {
    formEl.classList.toggle('appear-form');
    popUpBack.classList.toggle('appear');
  }

  private createPopUpBack() {
    const popUpBack = new ElementCreator(BillAdrsParams.popUpBack);
    return popUpBack;
  }

  private createAddNewAdrsBtn() {
    const addNewAdrsBtn = new ElementCreator(BillAdrsParams.buttonAddAdrs);
    addNewAdrsBtn.setAttribute('type', BillAdrsParams.buttonAddAdrs.type);
    const addAdrsIcon = new ElementCreator(BillAdrsParams.buttonAddAdrsImg);
    addNewAdrsBtn.addInnerElement(addAdrsIcon);
    const addAdrsText = new ElementCreator(BillAdrsParams.buttonAddAdrsSpan);
    addNewAdrsBtn.addInnerElement(addAdrsText);
    return addNewAdrsBtn;
  }

  private async addAddress(
    streetInput: HTMLInputElement,
    cityInput: HTMLInputElement,
    countryInput: HTMLSelectElement,
    postcodeInput: HTMLInputElement
  ) {
    try {
      const addAddressAPI = await this.clientAPI.addAddress(
        this.getCustomerIDCookie() as string,
        this.currentVersion,
        streetInput.value,
        cityInput.value,
        countryInput.value,
        postcodeInput.value
      );
      if (addAddressAPI.statusCode === 200) {
        console.log(addAddressAPI.body);
        this.showAddAdrsMessage();
        const lastAddressID = addAddressAPI.body.addresses.at(-1)?.id as string;
        this.addBillingAddressID(lastAddressID);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async addBillingAddressID(lastAddressID: string) {
    this.currentVersion = await this.getCustomerVersion();
    try {
      const addBillingAddressAPI = await this.clientAPI.addBillingAddressID(
        this.getCustomerIDCookie() as string,
        this.currentVersion,
        lastAddressID
      );
      if (addBillingAddressAPI.statusCode === 200) {
        console.log(addBillingAddressAPI.body);
        const adrsArr = this.getBillingAddresses();
        (await adrsArr).forEach((adrs) => {
          const adrsID = adrs.id as string;
          const streetName = adrs.streetName as string;
          const cityName = adrs.city as string;
          const countryName = adrs.country as string;
          const postalCode = adrs.postalCode as string;
          const adrsItem = new BillAddressItemView(this.clientAPI);
          adrsItem.renderInnerWrapper(streetName, cityName, countryName, postalCode, adrsID, 'false');
          this.getElement().replaceChildren();
          this.renderInnerWrapper();
        });
      }
    } catch (error) {
      this.showAddAdrsErrorMessage();
    }
  }

  private showAddAdrsMessage(): void {
    new Noty({
      theme: 'mint',
      text: BillAdrsParams.addAddressMessage,
      timeout: 3000,
      progressBar: true,
      type: 'success',
    }).show();
  }

  private showAddAdrsErrorMessage(): void {
    new Noty({
      theme: 'mint',
      text: BillAdrsParams.addAdrsErrorMessage,
      timeout: 3000,
      progressBar: true,
      type: 'error',
    }).show();
  }

  private checkPostcode(postcode: HTMLInputElement, country: HTMLSelectElement, errorSpan: HTMLElement) {
    try {
      this.checkPostcodeFunc(postcode.value, country.value, errorSpan, postcode);
    } catch (error) {
      // eslint-disable-next-line no-param-reassign
      errorSpan.textContent = 'Please choose a country';
    }
  }

  private checkPostcodeEvents() {
    const country = this.countryInput.getChildren()[1] as HTMLSelectElement;
    const postcode = this.postcodeInput.getChildren()[1] as HTMLInputElement;
    const errorPostcode = this.postcodeInput.getChildren()[2] as HTMLElement;
    this.checkPostcode(postcode, country, errorPostcode);
    postcode.addEventListener('input', () => {
      this.checkPostcode(postcode, country, errorPostcode);
    });
    country.addEventListener('change', () => {
      this.checkPostcode(postcode, country, errorPostcode);
    });
  }

  private checkPostcodeFunc(postcode: string, country: string, errorEl: HTMLElement, input: HTMLInputElement) {
    const errorSpan = errorEl;
    if (postcodeValidator(postcode, country)) {
      errorSpan.textContent = '';
      errorSpan.classList.add(PostcodeInputParams.errorSpan.cssClasses);
      input.classList.remove(PostcodeInputParams.input.cssClassesInvalid);
    } else {
      this.postcodeInput.showError(input, errorSpan);
    }
  }

  private createTopPart(): ElementCreator {
    const headingWrapper = new ElementCreator(BillAdrsParams.wrapperTop);
    const heading = new ElementCreator(BillAdrsParams.heading);
    heading.setTextContent(BillAdrsParams.heading.text);
    headingWrapper.addInnerElement(heading);
    return headingWrapper;
  }

  private async getCustomerVersion() {
    const { version } = await this.getCustomer();
    return version;
  }

  private getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  private getCustomerIDCookie() {
    return this.getCookie('customer_id');
  }

  private async getCustomer() {
    const customerID = (await this.getCustomerIDCookie()) as string;
    const getCustomerAPI = this.clientAPI.getCustomerByID(customerID);
    const customer = (await getCustomerAPI()).body;
    return customer;
  }

  private async getBillingAddresses() {
    const adrsIDs = (await this.getCustomer()).billingAddressIds as string[];
    const { addresses } = await this.getCustomer();
    const result: Address[] = [];
    if (adrsIDs.length === 0) {
      this.addInnerElement(this.noAddressesText());
    }
    if (adrsIDs.length !== 0) {
      for (let i = 0; i < adrsIDs.length; i++) {
        addresses.forEach((element) => {
          if (element.id === adrsIDs[i]) {
            result.push(element);
          }
        });
      }
    }
    return result;
  }

  private async getDefaultAddressID() {
    const defaultadrsID = (await this.getCustomer()).defaultBillingAddressId as string;
    const { addresses } = await this.getCustomer();
    const result: Address[] = [];
    if (defaultadrsID === undefined) {
      return defaultadrsID;
    }
    addresses.forEach((element) => {
      if (element.id === defaultadrsID) {
        result.push(element);
      }
    });
    return result[0].id;
  }

  private noAddressesText() {
    const noAdrsDiv = new ElementCreator(BillAdrsParams.noAddresses);
    return noAdrsDiv;
  }

  private getInputsArr(): (HTMLInputElement | HTMLSelectElement)[] {
    const inputsArr = [];
    const inputStreet = this.streetInput.getChildren()[1] as HTMLInputElement;
    const inputCity = this.cityInput.getChildren()[1] as HTMLInputElement;
    const inputCountry = this.countryInput.getChildren()[1] as HTMLSelectElement;
    const inputPostcode = this.postcodeInput.getChildren()[1] as HTMLInputElement;
    inputsArr.push(inputStreet);
    inputsArr.push(inputCity);
    inputsArr.push(inputCountry);
    inputsArr.push(inputPostcode);
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

  private submitForm(formEl: HTMLFormElement, adrsFormEl: ElementCreator, popUpBackEl: ElementCreator): void {
    formEl.addEventListener('submit', (el) => {
      el.preventDefault();
      this.toggleAppearClasses(adrsFormEl.getElement(), popUpBackEl.getElement());
      if (formEl.checkValidity() && this.checkInputsValidity()) {
        this.addAddress(
          this.getInputsArr()[0] as HTMLInputElement,
          this.getInputsArr()[1] as HTMLInputElement,
          this.getInputsArr()[2] as HTMLSelectElement,
          this.getInputsArr()[3] as HTMLInputElement
        );
      }
    });
  }

  private createSaveBtn(): ElementCreator {
    const btn = new ElementCreator(BillAdrsParams.buttonSave);
    btn.setAttribute('type', BillAdrsParams.buttonSave.type);
    return btn;
  }
}
