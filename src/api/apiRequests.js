import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);
    const allowedOrigins = [process.env.REACT_APP_BASEURL];
    const token = localStorage.getItem("access-token");
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const fetchProducts = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASEURL}/products?limit=8&page=${pageParam}`
  );
  return data;
};
export const fetchProduct = async (slugifiedName) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASEURL}/products/${slugifiedName}`
  );
  return data;
};

export const postRegister = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASEURL}/auth/register`,
    input
  );
  return data;
};

export const postLogin = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASEURL}/auth/login`,
    input
  );
  return data;
};

export const FetchMe = async () => {
  const { data } = await axios.post(`${process.env.REACT_APP_BASEURL}/auth/me`);
  return data;
};

export const FetchLogOut = async () => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASEURL}/auth/logout`,
    {
      refresh_token: localStorage.getItem("refresh-token"),
    }
  );
  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASEURL}/orders`,
    input
  );
  return data;
};

export const fetchOrders = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_BASEURL}/orders`);
  return data;
};

export const deleteProduct=async(product_id)=>{
  const { data } = await axios.delete(`${process.env.REACT_APP_BASEURL}/products/${product_id}`);
  return data;
}

export const updateProduct=async(product_id,input)=>{
  const { data } = await axios.put(`${process.env.REACT_APP_BASEURL}/products/${product_id}`,input);
  return data;
}

export const postProduct=async(input)=>{
  const { data } = await axios.post(`${process.env.REACT_APP_BASEURL}/products/`,input);
  return data;
}