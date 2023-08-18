const headerParams = {
  header: {
    tag: 'header',
  },
  innerWrapper: {
    tag: 'div',
    cssClasses: ['header__wrapper', 'wrapper'],
  },
  logo: {
    tag: 'a',
    cssClasses: ['header__wrapper_logo'],
    link: '#',
  },

  burgerMenuWrapper: {
    tag: 'div',
    cssClasses: ['header__menu', 'hidden'],
  },

  burgerMenuButton: {
    tag: 'div',
    cssClasses: ['header__menu_btn'],
  },
  burgerMenuButtonBar: {
    tag: 'span',
    cssClasses: ['btn_bar'],
  },
};

export default headerParams;
