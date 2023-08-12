import ElementCreator from '../../../../utils/element-creator';
import View from '../../../view';
import fieldsetParams from './input-params';

export default class InputView extends View {
  constructor() {
    super(fieldsetParams.fieldset);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.insertFieldsetItems();
    // this.setAttribute('novalidate', 'true');
  }

  public insertFieldsetItems(): void {
    const input = this.createInput();
    this.addInnerElement(input);
    const label = this.createLabel();
    this.addInnerElement(label);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
  }

  private createInput(): ElementCreator {
    const input = new ElementCreator(fieldsetParams.input);
    // input.setAttribute('type', type);
    input.setRequiredAttr(fieldsetParams.input.required);
    return input;
  }

  private createLabel(): ElementCreator {
    const label = new ElementCreator(fieldsetParams.label);
    return label;
  }

  private createErrorText(): ElementCreator {
    const label = new ElementCreator(fieldsetParams.label);
    return label;
  }
}
