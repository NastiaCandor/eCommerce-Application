const authParams = {
  wrapper: {
    tag: 'div',
    cssClasses: ['header__auth'],
  },

  authItem: {
    tag: 'a',
    cssClasses: ['auth_item'],
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

  authItemsNames: ['Sign Up', 'Log In'],
  authItemsSrc: ['../assets/img/signup-svgrepo-com.svg', '../assets/img/login-svgrepo-com.svg'],
  authItemsAlt: ['sign-up', 'sign-in'],
};

export default authParams;
