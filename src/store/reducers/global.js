import * as actionTypes from "../actions/action-types";

const currentTheme = localStorage.getItem("theme") || "light";
const initailState = {
  isLoading: false,
  currentUrl: null,
  theme: currentTheme,
  pageTitle: "Zubstr"
};

const reducer = (state = initailState, action) => {
  const { data } = action || {};
  switch (action.type) {
    case actionTypes.SET_GLOBAL_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.RESET_GLOBAL_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.RESET_GLOBAL_APP_URL:
      return {
        ...state,
        currentUrl: null
      };
    case actionTypes.SET_GLOBAL_APP_URL:
      return {
        ...state,
        currentUrl: action.url
      };
    case actionTypes.SET_GLOBAL_PAGE_TITLE:
      document.title = action.pageTitle || "Zubstr";
      return {
        ...state,
        pageTitle: action.pageTitle || "Zubstr"
      };
    case actionTypes.SET_GLOBAL_THEME:
      let theme = action.theme && action.theme.toLowerCase();
      if (theme === "light" || theme === "dark") {
        localStorage.setItem("theme", theme);
      }
      return {
        ...state,
        theme
      };
    default:
      return state;
  }
};

export default reducer;
