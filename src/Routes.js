import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext/AuthContext";
import ProductsContextProvider from "./contexts/ProductsContext/ProductsContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import ProductList from "./pages/Products/ProductList";
import Add from "./pages/CRUD/Add";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/Products/ProductsDetails";
import ProductEdit from "./pages/CRUD/ProductEdit";
import CartContextProvider from "./contexts/CartContext/CartContext";
import FormPage from "./pages/Form/FormPage";
import PaymentForm from "./pages/Payment/PaymentForm";
import Purchases from "./pages/Form/Purchases";

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <ProductsContextProvider>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/" component={Home} />
              <Route exact path="/purchases" component={Purchases} />
              <Route exact path="/products/:id" component={ProductDetails} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/formpage" component={FormPage} />
              <Route exact path="/add" component={Add} />
              <Route exact path="/payment" component={PaymentForm} />
              <Route exact path="/edit" component={ProductEdit} />
              <Route exact path="/list" component={ProductList} />
            </Switch>
          </ProductsContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default Routes;
