const aboutParams = {
  section: {
    tag: 'section',
    cssClasses: ['about-us'],
  },
  aboutHeading: {
    tag: 'div',
    cssClasses: ['about-us__wrapper'],
  },
  aboutHeadingTitle1: {
    tag: 'div',
    cssClasses: ['about-us__heading_title'],
    textContent: 'We are the QuatumCoders.',
  },
  aboutHeadingTitle2: {
    tag: 'div',
    cssClasses: ['about-us__heading_title'],
    textContent: 'In code we trust.',
  },
  aboutHeadingImage: {
    tag: 'a',
    cssClasses: ['about-us__heading_img', 'footer__wrapper_logo-qc'],
    alt: 'QuantumCoders logo',
  },
  personsWrapper: {
    tag: 'div',
    cssClasses: ['about-us__persons'],
  },
  personsWrapperTitle: {
    tag: 'div',
    cssClasses: ['about-us__heading_title'],
    textContent: 'Our Team:',
  },
  personWrapper: {
    tag: 'div',
    cssClasses: ['about-us__person'],
  },
  personImg: {
    tag: 'img',
    cssClasses: ['about-us__person_img'],
    alt: "QuantumCoders developer's photo",
  },
  personName: {
    tag: 'span',
    cssClasses: ['about-us__person_name'],
  },
  personRole: {
    tag: 'span',
    cssClasses: ['about-us__person_role'],
  },
  personContributionItems: {
    tag: 'ul',
    cssClasses: ['about-us__person_contribution-items'],
    textContent: 'Contributions: ',
  },
  personContribution: {
    tag: 'li',
    cssClasses: ['about-us__person_contribution-item'],
  },
  personBio: {
    tag: 'p',
    cssClasses: ['about-us__person_bio'],
  },
  personLink: {
    tag: 'a',
    cssClasses: ['about-us__person_link'],
  },
  rsWrapper: {
    tag: 'div',
    cssClasses: ['about-us__wrapper'],
  },
  rsTitle1: {
    tag: 'span',
    cssClasses: ['about-us__rs-wrapper_title'],
    textContent: 'Special thanks to ',
  },
  rsTitle2: {
    tag: 'span',
    cssClasses: ['about-us__rs-wrapper_title'],
    textContent: 'whom made our study and collobaration possible!',
  },
  rsLogo: {
    tag: 'a',
    cssClasses: ['about-us__rs-wrapper_rslogo', 'footer__wrapper_logo'],
  },
};

const developersInfo = {
  dev0: {
    name: 'Anastasia Dubova',
    role: 'Front-End Developer/Team-lead',
    contributions: [
      'Manage task board',
      'Implementation of Login page',
      'Implementation of Detailed Product page',
      'Implementation of adding/removing items to the cart from Catalog and Product pages',
      'Implementation of anonymous and logged user cart, and anonymous to logged cart merge functionality',
    ],
    bio: 'After multiple tries of finding myself in different fields and having several degrees I finally realized what I am really passionate about, and this is Front-End. I believe that now I can truly express myself.',
    link: 'https://github.com/nastiacandor',
  },
  dev1: {
    name: 'Elena Anisimova',
    role: 'Front-End Developer',
    contributions: [
      'Routing Implementation',
      'Filters Implementation',
      'Catalog page development',
      'Webpack Configuration',
    ],
    bio: 'to be proceeded',
    link: 'https://github.com/elenaanisimova',
  },
  dev2: {
    name: 'Nikolai Shvechkov',
    role: 'Front-End Developer',
    contributions: [
      'Routing Implementation',
      'Filters Implementation',
      'Catalog page development',
      'Webpack Configuration',
    ],
    bio: 'to be proceeded',
    link: 'https://github.com/getgitgood',
  },
};

export { aboutParams, developersInfo };
