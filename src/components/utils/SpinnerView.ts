import View from '../view/View';
import ElementCreator from './ElementCreator';

import spinnerParams from './spinnerParams';

export default class SpinnerView extends View {
  constructor() {
    super(spinnerParams.wrapper);
    this.configure();
  }

  protected configure(): void {
    this.addInnerElement(new ElementCreator(spinnerParams.element));
  }

  public render(node?: Node): HTMLElement | void {
    if (node) node.appendChild(this.getElement());
    return this.getElement();
  }

  public removeSelfFromNode(): void {
    if (this.getElement().parentNode) {
      this.getElement().parentNode?.removeChild(this.getElement());
    }
  }
}
