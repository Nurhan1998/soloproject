import React, { useContext, useState } from "react";
import { Form, Col, Button, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { cartContext } from "../../contexts/CartContext/CartContext";

const FormPage = () => {
  const { count, handlePurchase, carts, trashCart } = useContext(cartContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [table, setTable] = useState([]);

  const handleClick = () => {
    if (!name || !phone || !email) {
      return;
    }
    let newObj = {
      email,
      name,
      phone,
    };
    setTable(newObj);
  };

  const handleClickAdd = (e) => {
    handlePurchase();
    trashCart();
  };
  console.log(count);
  return (
    <>
      <Container>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                type="name"
                name="name"
                placeholder="Enter fullname"
                onChange={(e) => setName(e)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              placeholder="email@gmail.com"
              onChange={(e) => setEmail(e)}
            />
          </Form.Group>

          <Form.Group controlId="formGridPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              name="number"
              placeholder="Enter phone"
              onChange={(e) => setPhone(e)}
            />
          </Form.Group>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              {carts?.map((elem, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{elem.name}</td>
                  <td>{elem.price}</td>
                  <td style={{ width: "350px" }}>
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={elem.image}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>товары отправятся к {table?.name}</p>
          <p>{table}</p>
          <p></p>
          <p>
            Вы выбрали товары на сумму:
            <strong> {count}$</strong>
          </p>
          <Link to="/payment">
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleClickAdd(e)}
            >
              Добавить карту
            </Button>
          </Link>

          <Link to="/cart">
            <Button variant="danger">Отмена</Button>
          </Link>
        </Form>
      </Container>
    </>
  );
};

export default FormPage;
