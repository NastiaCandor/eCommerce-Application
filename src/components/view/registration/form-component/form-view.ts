import ElementCreator from '../../../utils/element-creator';
import View from '../../view';
import formParams from './form-params';

export default class FormView extends View {
  constructor() {
    super(formParams.form);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.insertFormItems();
    this.setAttribute('novalidate', 'true');
    // this.validateEmail();
  }

  private insertFormItems(): void {
    // const inputsArray = this.createInputItems(formParams.labelNames);
    // this.addInnerElement(inputsArray);
    const submitBtn = this.createSubmitBtn();
    this.addInnerElement(submitBtn);
  }

  // private createInputItems(items: string[]): ElementCreator[] {
  //   const inputsArray: ElementCreator[] = [];
  //   items.forEach((item, i) => {
  //     const label = new ElementCreator(formParams.label);
  //     const input = new ElementCreator(formParams.input);
  //     label.setTextContent(item);
  //     label.addInnerElement(input);
  //     input.setType(formParams.inputTypes[i]);
  //     // input.setPatternAttr(formParams.input.pattern);
  //     input.setRequiredAttr(formParams.input.required); // ??????????
  //     inputsArray.push(label);
  //   });
  //   return inputsArray;
  // }

  // private validateEmail() {
  //   const emailLabel = this.createInputItems(formParams.labelNames)[0];
  //   const emailInput = emailLabel.getElement().firstElementChild as HTMLInputElement;
  //   // emailInput.addEventListener('input', () => {
  //   //   if (emailInput.validity)
  //   // })
  //   console.log(emailInput);
  // }

  private createSubmitBtn(): ElementCreator {
    const btn = new ElementCreator(formParams.button);
    btn.setType(formParams.button.type);
    btn.setTextContent(formParams.button.textContent);
    return btn;
  }
}
