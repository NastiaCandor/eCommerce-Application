/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/comma-dangle */
import PasswordInputView from '../../../registration/form-component/input-component/password-fieldset-view/password-input-view';
import PasswordChangeParams from '../../password-change-view/password-change-params';
import passwordInputParams from '../../../registration/form-component/input-component/password-fieldset-view/password-params';

export default class CurrentProfilePasswordView extends PasswordInputView {
  public insertFieldsetItems(): void {
    const label = this.createLabel(
      PasswordChangeParams.label.currPassword.for,
      PasswordChangeParams.label.currPassword.textContent
    );
    this.addInnerElement(label);
    const input = this.createInput(passwordInputParams.input.type, PasswordChangeParams.input.currPassword.id);
    this.addInnerElement(input);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
    this.validatePassword(input, errorSpan);
    this.showError(input, errorSpan);
  }
}
