import { ElementParamsType } from '../../../types';

type SliderParams = {
  maincarousel: ElementParamsType;
  track: ElementParamsType;
  list: ElementParamsType;
  slide: ElementParamsType;
  img: ElementParamsType;
  thubnails: ElementParamsType;
  thubnail: ElementParamsType;
};

const sliderParams: SliderParams = {
  maincarousel: {
    tag: 'div',
    cssClasses: ['splide'],
  },
  track: {
    tag: 'div',
    cssClasses: ['splide__track'],
  },
  list: {
    tag: 'ul',
    cssClasses: ['splide__list'],
  },
  slide: {
    tag: 'li',
    cssClasses: ['splide__slide'],
  },
  img: {
    tag: 'img',
    cssClasses: ['product__img'],
  },
  thubnails: {
    tag: 'ul',
    cssClasses: ['thumbnails'],
  },
  thubnail: {
    tag: 'li',
    cssClasses: ['thumbnail'],
  },
};

export default sliderParams;
