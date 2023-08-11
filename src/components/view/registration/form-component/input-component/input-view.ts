import ElementCreator from '../../../../utils/element-creator';
import View from '../../../view';
import inputParams from './input-params';

export default class InputView extends View {
  constructor() {
    super(inputParams.fieldset);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.insertFieldsetItems();
    // this.setAttribute('novalidate', 'true');
    // this.validateEmail();
  }

  private insertFieldsetItems(): void {
    const input = this.createInput();
    this.addInnerElement(input);
    const label = this.createLabel();
    this.addInnerElement(label);
    const errorSpan = this.createErrorText();
    this.addInnerElement(errorSpan);
  }

  private createInput(): ElementCreator {
    const input = new ElementCreator(inputParams.input);

    input.setRequiredAttr(inputParams.input.required);
    return input;
  }

  private createLabel(): ElementCreator {
    const label = new ElementCreator(inputParams.label);
    return label;
  }

  private createErrorText(): ElementCreator {
    const label = new ElementCreator(inputParams.label);
    return label;
  }

  // private validateEmail() {
  //   const emailLabel = this.createInputItems(formParams.labelNames)[0];
  //   const emailInput = emailLabel.getElement().firstElementChild as HTMLInputElement;
  //   // emailInput.addEventListener('input', () => {
  //   //   if (emailInput.validity)
  //   // })
  //   console.log(emailInput);
  // }

  // private createSubmitBtn(): ElementCreator {
  //   const btn = new ElementCreator(formParams.button);
  //   btn.setType(formParams.button.type);
  //   btn.setTextContent(formParams.button.textContent);
  //   return btn;
  // }
}
