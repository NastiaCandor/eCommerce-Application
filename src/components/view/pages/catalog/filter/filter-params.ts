const filterParams = {
  wrapper: {
    tag: 'div',
    cssClasses: ['filter__wrapper'],
  },
  wrapperHeading: {
    tag: 'h3',
    cssClasses: ['heading'],
    textContent: 'Filter by',
  },
  rangeHeading: {
    tag: 'h4',
    cssClasses: ['heading'],
    textContent: 'Price',
  },
  filterBox: {
    tag: 'div',
    cssClasses: ['filter-box'],
  },
  filterBoxPrice: {
    tag: 'div',
    cssClasses: ['filter-box', 'price-box'],
  },
  filterBoxContent: {
    tag: 'div',
    cssClasses: ['filter-box__content'],
  },
  filterBoxList: {
    tag: 'ul',
    cssClasses: ['filter-box__content__items'],
  },
  filterBoxItem: {
    tag: 'li',
    cssClasses: ['filter-box__content_item'],
  },
  filterBoxText: {
    tag: 'span',
    cssClasses: ['filter-box__span'],
  },
  filterBoxHeading: {
    tag: 'h4',
    cssClasses: ['filter-box_heading'],
  },
  submitResetBtnWrapper: {
    tag: 'div',
    cssClasses: ['filter-box__buttons'],
  },
  submitBtn: {
    tag: 'button',
    cssClasses: ['filter-box__button-submit', 'button'],
    textContent: 'Submit',
  },
  resetBtn: {
    tag: 'button',
    cssClasses: ['filter-box__buttons-reset', 'button'],
    textContent: 'Reset',
  },
  filterBoxWrapper: {
    tag: 'div',
    cssClasses: ['filter-box__content_wrapper'],
  },
  filterCheckbox: {
    tag: 'input',
    type: 'checkbox',
  },
  filterRangeInput: {
    tag: 'div',
  },
  filterLabel: {
    tag: 'label',
    type: 'range',
    cssClasses: ['filter-box__content_label'],
  },
  priceBox: {
    tag: 'span',
    cssClasses: ['price-box'],
  },
};

const filterByText = ['Genres', 'Rarity', 'Price', 'Year'];
export { filterParams, filterByText };