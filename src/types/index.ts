export type ElementParamsType = {
  tag: string;
  cssClasses?: string[];
  textContent?: string;
  mouseEvent?: ((evt?: Event) => void) | null;
  id?: string;
  value?: string;
  link?: string;
};
