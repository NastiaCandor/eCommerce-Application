/* eslint-disable prettier/prettier */
import * as noUiSlider from 'nouislider';
import { PipsMode } from 'nouislider';
import wnumb from 'wnumb';
import 'nouislider/dist/nouislider.css';
import { PrefetchedData, QuaryObject } from '../../../../../types';
import ClientAPI from '../../../../utils/Client';
import ElementCreator from '../../../../utils/ElementCreator';
import View from '../../../View';
import { filterParams } from './filter-params';

export default class FilterView extends View {
  private prefetchedData: PrefetchedData;

  private labelBoxes: HTMLElement[];

  private quaryStrings: string[];

  private quaryObject: QuaryObject;

  constructor(private clientApi: ClientAPI) {
    super(filterParams.wrapper);
    this.clientApi = clientApi;
    this.prefetchedData = this.clientApi.getPrefetchedData;
    this.labelBoxes = [];
    this.quaryObject = <QuaryObject>{};
    this.quaryStrings = [];
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
    const rangeInput = this.createPriceRangeBox();
    const [condition, label, lp] = Object.keys(this.prefetchedData.attributes).map((item) => this.capitalizeStr(item));
    this.addInnerElement(this.createFilterBox(condition, this.prefetchedData.attributes.condition));
    this.addInnerElement(this.createFilterBox(label, this.prefetchedData.attributes.label));
    this.addInnerElement(this.createFilterBox(lp, this.prefetchedData.attributes.lp));
    this.addInnerElement(rangeInput);
  }

  private capitalizeStr(str: string): string {
    if (str.length <= 3) {
      return str.toUpperCase();
    }
    return str.slice(0, 1).toUpperCase().concat(str.slice(1));
  }

  private formatPrice(cents: number) {
    return +(cents / 100).toFixed(2);
  }

  private createPriceRangeBox() {
    const filterBox = new ElementCreator(filterParams.filterBoxPrice);
    const rangeBox = new ElementCreator(filterParams.filterRangeInput).getElement();
    const heading = new ElementCreator(filterParams.rangeHeading);
    filterBox.addInnerElement(heading);
    noUiSlider.create(rangeBox, {
      start: [
        this.formatPrice(this.prefetchedData.prices.minFractured),
        this.formatPrice(this.prefetchedData.prices.maxFractured),
      ],
      range: {
        min: this.formatPrice(this.prefetchedData.prices.min),
        max: this.formatPrice(this.prefetchedData.prices.max),
      },
      tooltips: [wnumb({ decimals: 2, prefix: '$' }), true],
      pips: {
        mode: PipsMode.Steps,
        density: 10,
        format: wnumb({
          decimals: 2,
          prefix: '$',
        }),
      },
    });

    filterBox.addInnerElement(rangeBox);
    return filterBox.getElement();
  }

  private createFilterBox(filterHeading: string, filterItems: string[]) {
    const filterBox = new ElementCreator(filterParams.filterBox);
    const labelHeading = new ElementCreator(filterParams.filterBoxHeading);
    labelHeading.setTextContent(filterHeading);
    filterBox.addInnerElement(labelHeading);
    const list = new ElementCreator(filterParams.filterBoxList);
    filterItems.forEach((item, i) => {
      const listItem = new ElementCreator(filterParams.filterBoxItem);
      const label = new ElementCreator(filterParams.filterLabel);
      const checkbox = new ElementCreator(filterParams.filterCheckbox);
      const labelText = new ElementCreator(filterParams.filterBoxText);
      checkbox.setAttribute('type', filterParams.filterCheckbox.type);
      label.setAttribute('for', `${filterHeading.toLowerCase()}-${i}`);
      checkbox.setAttribute('id', `${filterHeading.toLowerCase()}-${i}`);
      checkbox.setAttribute(`data-${filterHeading}`, item);
      labelText.setTextContent(item);
      label.addInnerElement(labelText);
      label.addInnerElement(checkbox);
      listItem.addInnerElement(label);
      const listItemElement = <HTMLInputElement>listItem.getElement();
      this.checkboxHandler(listItemElement);
      this.labelBoxes.push(<HTMLInputElement>label.getElement());
      list.addInnerElement(listItem);
    });
    filterBox.addInnerElement(list);
    return filterBox.getElement();
  }

  public resetInputs() {
    this.labelBoxes.forEach((item) => {
      const checkbox = item.querySelector('input');
      if (item.classList.contains('active')) item.classList.remove('active');
      if (checkbox && checkbox instanceof HTMLInputElement) checkbox.checked = false;
    });
    this.quaryObject = <QuaryObject>{};
    this.resetQuary();
  }

  public resetQuary() {
    this.quaryStrings = [];
  }

  public createQuaryString() {
    const valuePairs = Object.entries(this.quaryObject);
    const strArr = valuePairs.map(([key, values]) => {
      const valueStrings = values.map((value) => `value="${value}"`).join(' or ');
      if (key === 'LP') {
        const lpValues = values.map((value) => `name="${value}"`).join(' or ');
        console.log(lpValues);
        return `masterVariant(attributes(name="${key}" and (${lpValues})))`;
      }
      return `masterVariant(attributes(name="${key}" and (${valueStrings})))`;
    });
    this.quaryStrings = strArr;
    console.log(this.quaryStrings);
  }

  private formatKey(key: string): string {
    return key.length < 3 ? key.toUpperCase() : key;
  }

  private addWriteToQuaryObject(key: string, value: string): void {
    const formatKey = this.formatKey(key);
    if (!this.quaryObject[formatKey] && value) {
      Object.defineProperty(this.quaryObject, formatKey, {
        enumerable: true,
        writable: true,
        configurable: true,
        value: [value],
      });
    } else {
      this.quaryObject[formatKey].push(value);
    }
  }

  private removeWriteFromQuaryObject(key: string, value: string): void {
    const formatKey = this.formatKey(key);
    if (this.quaryObject[formatKey].some((item) => item === value)) {
      this.quaryObject[formatKey] = this.quaryObject[formatKey].filter((item) => item !== value);
      if (this.quaryObject[formatKey].length === 0) {
        delete this.quaryObject[formatKey];
      }
    }
    console.log(this.quaryObject);
  }

  private checkboxHandler(element: HTMLInputElement): void {
    const datasetTitles = ['condition', 'lp', 'label'];
    element.addEventListener('change', (evt) => {
      const { target } = evt;
      if (target instanceof HTMLInputElement) {
        const datasetId = datasetTitles.find((item) => target.dataset[item]);
        if (target.checked) {
          target.parentElement?.classList.add('active');
          if (datasetId && typeof datasetId === 'string') {
            this.addWriteToQuaryObject(datasetId, <string>target.dataset[datasetId]);
          }
        } else {
          target.parentElement?.classList.remove('active');
          if (datasetId) {
            this.removeWriteFromQuaryObject(datasetId, <string>target.dataset[datasetId]);
          }
        }
      }
      this.createQuaryString();
    });
  }

  public async getFilterData() {
    const data = await this.clientApi.fetchFilterQuary(this.quaryStrings);
    if (data) {
      return data;
    }
  }
}
