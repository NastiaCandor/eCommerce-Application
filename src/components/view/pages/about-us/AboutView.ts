import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import aboutParams from './about-params';

export default class AboutView extends View {
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
