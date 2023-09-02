/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-template */
import Noty from 'noty';
import View from '../../View';
import ProfileEmailInputView from '../profileInputs/profileEmailView';
import ProfileLNameView from '../profileInputs/profileLNameView';
import ProfileDateView from '../profileInputs/profileDateView';
import ClientAPI from '../../../utils/Client';
import BasicInfoParams from './basic-info-params';
import ProfileFNameView from '../profileInputs/profileFNameView';
import ElementCreator from '../../../utils/ElementCreator';
import '../../../../assets/img/pencil.svg';

export default class BasicInfoView extends View {
  private emailInput: ProfileEmailInputView;

  private firstNameInput: ProfileFNameView;

  private lastNameInput: ProfileLNameView;

  private dateInput: ProfileDateView;

  private clientAPI: ClientAPI;

  private currentVersion: number;

  constructor() {
    super(BasicInfoParams.form);
    this.emailInput = new ProfileEmailInputView();
    this.firstNameInput = new ProfileFNameView();
    this.lastNameInput = new ProfileLNameView();
    this.dateInput = new ProfileDateView();
    this.render();
    this.clientAPI = new ClientAPI();
    this.currentVersion = 0;
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private async renderInnerWrapper() {
    const topPart = this.createTopPart();
    this.addInnerElement(topPart);
    const editBtn = this.createEditBtn().getElement();
    topPart.addInnerElement(editBtn);

    this.addInnerElement(this.emailInput);
    const emailInput = this.emailInput.getChildren()[1] as HTMLInputElement;
    this.setEmail(emailInput);

    this.addInnerElement(this.firstNameInput);
    const fNameInput = this.firstNameInput.getChildren()[1] as HTMLInputElement;
    this.setFName(fNameInput);

    this.addInnerElement(this.lastNameInput);
    const lNameInput = this.lastNameInput.getChildren()[1] as HTMLInputElement;
    this.setLName(lNameInput);

    this.addInnerElement(this.dateInput);
    const dateInput = this.dateInput.getChildren()[1] as HTMLInputElement;
    this.setDate(dateInput);

    const saveBtn = this.createSaveBtn().getElement();
    this.addInnerElement(saveBtn);

    editBtn.addEventListener('click', async () => {
      this.currentVersion = await this.getCustomerVersion();

      this.enableInputs(emailInput);
      this.enableInputs(fNameInput);
      this.enableInputs(lNameInput);
      this.enableInputs(dateInput);
      saveBtn.removeAttribute('disabled');
      editBtn.setAttribute('disabled', 'true');
    });

    this.submitForm(saveBtn, editBtn);
  }

  private async sendUpdatedCustomer(
    emailInput: HTMLInputElement,
    fNameInput: HTMLInputElement,
    lNameInput: HTMLInputElement,
    dateInput: HTMLInputElement
  ) {
    try {
      const sendCustomerAPI = await this.clientAPI.updateCustomerBasicInfo(
        this.currentVersion,
        this.getCustomerIDCookie() as string,
        emailInput.value,
        fNameInput.value,
        lNameInput.value,
        dateInput.value
      );
      if (sendCustomerAPI.statusCode === 200) {
        console.log(sendCustomerAPI.body);
        this.showUpdateMessage(BasicInfoParams.updateSuccessMessage);
      }
    } catch (error) {
      this.showUpdateErrorMessage(BasicInfoParams.errorMessage);
    }
  }

  private showUpdateMessage(message: string): void {
    new Noty({
      theme: 'mint',
      text: message,
      timeout: 3000,
      progressBar: true,
      type: 'success',
    }).show();
  }

  private showUpdateErrorMessage(message: string): void {
    new Noty({
      theme: 'mint',
      text: message,
      timeout: 3000,
      progressBar: true,
      type: 'error',
    }).show();
  }

  private enableInputs(el: HTMLInputElement) {
    el.removeAttribute('disabled');
  }

  private createTopPart(): ElementCreator {
    const headingWrapper = new ElementCreator(BasicInfoParams.wrapperTop);
    const heading = new ElementCreator(BasicInfoParams.heading);
    heading.setTextContent(BasicInfoParams.heading.text);
    headingWrapper.addInnerElement(heading);
    return headingWrapper;
  }

  private createEditBtn(): ElementCreator {
    const editBtn = new ElementCreator(BasicInfoParams.buttonEdit);
    editBtn.setAttribute('type', BasicInfoParams.buttonEdit.type);
    const btnSpan = new ElementCreator(BasicInfoParams.buttonEditSpan);
    editBtn.addInnerElement(btnSpan);
    const btnImage = new ElementCreator(BasicInfoParams.buttonEditImg);
    btnImage.setAttribute('src', BasicInfoParams.buttonEditImg.src);
    btnImage.setAttribute('alt', BasicInfoParams.buttonEditImg.alt);
    editBtn.addInnerElement(btnImage);
    return editBtn;
  }

  private async setEmail(el: HTMLInputElement) {
    this.getCustomer().then((data) => {
      const email = data.email as string;
      el.value = email;
    });
  }

  private async setFName(el: HTMLInputElement) {
    this.getCustomer().then((data) => {
      const firstName = data.firstName as string;
      el.value = firstName;
    });
  }

  private async setLName(el: HTMLInputElement) {
    this.getCustomer().then((data) => {
      const lastName = data.lastName as string;
      el.value = lastName;
    });
  }

  private async setDate(el: HTMLInputElement) {
    this.getCustomer().then((data) => {
      const dateOfBirth = data.dateOfBirth as string;
      el.value = dateOfBirth;
    });
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

  private getInputsArr(): HTMLInputElement[] {
    const inputsArr = [];
    const inputEmail = this.emailInput.getChildren()[1] as HTMLInputElement;
    const inputFirstName = this.firstNameInput.getChildren()[1] as HTMLInputElement;
    const inputLastName = this.lastNameInput.getChildren()[1] as HTMLInputElement;
    const inputDate = this.dateInput.getChildren()[1] as HTMLInputElement;
    inputsArr.push(inputEmail);
    inputsArr.push(inputFirstName);
    inputsArr.push(inputLastName);
    inputsArr.push(inputDate);
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

  private submitForm(saveBtnEl: HTMLElement, editBtnEl: HTMLElement): void {
    const formEl = this.getElement() as HTMLFormElement;
    formEl.addEventListener('submit', (el) => {
      el.preventDefault();
      saveBtnEl.setAttribute('disabled', 'true');
      editBtnEl.removeAttribute('disabled');
      if (formEl.checkValidity() && this.checkInputsValidity()) {
        this.sendUpdatedCustomer(
          this.getInputsArr()[0],
          this.getInputsArr()[1],
          this.getInputsArr()[2],
          this.getInputsArr()[3]
        );
      }
    });
  }

  private createSaveBtn(): ElementCreator {
    const btn = new ElementCreator(BasicInfoParams.buttonSave);
    btn.setAttribute('type', BasicInfoParams.buttonSave.type);
    btn.setAttribute('disabled', 'true');
    btn.setTextContent(BasicInfoParams.buttonSave.textContent);
    return btn;
  }
}
