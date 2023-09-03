/* eslint-disable no-param-reassign */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-template */
import Noty from 'noty';
import View from '../../View';
import ClientAPI from '../../../utils/Client';
import PasswordChangeParams from './password-change-params';
import CurrentProfilePasswordView from '../profile-inputs/passwords-inputs/currProfilePasswordView';
import NewProfilePasswordView from '../profile-inputs/passwords-inputs/newProfilePasswordView';
import ConfirmProfilePasswordView from '../profile-inputs/passwords-inputs/confirmProfilePasswordView';
import ElementCreator from '../../../utils/ElementCreator';
import '../../../../assets/img/pencil.svg';

export default class ProfilePasswordFormView extends View {
  private currPasswordInput: CurrentProfilePasswordView;

  private newPasswordInput: NewProfilePasswordView;

  private confirmPasswordInput: ConfirmProfilePasswordView;

  private clientAPI: ClientAPI;

  private currentVersion: number;

  constructor() {
    super(PasswordChangeParams.form);
    this.currPasswordInput = new CurrentProfilePasswordView();
    this.newPasswordInput = new NewProfilePasswordView();
    this.confirmPasswordInput = new ConfirmProfilePasswordView();
    this.render();
    this.clientAPI = new ClientAPI();
    this.currentVersion = 0;
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
    this.getCustomer();
  }

  private async renderInnerWrapper() {
    const topPart = this.createTopPart();
    this.addInnerElement(topPart);

    const editBtn = this.createEditBtn().getElement();
    topPart.addInnerElement(editBtn);
    const { currPasswordInput } = this;
    this.addInnerElement(currPasswordInput);
    const { newPasswordInput } = this;
    this.addInnerElement(newPasswordInput);
    const { confirmPasswordInput } = this;
    this.addInnerElement(confirmPasswordInput);

    const saveBtn = this.createSaveBtn().getElement();
    this.addInnerElement(saveBtn);

    // editBtn.addEventListener('click', async () => {
    //   this.currentVersion = await this.getCustomerVersion();
    //   this.enableInputs(emailInput);
    //   saveBtn.removeAttribute('disabled');
    //   editBtn.setAttribute('disabled', 'true');
    // });

    this.submitForm();
  }

  private createTopPart(): ElementCreator {
    const headingWrapper = new ElementCreator(PasswordChangeParams.wrapperTop);
    const heading = new ElementCreator(PasswordChangeParams.heading);
    heading.setTextContent(PasswordChangeParams.heading.text);
    headingWrapper.addInnerElement(heading);
    return headingWrapper;
  }

  private createEditBtn(): ElementCreator {
    const editBtn = new ElementCreator(PasswordChangeParams.buttonEdit);
    editBtn.setAttribute('type', PasswordChangeParams.buttonEdit.type);
    const btnSpan = new ElementCreator(PasswordChangeParams.buttonEditSpan);
    editBtn.addInnerElement(btnSpan);
    const btnImage = new ElementCreator(PasswordChangeParams.buttonEditImg);
    btnImage.setAttribute('src', PasswordChangeParams.buttonEditImg.src);
    btnImage.setAttribute('alt', PasswordChangeParams.buttonEditImg.alt);
    editBtn.addInnerElement(btnImage);
    return editBtn;
  }

  private async getCustomer() {
    const customerID = (await this.getCustomerIDCookie()) as string;
    const getCustomerAPI = this.clientAPI.getCustomerByID(customerID);
    const customer = (await getCustomerAPI()).body;
    console.log(customer);

    return customer;
  }

  private async changePassword(currPassword: HTMLInputElement, newPassword: HTMLInputElement) {
    this.currentVersion = await this.getCustomerVersion();
    const changePasswordAPI = this.clientAPI.changePassword(
      this.getCustomerIDCookie() as string,
      this.currentVersion,
      currPassword.value,
      newPassword.value
    );
    changePasswordAPI()
      .then(async (data) => {
        if (data.statusCode === 200) {
          console.log(data.body);
          this.showUpdateMessage(PasswordChangeParams.updateSuccessMessage);
        } else if (data.statusCode === 400) {
          console.log(400);
          this.showUpdateErrorMessage(PasswordChangeParams.wrongCurrPasswordErrorMessage);
        }
      })
      .catch((error) => {
        if (error.message === 'The given current password does not match.') {
          this.showUpdateErrorMessage(PasswordChangeParams.wrongCurrPasswordErrorMessage);
        } else {
          console.log(error.status);
        }
      });
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

  private getInputsArr(): HTMLInputElement[] {
    const inputsArr = [];
    const inputCurrPassword = this.currPasswordInput.getChildren()[1] as HTMLInputElement;
    const inputNewPassword = this.newPasswordInput.getChildren()[1] as HTMLInputElement;
    const inputConfirmPassword = this.confirmPasswordInput.getChildren()[1] as HTMLInputElement;
    inputsArr.push(inputCurrPassword);
    inputsArr.push(inputNewPassword);
    inputsArr.push(inputConfirmPassword);
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

  private checkPasswordsMatch() {
    const arr = this.getInputsArr();
    const newPasswordInput = arr[1];
    const confirmPasswordInput = arr[2];
    console.log(newPasswordInput.value === confirmPasswordInput.value);
    return newPasswordInput.value === confirmPasswordInput.value;
  }

  private submitForm(): void {
    const formEl = this.getElement() as HTMLFormElement;
    formEl.addEventListener('submit', (el) => {
      el.preventDefault();
      if (!this.checkPasswordsMatch()) {
        this.showUpdateErrorMessage(PasswordChangeParams.noMatchErrorMessage);
        return;
      }
      // saveBtnEl.setAttribute('disabled', 'true');
      // editBtnEl.removeAttribute('disabled');
      if (formEl.checkValidity() && this.checkInputsValidity() && this.checkPasswordsMatch()) {
        this.changePassword(this.getInputsArr()[0], this.getInputsArr()[1]);
      }
    });
  }

  private createSaveBtn(): ElementCreator {
    const btn = new ElementCreator(PasswordChangeParams.buttonSave);
    btn.setAttribute('type', PasswordChangeParams.buttonSave.type);
    // btn.setAttribute('disabled', 'true');
    btn.setTextContent(PasswordChangeParams.buttonSave.textContent);
    return btn;
  }
}
// "statusCode": 400,
// "message": "The given current password does not match.",
// "errors": [
//     {
//         "code": "InvalidCurrentPassword",
//         "message": "The given current password does not match."
//     }
// ]
// }
