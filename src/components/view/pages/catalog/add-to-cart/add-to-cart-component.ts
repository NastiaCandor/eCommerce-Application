const addToCartParams = {
  wrapper: {
    tag: 'div',
    cssClasses: ['add-to-cart__wrapper'],
  },
  addToCartBtn: {
    tag: 'button',
    cssClasses: ['product__add-to-cart-btn', 'add-to-cart__main-btn', 'button'],
    textContent: 'Add To Cart',
  },
  removeFromCartBtn: {
    tag: 'button',
    cssClasses: ['product__remove-from-cart-btn', 'button'],
    textContent: 'Remove from Cart',
  },
  plusItemBtn: {
    tag: 'button',
    cssClasses: ['add-to-cart__plus-btn', 'button'],
    textContent: '+',
  },
  minusItemBtn: {
    tag: 'button',
    cssClasses: ['add-to-cart__minus-btn', 'button'],
    textContent: '-',
  },
  itemsInCart: {
    tag: 'span',
    cssClasses: ['add-to-cart__cur-items'],
    textContent: '1',
  },
};

export default addToCartParams;
