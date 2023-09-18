import ClientAPI from '../../../../utils/Client';
import ElementCreator from '../../../../utils/ElementCreator';
import View from '../../../View';
import searchParams from './search-params';

export default class SearchView extends View {
  clientApi: ClientAPI;

  constructor(clientApi: ClientAPI) {
    super(searchParams.wrapper);
    this.clientApi = clientApi;
  }

  public render() {
    this.configure();
  }

  protected configure() {
    this.renderWrapper();
  }

  private renderWrapper(): void {
    const wrapper = new ElementCreator(searchParams.searchBlock);
    this.injectSearchComponents(wrapper);
    this.addInnerElement(wrapper);
  }

  private injectSearchComponents(wrapper: ElementCreator): void {
    const searchInput = new ElementCreator(searchParams.searchInput);
    searchInput.setAttribute('type', 'search');
    searchInput.setAttribute('placeholder', 'Search...');
    const searchBtn = new ElementCreator(searchParams.searchBtn);

    wrapper.addInnerElement([searchInput, searchBtn]);
  }
}
