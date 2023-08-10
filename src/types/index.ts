export type ElementParamsType = {
  tag: string;
  cssClasses?: string[];
  textContent?: string;
  mouseEvent?: ((evt?: Event) => void) | null;
  id?: string;
  value?: string;
  link?: string;
};

// export type ElementParamsType = {
// //   textContent?: string;
// //   cssClasses?: string[];
// //   value?: string;
// //   link?: string;
// //   src?: string;
// //   alt?: string;
// //   tag: string;
// //   id?: string;
// //   mouseEvent?: ((evt?: Event) => void) | null;
// // };
