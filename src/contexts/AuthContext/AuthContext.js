import React, { useReducer } from "react";
import axios from "axios";
import { API } from "../../helpers/constants";
import { useHistory } from "react-router-dom";

export const authContext = React.createContext();

const INIT_STATE = {
  users: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };

    default:
      return state;
  }
};
const AuthContextProvider = ({ children }) => {
  const history = useHistory();

  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const getUsers = async () => {
    const { data } = await axios.get(`${API}/users`);
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  const addUser = async (newUser) => {
    let res = state.users.filter((item) => {
      return item.email === newUser.email;
    });
    if (res.length) {
      alert("вы уже зарегистрированы");
      history.push("/login");
    } else {
      await axios.post(`${API}/users`, newUser);
      alert("регистрация прошла успешно");
      history.push("/login");
    }
    getUsers();
  };

  return (
    <authContext.Provider
      value={{
        users: state.users,
        addUser,
        getUsers,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
