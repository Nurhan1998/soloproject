import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Container, FormControl, Button, Form, Image } from "react-bootstrap";
import { productsContext } from "../../contexts/ProductsContext/ProductsContext";
import NaviBar from "../../components/NaviBar";

const ProductEdit = () => {
  const history = useHistory();
  const { productToEdit, editSave } = useContext(productsContext);
  const [newProduct, setNewProduct] = useState(productToEdit);
  useEffect(() => {
    setNewProduct(productToEdit);
  }, [productToEdit]);

  function createNewProduct(e) {
    let editObj = {
      ...newProduct,
      [e.target.name]: e.target.value,
    };
    console.log(editObj);
    setNewProduct(editObj);
  }
  function handleClickSave() {
    let newProd = newProduct;
    editSave(newProd);
    history.push("/list");
  }
  return (
    <>
      <NaviBar />
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
        alt="asdf"
      />
      <div>
        <Container
          style={{
            width: "400px",
            marginTop: "60px",
            marginBottom: "60px",
          }}
        >
          <h1>Edit</h1>
          {
            <div>
              <img src={newProduct?.image} width="100%" />
            </div>
          }

          <FormControl
            className="mt-2"
            value={newProduct?.name}
            defaultValue="name"
            onChange={(e) => createNewProduct(e)}
            type="text"
            name="name"
            placeholder="Name"
          />
          <Form.Group controlId="exampleForm.ControlSelect1" className="mt-2">
            <Form.Control
              name="gender"
              defaultValue="gender"
              value={newProduct?.gender}
              as="select"
              onChange={(e) => createNewProduct(e)}
            >
              <option>men</option>
              <option>women</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1" className="mt-2">
            <Form.Control
              name="type"
              defaultValue="type"
              value={newProduct?.type}
              as="select"
              onChange={(e) => createNewProduct(e)}
            >
              <option>jeans</option>
              <option>tShirts</option>
              <option>jackets</option>
              <option>boots</option>
            </Form.Control>
          </Form.Group>
          <FormControl
            className="mt-2"
            defaultValue="price"
            value={newProduct?.price}
            onChange={(e) => createNewProduct(e)}
            type="number"
            name="price"
            placeholder="Price"
          />
          <FormControl
            className="mt-2"
            value={newProduct?.description}
            defaultValue="dscrptn"
            onChange={(e) => createNewProduct(e)}
            type="text"
            name="description"
            placeholder="Description"
          />
          <FormControl
            className="mt-2"
            defaultValue="img"
            value={newProduct?.image}
            onChange={(e) => createNewProduct(e)}
            type="text"
            name="image"
            placeholder="Image URL"
          />
          <Button block className="mt-2" onClick={handleClickSave}>
            Save
          </Button>
        </Container>
      </div>
    </>
  );
};

export default ProductEdit;
