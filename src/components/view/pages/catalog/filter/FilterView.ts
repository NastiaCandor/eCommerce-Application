/* eslint-disable prettier/prettier */
import * as noUiSlider from 'nouislider';
import { PipsMode } from 'nouislider';
import wnumb from 'wnumb';
import 'nouislider/dist/nouislider.css';
import { EndPointsObject, PrefetchedData, QueryObject } from '../../../../../types';
import ClientAPI from '../../../../utils/Client';
import ElementCreator from '../../../../utils/ElementCreator';
import View from '../../../View';
import { filterParams } from './filter-params';
import '../../../../../assets/img/arrow-svgrepo-com.svg';

export default class FilterView extends View {
  private prefetchedData: PrefetchedData;

  private labelBoxes: HTMLElement[];

  private endPoints: EndPointsObject;

  private queryObject: QueryObject;

  constructor(private clientApi: ClientAPI) {
    super(filterParams.wrapper);
    this.clientApi = clientApi;
    this.prefetchedData = this.clientApi.getPrefetchedData;
    this.labelBoxes = [];
    this.queryObject = <QueryObject>{};
    this.endPoints = <EndPointsObject>{};
  }

  public render() {
    this.configure();
    return this.getElement();
  }

  protected async configure() {
    this.renderWrapper();
  }

  private renderWrapper() {
    this.addInnerElement(new ElementCreator(filterParams.wrapperHeading));
    const rangeInput = this.createPriceRangeBox();
    const [condition, label, lp] = Object.keys(this.prefetchedData.attributes).map((item) => this.capitalizeStr(item));
    this.addInnerElement(this.createFilterBox(condition, this.prefetchedData.attributes.condition));
    this.addInnerElement(this.createFilterBox(label, this.prefetchedData.attributes.label));
    this.addInnerElement(this.createFilterBox(lp, this.prefetchedData.attributes.lp));
    this.addInnerElement(rangeInput);
    this.addInnerElement(this.createOrderBox());
  }

  private createOrderBox() {
    const filterBox = new ElementCreator(filterParams.filterBox);
    filterBox.setCssClasses(['price-box']);
    const orderHeading = new ElementCreator(filterParams.orderHeading);
    filterBox.addInnerElement(orderHeading);

    const priceLabel = new ElementCreator(filterParams.filterLabel);
    const nameLabel = new ElementCreator(filterParams.filterLabel);

    priceLabel.setAttribute('for', 'order-price');
    nameLabel.setAttribute('for', 'order-name');
    const priceCheckbox = new ElementCreator(filterParams.orderCheckbox);
    const nameCheckbox = new ElementCreator(filterParams.orderCheckbox);

    const priceImg = new ElementCreator(filterParams.boxImage);
    priceImg.setImageLink('../assets/img/arrow-svgrepo-com.svg', 'price-sort');
    const nameImg = new ElementCreator(filterParams.boxImage);
    nameImg.setImageLink('../assets/img/arrow-svgrepo-com.svg', 'name-sort');

    priceCheckbox.setAttribute('type', 'checkbox');
    priceCheckbox.setAttribute('id', 'order-price');
    priceCheckbox.setAttribute('data-sortprice', 'desc');

    nameCheckbox.setAttribute('type', 'checkbox');
    nameCheckbox.setAttribute('id', 'order-name');
    nameCheckbox.setAttribute('data-sortname', 'desc');

    const priceText = new ElementCreator(filterParams.filterBoxText);
    const nameText = new ElementCreator(filterParams.filterBoxText);
    priceText.setTextContent('Price');
    nameText.setTextContent('Name');
    this.checkboxHandler(<HTMLInputElement>priceCheckbox.getElement());
    this.checkboxHandler(<HTMLInputElement>nameCheckbox.getElement());
    priceLabel.addInnerElement([priceText, priceCheckbox, priceImg]);
    this.labelBoxes.push(<HTMLInputElement>priceLabel.getElement());
    nameLabel.addInnerElement([nameText, nameCheckbox, nameImg]);
    this.labelBoxes.push(<HTMLInputElement>nameLabel.getElement());
    filterBox.addInnerElement([priceLabel, nameLabel]);
    return filterBox;
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
    noUiSlider
      .create(rangeBox, {
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
      })
      .on('change.one', (evt) => this.priceRangeHandler(evt));

    filterBox.addInnerElement(rangeBox);
    return filterBox.getElement();
  }

  private priceRangeHandler(evt: (string | number)[]) {
    const [min, max] = evt;
    const leftValue = (Number(min) * 100).toFixed(2).toString();
    const rightValue = (Number(max) * 100).toFixed(2).toString();
    this.queryObject.price = [];
    this.addWriteToQueryObject('price', leftValue);
    this.addWriteToQueryObject('price', rightValue);
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
      label.addInnerElement(checkbox);
      label.addInnerElement(labelText);
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
    this.resetEndpoints();
    this.queryObject = <QueryObject>{
      price: [this.prefetchedData.prices.minFractured.toString(), this.prefetchedData.prices.maxFractured.toString()],
    };
  }

  public resetEndpoints() {
    this.endPoints = <EndPointsObject>{
      filter: [],
      sort: [],
    };
  }

  public createQuaryString() {
    const valuePairs = Object.entries(this.queryObject);
    if (!this.endPoints.filter) {
      this.endPoints.filter = [];
    }
    if (!this.endPoints.sort) {
      this.endPoints.sort = [];
    }
    valuePairs.forEach(([key, values]) => {
      if (key === 'LP') {
        const lpValues = values.map((value) => `"${value}"`).join(',');
        this.endPoints.filter.push(`variants.attributes.${key}.key:${lpValues}`);
      } else if (key === 'price') {
        const [minPrice, maxPrice] = values;
        this.endPoints.filter.push(`variants.scopedPrice.currentValue.centAmount:range(${minPrice} to ${maxPrice})`);
      } else if (key === 'sortprice') {
        const string = `variants.scopedPrice.currentValue.centAmount ${values[0]}`;
        this.endPoints.sort.push(string);
      } else if (key === 'sortname') {
        const string = `name.en-US ${values[0]}`;
        this.endPoints.sort.push(string);
      } else {
        const valueStrings = values.map((value) => `"${value}"`).join(',');
        this.endPoints.filter.push(`variants.attributes.${key}:${valueStrings}`);
      }
    });
  }

  private formatKey(key: string): string {
    return key.length < 3 ? key.toUpperCase() : key;
  }

  private addWriteToQueryObject(key: string, value: string): void {
    const formatKey = this.formatKey(key);
    if (!this.queryObject[formatKey] && value) {
      Object.defineProperty(this.queryObject, formatKey, {
        enumerable: true,
        writable: true,
        configurable: true,
        value: [value],
      });
    } else {
      this.queryObject[formatKey].push(value);
    }
  }

  private removeWriteFromqueryObject(key: string, value: string): void {
    const formatKey = this.formatKey(key);
    if (this.queryObject[formatKey].some((item) => item === value)) {
      this.queryObject[formatKey] = this.queryObject[formatKey].filter((item) => item !== value);
      if (this.queryObject[formatKey].length === 0) {
        delete this.queryObject[formatKey];
      }
    }
  }

  private checkboxHandler(element: HTMLInputElement): void {
    const datasetTitles = ['condition', 'lp', 'label', 'sortprice', 'sortname'];
    element.addEventListener('change', (evt) => {
      const { target } = evt;
      if (target instanceof HTMLInputElement) {
        const datasetId = datasetTitles.find((item) => target.dataset[item]);
        if (target.checked) {
          target.parentElement?.classList.add('active');
          if (datasetId && typeof datasetId === 'string') {
            this.addWriteToQueryObject(datasetId, <string>target.dataset[datasetId]);
          }
        } else {
          target.parentElement?.classList.remove('active');
          if (datasetId) {
            this.removeWriteFromqueryObject(datasetId, <string>target.dataset[datasetId]);
          }
        }
      }
    });
  }

  public async getFilterData() {
    this.createQuaryString();
    try {
      const data = await this.clientApi.fetchFilterQuary(this.endPoints);
      if (data) {
        return data;
      }
    } catch (e) {
      console.error(`Can't load filter data: ${e}`);
    }
  }
}
