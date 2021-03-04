import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../contexts/ProductsContext/ProductsContext";
import { Link } from "react-router-dom";
import NaviBar from "../../components/NaviBar";
import { Container, Button, Card, Form, Image } from "react-bootstrap";
import { API } from "../../helpers/constants";
import Pagination from "react-bootstrap/Pagination";
import { CardDeck } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Footer from "../../components/Footer";
import { cartContext } from "../../contexts/CartContext/CartContext";
import "./style.css";
const ProductList = () => {
  const {
    products,
    getProducts,
    limit,
    count,
    handleLike,
    productDetail,
  } = useContext(productsContext);
  const { postCart } = useContext(cartContext);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("none");
  function handleFilter(e) {
    setPage(1);
    if (e.target.value === "none") {
      setFilter(e.target.value);
      return getProducts(
        `${API}/products?&_page=${page}&_limit=${limit}&q=${searchValue}`
      );
    }
    setFilter(e.target.value);
    setPage(1);
  }

  useEffect(() => {
    if (filter === "none") {
      return getProducts(
        `${API}/products?_page=${page}&_limit=${limit}&q=${searchValue}`
      ).then(() => {});
    }
    getProducts(
      `${API}/products?type=${filter}&_page=${page}&_limit=${limit}&q=${searchValue}`
    ).then(() => {});
  }, [page, searchValue, filter]);

  const onPaginationChange = (e) => {
    setPage(+e.target.textContent);
  };

  let active = page;
  let items = [];
  for (let page = 1; page <= Math.ceil(count / limit); page++) {
    items.push(
      <Pagination.Item key={page} active={page === active}>
        {page}
      </Pagination.Item>
    );
  }
  return (
    <>
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

      <NaviBar />
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label style={{ color: "white" }}>Filter by Category</Form.Label>
        <Form.Control as="select" defaultValue onChange={handleFilter}>
          <option>none</option>
          <option>jeans</option>
          <option>jackets</option>
          <option>boots</option>
          <option>tShirts</option>
        </Form.Control>
      </Form.Group>
      <input
        style={{
          width: "280px",
          margin: "20px auto",
          display: "block",
        }}
        placeholder="Search"
        value={searchValue}
        onChange={(e) => {
          e.preventDefault();
          setSearchValue(e.target.value);
        }}
      />
      <Container
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {products?.map((item, index) => (
          <CardDeck
            className="m-3 cart"
            key={index}
            style={{ width: "15rem", marginBottom: "20px" }}
          >
            <div>
              <Card>
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ height: "200px", padding: "5px" }}
                />
                <Card.Body style={{ textAlign: "center" }}>
                  <Card.Title>
                    <strong>{item.name} </strong>
                  </Card.Title>
                  <Card.Text>
                    <span>
                      <strong>Price: </strong>
                      {item.price} USD
                    </span>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Link
                    to={`products/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button className="rounded-pill mt-3" block>
                      Details
                    </Button>
                  </Link>
                  <Form className="text-center mt-2 mb-2 ">
                    <Button
                      onClick={() => postCart(item)}
                      variant="outline-primary"
                      className="rounded-pill mr-2"
                    >
                      <FaCartPlus />
                    </Button>
                    <Button
                      variant={item.likes ? "danger" : "outline-danger"}
                      className="rounded-pill mr-2"
                      onClick={() => handleLike(item)}
                    >
                      <AiOutlineHeart />
                    </Button>
                  </Form>
                  <span style={{ color: "#DB380B" }}>
                    {item.likes
                      ? item.likes + "  людей поставили нравится товару"
                      : null}
                  </span>
                </Card.Footer>
              </Card>
            </div>
          </CardDeck>
        ))}
      </Container>
      <Pagination onClick={onPaginationChange}>{items}</Pagination>
      <Footer />
    </>
  );
};
export default ProductList;
