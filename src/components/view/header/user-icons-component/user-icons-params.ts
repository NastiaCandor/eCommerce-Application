const userIconsParams = {
  wrapper: {
    tag: 'div',
    cssClasses: ['header__user-icons'],
  },

  cartSpan: {
    tag: 'span',
    cssClasses: ['cart-span'],
    textContent: '0',
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
  anon: {
    iconsNames: ['Cart', 'Sign Up', 'Log In'],
    iconsSrc: [
      '../assets/img/cart-svgrepo-com.svg',
      '../assets/img/signup-svgrepo-com.svg',
      '../assets/img/login-svgrepo-com.svg',
    ],
    iconsAlt: ['cart icon', 'profile icon', 'logout icon'],
  },
  auth: {
    iconsNames: ['Cart', 'Profile', 'Log out'],
    iconsSrc: [
      '../assets/img/cart-svgrepo-com.svg',
      '../assets/img/profile-svgrepo-com.svg',
      '../assets/img/logout-svgrepo-com.svg',
    ],
    iconsAlt: ['cart icon', 'profile icon', 'log out icon'],
  },
};

export default userIconsParams;
