/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable comma-dangle */
import PasswordInputView from '../../../registration/form-component/input-component/password-fieldset-view/password-input-view';
import PasswordChangeParams from '../../password-change-view/password-change-params';
import passwordInputParams from '../../../registration/form-component/input-component/password-fieldset-view/password-params';

export default class ConformProfilePasswordView extends PasswordInputView {
  public insertFieldsetItems(): void {
    const label = this.createLabel(
      PasswordChangeParams.label.confirmPassword.for,
      PasswordChangeParams.label.confirmPassword.textContent
    );
    this.addInnerElement(label);
    const input = this.createInput(passwordInputParams.input.type, PasswordChangeParams.input.confirmPassword.id);
    this.addInnerElement(input);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
    this.validatePassword(input, errorSpan);
    this.showError(input, errorSpan);
  }
}
