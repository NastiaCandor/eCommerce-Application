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
    this.insertInputItems();
  }

  private insertInputItems(): void {
    const inputsArray = this.createInputItems(formParams.labelNames);
    this.addInnerElement(inputsArray);
    console.log('form1');
  }

  private createInputItems(items: string[]): ElementCreator[] {
    const inputsArray: ElementCreator[] = [];
    items.forEach((item) => {
      const label = new ElementCreator(formParams.label);
      const input = new ElementCreator(formParams.input);
      label.setTextContent(item);
      label.addInnerElement(input);
      inputsArray.push(label);
    });
    return inputsArray;
  }
}
