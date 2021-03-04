import React, { useContext, useState } from "react";
import { cartContext } from "../../contexts/CartContext/CartContext";
import Button from "react-bootstrap/Button";
import { Container, Row, Col, Image } from "react-bootstrap";
import { RiAddCircleLine, RiDeleteBin6Line } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import NaviBar from "../../components/NaviBar";

const Cart = () => {
  let history = useHistory();
  const { deleteCart, count } = useContext(cartContext);
  const [trgger, setTrigger] = useState("");

  let carts = JSON.parse(localStorage.getItem("cart"));
  console.log(carts);
  const handleClickCart = (item) => {
    deleteCart(item);
    setTrigger(item);
  };

  return (
    <>
      <NaviBar />
      <div>
        <Container>
          <Row>
            <Col>
              <Container
                style={{
                  width: "20rem",
                  marginTop: "30px",
                  backgroundColor: "white",
                }}
                fluid
                className="border"
              >
                <h5 className="text-center border-bottom">MY CART</h5>
                {carts?.map((item, index) => (
                  <div key={index} className="text-center mb-5 border-bottom">
                    <Image src={item.image} fluid />
                    <h5>
                      <strong>{item.name}</strong>
                    </h5>
                    <h6>
                      Price: <strong>${item.price}</strong>
                    </h6>
                    <h6>
                      Qty: <strong>{item.quantity}</strong>
                    </h6>
                    <h6>
                      ToI: <strong>${item.quantity * item.price}</strong>
                    </h6>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="mb-2 mr-3"
                    >
                      <RiAddCircleLine />
                    </Button>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="mb-2"
                      onClick={() => handleClickCart(item)}
                    >
                      <RiDeleteBin6Line />
                    </Button>
                  </div>
                ))}
              </Container>
            </Col>
            <Col>
              <Container
                fluid
                style={{ width: "20rem", marginTop: "30px", height: "400px" }}
                className="border"
              >
                <ul>
                  {carts?.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between border-bottom"
                    >
                      <strong>{item.name}</strong>
                      <span>{item.quantity * item.price}$</span>
                    </div>
                  ))}
                </ul>
                <h5 className="text-center border-bottom">TOTAL:</h5>

                <p className="text-center">
                  <strong>{count}$</strong>
                </p>

                <Button block onClick={() => history.push("/formpage")}>
                  CHECKOUT
                </Button>
                <h6>WE ACCEPT:</h6>
                <Image
                  style={{ width: "18rem" }}
                  src="https://assets.asosservices.com/asos-finance/images/marketing/single.png"
                />
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Cart;
