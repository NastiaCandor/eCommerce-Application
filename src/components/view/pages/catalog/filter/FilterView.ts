import * as noUiSlider from 'nouislider';
import { PipsMode } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import wnumb from 'wnumb';
import ClientAPI from '../../../../utils/Client';
import ElementCreator from '../../../../utils/ElementCreator';
import View from '../../../View';
import { filterParams } from './filter-params';

export default class FilterView extends View {
  clientApi: ClientAPI;

  constructor(clientApi: ClientAPI) {
    super(filterParams.wrapper);
    this.clientApi = clientApi;
    this.fetchMinMaxPrices();
  }

  public render() {
    this.configure();
    return this.getElement();
  }

  protected async configure() {
    await this.renderWrapper();
  }

  private async renderWrapper(): Promise<void> {
    this.addInnerElement(new ElementCreator(filterParams.wrapperHeading));
    const genres = await this.fetchAllGenres();
    const decades = await this.fetchAllDecades();
    const rangeInput = await this.createPriceRangeBox();
    this.addInnerElement(this.createFilterBox('Genres', genres));
    this.addInnerElement(this.createFilterBox('Decades', decades));
    this.addInnerElement(rangeInput);
  }

  private async fetchAllGenres() {
    const id = await this.clientApi.getCategoryId('genres');
    const data = await this.clientApi.getGenresById(id);
    if (data !== undefined) {
      return data.map((item) => item.name['en-US']);
    }
    return [];
  }

  private async fetchMinMaxPrices() {
    const CENTS_IN_DOLLAR = 100;
    const minPrice = await this.clientApi.getMinPrice();
    const maxPrice = await this.clientApi.getMaxPrice();
    if (minPrice && maxPrice) {
      return {
        minimal: minPrice / CENTS_IN_DOLLAR,
        maximum: maxPrice / CENTS_IN_DOLLAR,
        delta: (minPrice + maxPrice) / CENTS_IN_DOLLAR / 2,
      };
    }
  }

  private async fetchAllDecades() {
    const id = await this.clientApi.getCategoryId('decades');
    const data = await this.clientApi.getGenresById(id);
    if (data !== undefined) {
      return data.map((item) => item.name['en-US']);
    }
    return [];
  }

  private async createPriceRangeBox() {
    const filterBox = new ElementCreator(filterParams.filterBox);
    const rangeBox = new ElementCreator(filterParams.filterRangeInput).getElement();
    const label = new ElementCreator(filterParams.filterLabel);
    const heading = new ElementCreator(filterParams.rangeHeading);
    label.addInnerElement(heading);
    const minMaxPriceData = await this.fetchMinMaxPrices();
    if (minMaxPriceData) {
      noUiSlider.create(rangeBox, {
        start: [minMaxPriceData.maximum / 4, minMaxPriceData.maximum / 2],
        range: {
          min: minMaxPriceData.minimal,
          max: minMaxPriceData.maximum,
        },
        tooltips: [wnumb({ decimals: 2, prefix: '$' }), true],
        pips: {
          mode: PipsMode.Steps,
          density: 1,
          format: wnumb({
            decimals: 2,
            prefix: '$',
          }),
        },
      });
    }
    filterBox.addInnerElement([label, rangeBox]);
    return filterBox.getElement();
  }

  private createFilterBox(filterHeading: string, filterItems: string[]) {
    const filterBox = new ElementCreator(filterParams.filterBox);
    filterBox.setTextContent(filterHeading);
    const list = new ElementCreator(filterParams.filterBoxList);
    filterItems.forEach((item) => {
      const listItem = new ElementCreator(filterParams.filterBoxItem);
      const label = new ElementCreator(filterParams.filterLabel);
      const checkbox = new ElementCreator(filterParams.filterCheckbox);
      checkbox.setAttribute('type', filterParams.filterCheckbox.type);
      checkbox.setAttribute('name', item);
      label.setTextContent(item);
      label.addInnerElement(checkbox);
      listItem.addInnerElement(label);
      list.addInnerElement(listItem);
    });
    filterBox.addInnerElement(list);
    return filterBox.getElement();
  }
}
