import axios from "axios";
import { store } from "../store/store";
import { setLoading } from "../store/slices/app-slice";
import cogoToast from "cogo-toast";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const { user } = store.getState().user;
console.log("userFrom", user);
const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Authorization: user?.token ? `${user.token}` : "",
  },
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    // Check if the request method is POST
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      store.dispatch(setLoading(true));
      // Your custom code here
      console.log("Running code for POST request");
    }
    return config; // Always return the config
  },
  (error) => {
    store.dispatch(setLoading(false));
    // Handle request error
    return Promise.reject(error);
  },
);

// Add a response interceptor

AxiosInstance.interceptors.response.use(
  (response) => {
    if (
      response.config.method === "post" ||
      response.config.method === "put" ||
      response.config.method === "delete"
    ) {
      store.dispatch(setLoading(false));
      cogoToast.success("Data saved successfully", { position: "top-right" });
    }
    return response;
  },
  async (error) => {
    // Check if the request was a POST request
    if (
      error.config.method === "post" ||
      error.config.method === "put" ||
      error.config.method === "delete"
    ) {
      store.dispatch(setLoading(false));
    } else {
      console.error("Non-POST request error:", error);
      store.dispatch(setLoading(false));
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;
