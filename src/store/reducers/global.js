import * as actionTypes from "../actions/action-types";

const currentTheme =
  localStorage.getItem("theme") ||
  (localStorage.setItem("theme", "light") && "light");
const initailState = {
  isLoading: true,
  currentUrl: null,
  theme: currentTheme,
  pageTitle: "Zubstr",
  isBackBtnEnabled: false,

  postModal: {
    open: false,
  },
};

const reducer = (state = initailState, action) => {
  const { data } = action || {};
  switch (action.type) {
    case actionTypes.SET_GLOBAL_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.RESET_GLOBAL_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.RESET_GLOBAL_APP_URL:
      return {
        ...state,
        currentUrl: null,
      };
    case actionTypes.SET_GLOBAL_APP_URL:
      return {
        ...state,
        currentUrl: action.url,
      };
    case actionTypes.SET_BACK_BTN:
      return {
        ...state,
        isBackBtnEnabled: true,
      };
    case actionTypes.RESET_BACK_BTN:
      return {
        ...state,
        isBackBtnEnabled: false,
      };
    case actionTypes.SET_GLOBAL_PAGE_TITLE:
      document.title = action.pageTitle || "Zubstr";
      return {
        ...state,
        pageTitle: action.pageTitle || "Zubstr",
      };
    case actionTypes.SET_GLOBAL_THEME:
      let theme = action.theme && action.theme.toLowerCase();
      if (theme === "light" || theme === "dark") {
        localStorage.setItem("theme", theme);
      }
      return {
        ...state,
        theme,
      };
    case actionTypes.SET_POST_MODAL_OPEN:
      return {
        ...state,
        postModal: {
          ...state.postModal,
          open: true,
        },
      };
    case actionTypes.RESET_POST_MODAL_OPEN:
      return {
        ...state,
        postModal: {
          ...state.postModal,
          open: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
