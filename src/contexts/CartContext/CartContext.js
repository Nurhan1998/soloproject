import axios from "axios";
import React, { useReducer } from "react";
import { API } from "../../helpers/constants";

export const cartContext = React.createContext();

const INIT_STATE = {
  carts: [],
  pay: [],
  purchases: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CARTS":
      return { ...state, carts: action.payload };
    case "PAYMENT":
      return { ...state, pay: action.payload };
    case "GET_PURCHASES":
      return { ...state, purchases: action.payload };
    default:
      return state;
  }
};
const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getCarts = async () => {
    let data = JSON.parse(localStorage.getItem("cart"));

    dispatch({
      type: "GET_CARTS",
      payload: data,
    });
  };

  let count = 0;
  state.carts.map((item) => {
    console.log(item);
    count += item.price * item.quantity;
  });

  const trashCart = () => {
    localStorage.setItem("cart", "[]");
    getCarts();
  };
  const postCart = (item) => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
    let data = JSON.parse(localStorage.getItem("cart"));
    let res = data.find((elem) => {
      return elem.id === item.id;
    });
    let index = data.indexOf((elem) => {
      return elem.id === res.id;
    });
    if (res) {
      res.quantity += 1;
      data.splice(index - 1, 1);
      data.push(res);
      localStorage.setItem("cart", JSON.stringify(data));
    } else {
      data.push(item);
      localStorage.setItem("cart", JSON.stringify(data));
    }
    getCarts();
  };
  async function getPurchases() {
    let { data } = await axios(`${API}/users`);
    let user = data.find((item) => {
      return item.email === localStorage.getItem("user");
    });
    dispatch({
      type: "GET_PURCHASES",
      payload: user.purchases,
    });
  }

  const handlePurchase = async () => {
    let { data } = await axios(`${API}/users`);
    let user = data.find((item) => {
      return item.email === localStorage.getItem("user");
    });
    state.carts?.forEach((element) => {
      user.purchases.push(element);
    });
    await axios.patch(`${API}/users/${user.id}`, user);
  };
  const deleteCart = (item) => {
    let data = JSON.parse(localStorage.getItem("cart"));
    let res = data.find((elem) => {
      return elem.id === item.id;
    });
    let index = data.indexOf((elem) => {
      return elem.id === item.id;
    });
    if (res.quantity > 1) {
      res.quantity -= 1;

      data.splice(index, 1);
      data.push(res);
      localStorage.setItem("cart", JSON.stringify(data));
    } else {
      data.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(data));
    }
    getCarts();
  };
  const clickPay = (newObj) => {
    dispatch({
      type: "PAYMENT",
      payload: newObj,
    });
  };

  return (
    <cartContext.Provider
      value={{
        pay: state.pay,
        carts: state.carts,
        count: count,
        purchases: state.purchases,
        clickPay,
        trashCart,
        getCarts,
        postCart,
        deleteCart,
        handlePurchase,
        getPurchases,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
