import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import aboutParams from './main-content-params';

export default class MainContentView extends View {
  constructor() {
    super(aboutParams.section);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    this.addInnerElement(new ElementCreator(aboutParams.wrapper));
  }
}
