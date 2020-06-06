export const scrollToRefTop = (ref) =>
  window.scrollTo(0, ref.current.offsetTop);
export const scrollToRefBottom = (ref) => {
  window.scrollTo(0, ref.current.offsetBottom);
};
