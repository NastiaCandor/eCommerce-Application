import * as noUiSlider from 'nouislider';
import { PipsMode } from 'nouislider';
import wnumb from 'wnumb';
import 'nouislider/dist/nouislider.css';
import { PrefetchedData } from '../../../../../types';
import ClientAPI from '../../../../utils/Client';
import ElementCreator from '../../../../utils/ElementCreator';
import View from '../../../View';
import { filterParams } from './filter-params';

export default class FilterView extends View {
  private prefetchedData: PrefetchedData;

  private labelBoxes: HTMLElement[];

  constructor(private clientApi: ClientAPI) {
    super(filterParams.wrapper);
    this.clientApi = clientApi;
    this.prefetchedData = this.clientApi.getPrefetchedData;
    this.labelBoxes = [];
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
    this.addInnerElement(this.assambleBtnWrapper());
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
    filterItems.forEach((item) => {
      const listItem = new ElementCreator(filterParams.filterBoxItem);
      const label = new ElementCreator(filterParams.filterLabel);
      const checkbox = new ElementCreator(filterParams.filterCheckbox);
      const labelText = new ElementCreator(filterParams.filterBoxText);
      checkbox.setAttribute('type', filterParams.filterCheckbox.type);
      label.setAttribute('for', item);
      checkbox.setAttribute('name', item);
      checkbox.setAttribute('id', item);
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

  private assambleBtnWrapper() {
    const wrapper = new ElementCreator(filterParams.submitResetBtnWrapper);
    const submitBtn = this.createSubmitBtn();
    const resetBtn = this.createResetBtn();

    wrapper.addInnerElement([submitBtn, resetBtn]);
    return wrapper;
  }

  private createSubmitBtn() {
    const submitBtn = new ElementCreator(filterParams.submitBtn).getElement();
    return submitBtn;
  }

  private createResetBtn() {
    const resetBtn = new ElementCreator(filterParams.resetBtn).getElement();
    this.resetBtnHandler(resetBtn);
    return resetBtn;
  }

  private resetBtnHandler(element: HTMLElement) {
    element.addEventListener('click', () => {
      this.labelBoxes.forEach((item) => {
        const checkbox = item.querySelector('input');
        if (item.classList.contains('active')) item.classList.remove('active');
        if (checkbox && checkbox instanceof HTMLInputElement) checkbox.checked = false;
      });
    });
  }

  private checkboxHandler(element: HTMLInputElement): void {
    element.addEventListener('change', (evt) => {
      const { target } = evt;
      if (target instanceof HTMLInputElement) {
        if (target.checked) {
          target.parentElement?.classList.add('active');
        } else {
          target.parentElement?.classList.remove('active');
        }
      }
    });
  }
}
