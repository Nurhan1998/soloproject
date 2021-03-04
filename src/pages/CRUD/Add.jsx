import React, { useContext, useState } from "react";
import { productsContext } from "../../contexts/ProductsContext/ProductsContext";
import { Container, FormControl, Button, Image, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ProductsAdd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const { addProduct } = useContext(productsContext);
  const history = useHistory();

  function handleClick() {
    let newObj = {
      name,
      price,
      description,
      image,
      gender,
      type,
      quantity: 1,
      likes: 0,
      comments: [],
    };
    addProduct(newObj);
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    history.push("/list");
  }
  return (
    <div>
      <Image
        src="https://img.freepik.com/free-vector/white-abstract-background-in-3d-paper-style_23-2148403778.jpg?size=626&ext=jpg"
        style={{
          position: "fixed",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}
      />
      <Container
        style={{
          width: "400px",
          paddingTop: "120px",
          paddingBottom: "278px",
        }}
      >
        <h1 style={{ color: "white" }}>Admin Add Product</h1>
        <FormControl
          className="mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <Form.Group controlId="exampleForm.ControlSelect1" className="mt-2">
          <Form.Control
            as="select"
            defaultValue
            onClick={(e) => setGender(e.target.value)}
          >
            <option>men</option>
            <option>women</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1" className="mt-2">
          <Form.Control
            as="select"
            defaultValue
            onClick={(e) => setType(e.target.value)}
          >
            <option>jackets</option>
            <option>tShirts</option>
            <option>boots</option>
            <option>jeans</option>
          </Form.Control>
        </Form.Group>
        <FormControl
          min="1"
          className="mt-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Price"
        />
        <FormControl
          className="mt-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Description"
        />
        <FormControl
          className="mt-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          placeholder="Image URL"
        />
        <Button variant="dark" className="mt-2 " block onClick={handleClick}>
          Add Product
        </Button>
      </Container>
    </div>
  );
};

export default ProductsAdd;
