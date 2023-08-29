import ClientAPI from '../../../utils/Client';
import ElementCreator from '../../../utils/ElementCreator';
import View from '../../View';
import catalogParams from './catalog-params';
import FilterView from './filter/FilterView';

export default class CatalogView extends View {
  private clientApi: ClientAPI;

  private filterView: FilterView;

  constructor() {
    super(catalogParams.section);
    this.clientApi = new ClientAPI();
    this.filterView = new FilterView(this.clientApi);
    this.render();
  }

  public render(): void {
    this.configure();
  }

  protected configure(): void {
    this.renderInnerWrapper();
  }

  private renderInnerWrapper(): void {
    const wrapper = new ElementCreator(catalogParams.wrapper);
    const renderedFilter = this.filterView.render();
    wrapper.addInnerElement(renderedFilter);
    this.addInnerElement(wrapper);
  }
}
