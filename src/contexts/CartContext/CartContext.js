import React, { useReducer } from "react";

export const cartContext = React.createContext();

const INIT_STATE = {
  carts: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CARTS":
      return { ...state, carts: action.payload };
    case "GET_VALID_CART":
      return { ...state, validCart: action.payload };
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

  return (
    <cartContext.Provider
      value={{
        carts: state.carts,
        count: count,
        trashCart,
        getCarts,
        postCart,
        deleteCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
