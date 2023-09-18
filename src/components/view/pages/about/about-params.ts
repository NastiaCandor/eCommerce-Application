const aboutParams = {
  section: {
    tag: 'section',
    cssClasses: ['main__section'],
  },
  container: {
    tag: 'div',
    cssClasses: ['main__container'],
  },
  sloganImgWrapper: {
    tag: 'div',
    cssClasses: ['main-slogan-img__wrapper'],
  },

  imgWrapper: {
    tag: 'div',
    cssClasses: ['main-img__wrapper'],
  },

  sloganWrapper: {
    tag: 'div',
    cssClasses: ['main-slogan__wrapper'],
  },

  sloganHeading: {
    tag: 'h2',
    cssClasses: ['main-slogan__heading'],
    textContent: 'Discover the Warmth of Vinyl',
  },

  infoText: {
    tag: 'p',
    cssClasses: ['main-slogan__info-text'],
    textContent:
      'Vinyl Vibe is a retro  <b>vinyl records</b> shop that offers a unique experience for all music and vintage enthusiasts.',
  },

  infoText2: {
    tag: 'p',
    cssClasses: ['main-slogan__info-text', 'info-text2'],
    textContent:
      'Our shop specializes in selling <b>original and rare</b> vinyl records, allowing you to experience the authenticity and warmth of sound that only vinyl can provide.',
  },

  infoTextElla: {
    tag: 'p',
    cssClasses: ['main-slogan__info-text', 'info-text2'],
    textContent: '“I sing like I feel.” - Ella Fitzgerald​​​​​​​​.',
  },

  infoTextJazz: {
    tag: 'p',
    cssClasses: ['info-text-jazz', 'info-text-jazz-top'],
    textContent: 'Ella Fitzgerald and More:',
  },

  infoTextJazz2: {
    tag: 'a',
    href: '#',
    cssClasses: ['info-text-jazz', 'info-text-jazz-bottom'],
    textContent: 'Jazz Vinyl Records Out Now!',
  },

  img: {
    tag: 'img',
    cssClasses: ['main-img'],
    alt: 'girl-vinyl',
    src: '../assets/img/girl.png',
  },

  innerWrapper: {
    tag: 'div',
    cssClasses: ['main-inner__wrapper'],
  },

  sloganHeading2: {
    tag: 'h2',
    cssClasses: ['main-slogan__heading2'],
    textContent: 'Jazz up Your Vinyl Collection',
  },

  imgWrapperJazz: {
    tag: 'div',
    cssClasses: ['main-img__wrapper', 'jazz-img__wrapper'],
  },

  imgJazz: {
    tag: 'img',
    cssClasses: ['jazz-img'],
    alt: 'ella-Fitzgerald',
    src: '../assets/img/The_Gershwin_Song.jpg',
  },

  imgVinyl: {
    tag: 'img',
    cssClasses: ['vinyl-img'],
    alt: 'vinyl-record',
    src: '../assets/img/vinyl.png',
  },
};

const discountCodeParams = {
  container: {
    tag: 'div',
    cssClasses: ['discount__contaner'],
  },
  photoContainer: {
    tag: 'div',
    cssClasses: ['discount__photo-contaner'],
  },
  photoIMG: {
    tag: 'img',
    cssClasses: ['discount__photo-img'],
  },
  info: {
    container: {
      tag: 'div',
      cssClasses: ['discount__info-contaner'],
    },
    title: {
      tag: 'h3',
      cssClasses: ['discount__title'],
    },
    codeText: {
      tag: 'p',
      cssClasses: ['discount__code-text'],
      textContent: 'CODE: ',
    },
    code: {
      tag: 'span',
      cssClasses: ['discount__code'],
    },
    subtitle: {
      tag: 'h4',
      cssClasses: ['discount__subtitle'],
    },
    description: {
      tag: 'p',
      cssClasses: ['discount__description'],
    },
    validUntil: {
      tag: 'p',
      cssClasses: ['discount__valid-until'],
    },
    maxApplic: {
      tag: 'p',
      cssClasses: ['discount__comment_max-applic'],
    },
    comment: {
      tag: 'p',
      cssClasses: ['discount__comment'],
      textContent: '*Use this code in your cart',
    },
  },
};

const DISCOUNT_PHOTOS = [
  {
    imgSRC: '../../../../assets/img/discount-back-to-school.png',
    imgALT: 'Image of a school girl',
  },
  {
    imgSRC: '../../../../assets/img/discount-first-buy.png',
    imgALT: 'Image of a man',
  },
];

export { aboutParams, discountCodeParams, DISCOUNT_PHOTOS };
