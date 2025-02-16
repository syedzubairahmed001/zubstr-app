import axios from "axios";
import { setupCache } from "axios-cache-adapter";

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 30 * 1000,
});

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    common: {
      // can be common or any other method
      // 'x-access-token': localStorage.getItem('a-id') || '',
      // 'x-refresh-token': localStorage.getItem('r-id') || '',
      "zubstr-ref": "web",
    },
  },
  adapter: cache.adapter,
});
instance.defaults.withCredentials = true;

console.log("api-url", process.env.REACT_APP_API_URL);

export default instance;
