const userIconsParams = {
  wrapper: {
    tag: 'div',
    cssClasses: ['header__user-icons'],
  },

  authItem: {
    tag: 'a',
    cssClasses: ['user-icon_item'],
    link: '#',

    itemImg: {
      tag: 'img',
      cssClasses: ['item_img'],
    },

    span: {
      tag: 'span',
      cssClasses: ['item_text'],
    },
  },

  authItemsNames: ['Cart', 'Sign Up', 'Log In'],
  authItemsSrc: [
    '../assets/img/cart-svgrepo-com.svg',
    '../assets/img/signup-svgrepo-com.svg',
    '../assets/img/login-svgrepo-com.svg',
  ],
  authItemsAlt: ['cart icon', 'sign up icon', 'sign in icon'],
};

export default userIconsParams;
