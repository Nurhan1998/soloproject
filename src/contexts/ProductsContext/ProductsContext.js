import axios from "axios";
import React, { useReducer } from "react";

import { API } from "../../helpers/constants";
import ProductDetails from "../../pages/Products/ProductsDetails";

export const productsContext = React.createContext();

const INIT_STATE = {
  products: [],
  productDetail: null,
  productToEdit: null,
  count: 0,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
        count: action.payload.count,
      };
    case "GET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: action.payload,
      };
    case "GET_PRODUCT_TO_EDIT":
      return {
        ...state,
        productToEdit: action.payload,
      };

    default:
      return state;
  }
};

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const limit = 8;

  const getProducts = async (url) => {
    const countProducts = await axios.get(`${API}/products`);
    const { data } = await axios.get(url);
    dispatch({
      type: "GET_PRODUCTS",
      payload: {
        products: data,
        count: countProducts.data.length,
      },
    });
  };
  const getProductDetail = async (id) => {
    const { data } = await axios.get(`${API}/products/${id}`);
    dispatch({
      type: "GET_PRODUCT_DETAIL",
      payload: data,
    });
  };
  const productDelete = async (id) => {
    await axios.delete(`${API}/products/${id}`);
  };

  const addProduct = async (newProd) => {
    await axios.post(`${API}/products`, newProd);
    getProducts(`${API}/products&limit=${limit}`);
  };
  const handleLike = async (item) => {
    console.log(item);
    let { data } = await axios(`${API}/products`);
    let res = data.find((elem) => {
      return item.id === elem.id;
    });
    if (res.likes) {
      res.likes -= 1;
      await axios.patch(`${API}/products/${item.id}`, res);
      getProducts(`${API}/products?&_limit=${limit}`);
      getProductDetail(item.id);
    } else {
      res.likes += 1;
      await axios.patch(`${API}/products/${item.id}`, res);
      getProducts(`${API}/products?&_limit=${limit}`);
      getProductDetail(item.id);
    }
  };
  const productEdit = async (id) => {
    const { data } = await axios.get(`${API}/products/${id}`);
    dispatch({
      type: "GET_PRODUCT_TO_EDIT",
      payload: data,
    });
  };

  const editSave = async (newProd) => {
    await axios.patch(`${API}/products/${newProd.id}`, newProd);
  };

  return (
    <productsContext.Provider
      value={{
        products: state.products,
        productDetail: state.productDetail,
        productToEdit: state.productToEdit,
        count: state.count,
        limit: limit,
        handleLike,
        addProduct,
        getProducts,
        getProductDetail,
        productDelete,
        productEdit,
        editSave,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
