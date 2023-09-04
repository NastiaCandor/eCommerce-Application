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
  filterBoxContent: {
    tag: 'div',
    cssClasses: ['filter-box_content'],
  },
  filterBoxList: {
    tag: 'ul',
  },
  filterBoxItem: {
    tag: 'li',
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
  },
  priceBox: {
    tag: 'span',
    cssClasses: ['price-box'],
  },
};

const filterByText = ['Genres', 'Rarity', 'Price', 'Year'];
export { filterParams, filterByText };
