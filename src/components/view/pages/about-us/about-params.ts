import { DevelopersData } from '../../../../types';

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
  personsInnerWrapper: {
    tag: 'div',
    cssClasses: ['about-us__persons-wrapper'],
  },
  personWrapper: {
    tag: 'div',
    cssClasses: ['about-us__person'],
  },
  personImg: {
    tag: 'div',
    cssClasses: ['about-us__person_img'],
    alt: "QuantumCoders developer's photo",
  },
  personTopContainer: {
    tag: 'div',
    cssClasses: ['about-us__person_top'],
  },
  personRoleContainer: {
    tag: 'div',
    cssClasses: ['about-us__person_role-wrapper'],
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
  },
  personContribution: {
    tag: 'li',
    cssClasses: ['about-us__person_contribution-item'],
  },
  personContributionTitle: {
    tag: 'li',
    cssClasses: ['about-us__person_contribution-item-title'],
    textContent: 'Contributions: ',
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
    textContent: 'Special thanks to  ',
  },
  rsTitle2: {
    tag: 'span',
    cssClasses: ['about-us__rs-wrapper_title'],
    textContent: '  whom made our study and collaboration possible!',
  },
  rsLogo: {
    tag: 'a',
    cssClasses: ['about-us__rs-wrapper_rslogo', 'footer__wrapper_logo'],
  },
  teamWorkWrapper: {
    tag: 'div',
    cssClasses: ['team-work__wrapper'],
  },
  teamWorkHeading: {
    tag: 'h4',
    cssClasses: ['team-work__heading'],
    textContent: 'Team collaboration',
  },
  teamWorkText: {
    tag: 'p',
    cssClasses: ['team-work__text'],
    textContent:
      'We joined together as a team for developing a RSSChool study project based on Commercetools API and decided to create an online store of vinyl records. During this work we tried our best to meat school dealines altogether with fulfilling all necessary technical task requirements. To achieve these goals we used the following means:',
  },
  teamWorkListItem: {
    tag: 'li',
    cssClasses: ['team-work__list-item'],
  },

  teamWorkList: {
    tag: 'ul',
    cssClasses: ['team-work__list'],
    listItemsArr: [
      '- Creating a Discord server with separate channels for storing all project materials such as images, links etc, for all Github information, for everyday project discussions;',
      '- Creating a Kanban board in Notion application for keeping all tasks information, assigning tasks to team members and tracking their сurrent development status;',
      '- Setting up weekly meeting for discussing current project work status, resolving issues and planning our next steps;',
      '- Maintaining communication with our mentor, consulting about better approaches for project architechure and ways of sustaining effective everyday work',
    ],
  },
};

const developersInfo: DevelopersData = {
  dev0: {
    name: 'Elena Anisimova',
    role: 'Front-End Developer',
    contributions: [
      'Configured Jest',
      'Created Registration page',
      'Created Profile page',
      'Created Shopping Cart page',
    ],
    bio: 'Working on creating an online store project with server based on Commercetools API allowed me to gain experience of being part of the IT team and deepen my knowledge of web development, hopefully helping me to achieve my goal of becoming a developer.',
    link: 'https://github.com/elenaanisimova',
  },
  dev1: {
    name: 'Anastasia Dubova',
    role: 'Front-End Developer/Team-lead',
    contributions: [
      'Implementation of anonymous and logged user cart, and anonymous to logged cart merge functionality',
      'Implementation of Login page',
      'Implementation of Detailed Product page',
      'Manage task board',
      'Implementation of adding/removing items to the cart from Catalog and Product pages',
    ],
    bio: 'After multiple tries of finding myself in different fields and having several degrees I finally realized what I am really passionate about, and this is Front-End. I believe that now I can truly express myself.',
    link: 'https://github.com/nastiacandor',
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
    bio: 'I enjoy collaborating with others and my goal is to create engaging and user-friendly websites that are visually appealing and easy to use. Always learning and exploring new technologies and techniques to stay up-to-date with the latest trends in web development.',
    link: 'https://github.com/getgitgood',
  },
};

export { aboutParams, developersInfo };
