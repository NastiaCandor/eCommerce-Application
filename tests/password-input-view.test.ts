import PasswordInputView from '../src/components/view/registration/form-component/input-component/password-fieldset-view/password-input-view';
import ElementCreator from '../src/components/utils/ElementCreator';

describe('PasswordClass', () => {
  let passwordInput = new PasswordInputView();

  beforeEach(() => {
    passwordInput = new PasswordInputView();
  });

  it('PasswordInputView should be an ElementCreator instance', () => {
    expect(passwordInput).toBeInstanceOf(ElementCreator);
  });

  it('should validate password correctly, password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number', () => {
    expect(passwordInput.checkPassword('12345678')).toBeFalsy();
    expect(passwordInput.checkPassword('12345678V')).toBeFalsy();
    expect(passwordInput.checkPassword('12345678Vv')).toBeTruthy();
  });
});
