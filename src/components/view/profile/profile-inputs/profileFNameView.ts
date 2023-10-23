import FirstNameInputView from '../../registration/form-component/input-component/name-views/firstName-fieldset-view/firstName-input-view';
import ElementCreator from '../../../utils/ElementCreator';
import nameInputParams from '../../registration/form-component/input-component/name-views/name-input-params';
import fieldsetParams from '../../registration/form-component/input-component/input-params';

export default class ProfileFNameView extends FirstNameInputView {
  protected createInput(type: string, id: string): HTMLInputElement {
    super.createInput(type, id);
    const input = new ElementCreator(fieldsetParams.input).getElement() as HTMLInputElement;
    input.setAttribute('disabled', 'true');
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('minLength', nameInputParams.input.minLength);
    input.setAttribute('required', fieldsetParams.input.required);
    input.setAttribute('pattern', nameInputParams.input.pattern);
    return input;
  }
}
