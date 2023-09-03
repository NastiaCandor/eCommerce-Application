/* eslint-disable no-useless-escape */
/* eslint-disable prefer-template */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-param-reassign */
import { postcodeValidator } from 'postcode-validator';
import Noty from 'noty';
import View from '../../View';
import ClientAPI from '../../../utils/Client';
import AddressItemParams from './address-item-params';
import ElementCreator from '../../../utils/ElementCreator';
import ProfileCityView from '../profile-inputs/profileCityView';
import ProfileCountryView from '../profile-inputs/profileCountryView';
import ProfileStreetView from '../profile-inputs/profileStreetView';
import ProfilePostcodeView from '../profile-inputs/profilePostcodeView';
import PostcodeInputParams from '../../registration/form-component/input-component/address/postcode-fieldset-view/postcode-params';
import '../../../../assets/img/location-pin.svg';
import '../../../../assets/img/delete.svg';

export default class BillAddressItemView extends View {
  private clientAPI: ClientAPI;

  private currentVersion: number;

  private cityInput: ProfileCityView;

  private streetInput: ProfileStreetView;

  private countryInput: ProfileCountryView;

  private postcodeInput: ProfilePostcodeView;

  private currentAdrsID: string;

  constructor() {
    super(AddressItemParams.wrapper);
    this.streetInput = new ProfileStreetView();
    this.cityInput = new ProfileCityView();
    this.countryInput = new ProfileCountryView();
    this.postcodeInput = new ProfilePostcodeView();
    this.render();
    this.clientAPI = new ClientAPI();
    this.currentVersion = 0;
    this.currentAdrsID = '';
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.checkPostcodeEvents();
  }

  public async renderInnerWrapper(
    street: string,
    city: string,
    country: string,
    postcode: string,
    currAdrs: string,
    defaultStatus: string
  ) {
    this.setAttribute('default', defaultStatus);
    const addressInnerWrapper = new ElementCreator(AddressItemParams.addressInnerWrapper);
    this.addInnerElement(addressInnerWrapper);

    const leftPartWrapper = new ElementCreator(AddressItemParams.leftInnerWrapper);
    addressInnerWrapper.addInnerElement(leftPartWrapper);

    const spansImgWrapper = new ElementCreator(AddressItemParams.spansImgWrapper);
    leftPartWrapper.addInnerElement(spansImgWrapper);

    const defaultAdrsBtn = new ElementCreator(AddressItemParams.defaultAdrsBtn);
    leftPartWrapper.addInnerElement(defaultAdrsBtn);
    defaultAdrsBtn.setAttribute('type', AddressItemParams.defaultAdrsBtn.type);
    defaultAdrsBtn.setAttribute('addressId', currAdrs);
    if (defaultStatus === 'true') {
      defaultAdrsBtn.setTextContent('✓ Default');
      defaultAdrsBtn.setAttribute('disabled', 'true');
    } else defaultAdrsBtn.setTextContent('Set as Default');
    defaultAdrsBtn.getElement().addEventListener('click', () => {
      this.currentAdrsID = defaultAdrsBtn.getElement().getAttribute('addressId') as string;
      this.setDefaultAdrs();
    });

    const locationSVG = new ElementCreator(AddressItemParams.adrsLocationImg);
    spansImgWrapper.addInnerElement(locationSVG);

    const streetSpan = new ElementCreator(AddressItemParams.addressSpanStreet);
    spansImgWrapper.addInnerElement(streetSpan);
    streetSpan.setTextContent(`${street}, `);

    const citySpan = new ElementCreator(AddressItemParams.addressSpanCity);
    spansImgWrapper.addInnerElement(citySpan);
    citySpan.setTextContent(`${city}, `);

    const countrySpan = new ElementCreator(AddressItemParams.addressSpanCountry);
    spansImgWrapper.addInnerElement(countrySpan);
    countrySpan.setTextContent(`${country} `);

    const postcodeSpan = new ElementCreator(AddressItemParams.addressSpanPostcode);
    spansImgWrapper.addInnerElement(postcodeSpan);
    postcodeSpan.setTextContent(postcode);

    const buttonsWrapper = new ElementCreator(AddressItemParams.rightInnerWrapper);
    addressInnerWrapper.addInnerElement(buttonsWrapper);

    const editBtn = this.createEditBtn();
    buttonsWrapper.addInnerElement(editBtn);
    editBtn.setAttribute('addressId', currAdrs);

    const adrsForm = this.createForm();
    const saveBtn = this.createSaveBtn();

    editBtn.getElement().addEventListener('click', async () => {
      this.currentVersion = await this.getCustomerVersion();
      this.currentAdrsID = editBtn.getElement().getAttribute('addressId') as string;
      editBtn.setAttribute('disabled', 'true');
      adrsForm.addInnerElement(saveBtn);
      this.addInnerElement(adrsForm);
      saveBtn.getElement().removeAttribute('disabled');
      this.setInputValue(this.getInputsArr()[0] as HTMLInputElement, streetSpan.getElement());
      this.setInputValue(this.getInputsArr()[1] as HTMLInputElement, citySpan.getElement());
      this.setInputValue(this.getInputsArr()[2] as HTMLSelectElement, countrySpan.getElement());
      this.setInputValue(this.getInputsArr()[3] as HTMLInputElement, postcodeSpan.getElement());
    });

    const deleteBtn = this.createDeleteBtn();
    buttonsWrapper.addInnerElement(deleteBtn);
    deleteBtn.setAttribute('addressId', currAdrs);

    deleteBtn.getElement().addEventListener('click', async () => {
      this.currentAdrsID = deleteBtn.getElement().getAttribute('addressId') as string;
      this.currentVersion = await this.getCustomerVersion();
      this.deleteAdrs();
    });
    const formElement = adrsForm.getElement() as HTMLFormElement;
    this.submitForm(formElement, saveBtn.getElement(), editBtn.getElement());
  }

  private async deleteAdrs() {
    try {
      const deleteAdrsAPI = await this.clientAPI.deleteCustomerAddress(
        this.getCustomerIDCookie() as string,
        this.currentVersion,
        this.currentAdrsID
      );
      if (deleteAdrsAPI.statusCode === 200) {
        this.showDeleteAdrsMessage();
        this.getElement().remove();
      }
    } catch (error) {
      this.showUpdateErrorMessage();
    }
  }

  private async setDefaultAdrs() {
    this.currentVersion = await this.getCustomerVersion();
    try {
      const deleteAdrsAPI = await this.clientAPI.setDefaultBillingAddress(
        this.getCustomerIDCookie() as string,
        this.currentVersion,
        this.currentAdrsID
      );
      if (deleteAdrsAPI.statusCode === 200) {
        this.showSetDefaultAdrsMessage();
        window.location.reload();
      }
    } catch (error) {
      this.showUpdateErrorMessage();
    }
  }

  private createEditBtn(): ElementCreator {
    const editBtn = new ElementCreator(AddressItemParams.buttonEdit);
    editBtn.setAttribute('type', AddressItemParams.buttonEdit.type);
    const btnImage = new ElementCreator(AddressItemParams.buttonEditImg);
    btnImage.setAttribute('src', AddressItemParams.buttonEditImg.src);
    btnImage.setAttribute('alt', AddressItemParams.buttonEditImg.alt);
    editBtn.addInnerElement(btnImage);
    return editBtn;
  }

  private createDeleteBtn(): ElementCreator {
    const editBtn = new ElementCreator(AddressItemParams.buttonDelete);
    editBtn.setAttribute('type', AddressItemParams.buttonDelete.type);
    const btnImage = new ElementCreator(AddressItemParams.buttonDeleteImg);
    btnImage.setAttribute('src', AddressItemParams.buttonDeleteImg.src);
    btnImage.setAttribute('alt', AddressItemParams.buttonDeleteImg.alt);
    editBtn.addInnerElement(btnImage);
    return editBtn;
  }

  private createForm() {
    const addressForm = new ElementCreator(AddressItemParams.form);
    addressForm.addInnerElement(this.streetInput);
    addressForm.addInnerElement(this.cityInput);
    addressForm.addInnerElement(this.countryInput);
    addressForm.addInnerElement(this.postcodeInput);
    return addressForm;
  }

  private createSaveBtn(): ElementCreator {
    const btn = new ElementCreator(AddressItemParams.buttonSave);
    btn.setAttribute('type', AddressItemParams.buttonSave.type);
    btn.setAttribute('disabled', 'true');
    btn.setTextContent(AddressItemParams.buttonSave.textContent);
    return btn;
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

  private setInputValue(input: HTMLInputElement | HTMLSelectElement, span: HTMLElement) {
    let text = span.textContent?.trimEnd() as string;
    if (text.at(-1) === ',') {
      text = text.slice(0, -1);
    }
    input.value = text;
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
    // this.checkPostcode(postcode, country, errorPostcode);
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

  private submitForm(formEl: HTMLFormElement, saveBtnEl: HTMLElement, editBtnEl: HTMLElement): void {
    formEl.addEventListener('submit', (el) => {
      el.preventDefault();
      saveBtnEl.setAttribute('disabled', 'true');
      editBtnEl.removeAttribute('disabled');
      if (formEl.checkValidity() && this.checkInputsValidity()) {
        this.sendUpdatedCustomer(
          this.getInputsArr()[0] as HTMLInputElement,
          this.getInputsArr()[1] as HTMLInputElement,
          this.getInputsArr()[2] as HTMLSelectElement,
          this.getInputsArr()[3] as HTMLInputElement
        );
      }
      this.getElement().replaceChildren();
    });
  }

  private async sendUpdatedCustomer(
    streetInput: HTMLInputElement,
    cityInput: HTMLInputElement,
    countryInput: HTMLSelectElement,
    postalCode: HTMLInputElement
  ) {
    try {
      const sendCustomerAPI = await this.clientAPI.updateCustomerAddress(
        this.getCustomerIDCookie() as string,
        this.currentVersion,
        this.currentAdrsID,
        streetInput.value,
        cityInput.value,
        countryInput.value,
        postalCode.value
      );
      if (sendCustomerAPI.statusCode === 200) {
        console.log(sendCustomerAPI.body);
        const status = this.getElement();
        console.log(status);
        this.renderInnerWrapper(
          streetInput.value,
          cityInput.value,
          countryInput.value,
          postalCode.value,
          this.currentAdrsID,
          this.getElement().getAttribute('default') as string
        );
        this.showUpdateMessage();
      }
    } catch (error) {
      this.showUpdateErrorMessage();
    }
  }

  private showUpdateMessage(): void {
    new Noty({
      theme: 'mint',
      text: AddressItemParams.updateAdrsMessage,
      timeout: 3000,
      progressBar: true,
      type: 'success',
    }).show();
  }

  private showDeleteAdrsMessage(): void {
    new Noty({
      theme: 'mint',
      text: AddressItemParams.deleteAdrsMessage,
      timeout: 3000,
      progressBar: true,
      type: 'success',
    }).show();
  }

  private showSetDefaultAdrsMessage(): void {
    new Noty({
      theme: 'mint',
      text: AddressItemParams.setDefaultAdrsMessage,
      timeout: 3000,
      progressBar: true,
      type: 'success',
    }).show();
  }

  private showUpdateErrorMessage(): void {
    new Noty({
      theme: 'mint',
      text: AddressItemParams.updateErrorAdrsMessage,
      timeout: 3000,
      progressBar: true,
      type: 'error',
    }).show();
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
}
