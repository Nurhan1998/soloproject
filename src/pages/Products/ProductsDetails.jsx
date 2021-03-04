import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { productsContext } from "../../contexts/ProductsContext/ProductsContext";
import {
  Container,
  Row,
  Col,
  Image,
  InputGroup,
  FormControl,
  Table,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FaCartPlus } from "react-icons/fa";
import NaviBar from "../../components/NaviBar";
import { API } from "../../helpers/constants";
import axios from "axios";

const ProductDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const {
    getProductDetail,
    productDetail,
    productDelete,
    productEdit,
    handleLike,
  } = useContext(productsContext);

  const [isAdmin, setIsAdmin] = useState(false);
  const [comment, setComment] = useState("");
  const [trig, setTrig] = useState(0);

  const handleComment = async () => {
    let obj = { comment };
    productDetail.comments.push(obj);
    await axios.patch(`${API}/products/${productDetail.id}`, productDetail);
    setTrig(trig + 1);
  };

  useEffect(() => {
    const admin = localStorage.getItem("role");
    if (admin) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    getProductDetail(id);
  }, [trig]);

  function handleClickDelete(id) {
    productDelete(id);
    history.push("/list");
  }
  function handleClickEdit(id) {
    productEdit(id);
  }
  const handleClickLike = (item) => {
    handleLike(item);
    setTrig(trig + 1);
  };

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
      />
      <Container className="mt-5">
        <Row>
          <Col>
            <img
              src={productDetail?.image}
              alt={`product image `}
              width={250}
              height={300}
              className="mr-5"
            />
          </Col>
          <Col>
            <h5>{productDetail?.name}</h5>
            {!isAdmin ? (
              <>
                <p>{productDetail?.description}</p>
                <p style={{ color: "#DB380B" }}>
                  {productDetail?.likes
                    ? productDetail?.likes + " людям понравился данный продукт"
                    : null}
                </p>
                <Link to="/list">
                  <Button>Exit</Button>
                </Link>
                <Button
                  variant="outline-primary"
                  className="rounded-pill mr-2 ml-2"
                >
                  <FaCartPlus />
                </Button>
                <Button
                  onClick={() =>
                    handleClickLike(productDetail ? productDetail : null)
                  }
                  variant={productDetail?.likes ? "danger" : "outline-danger"}
                  className="rounded-pill mr-2"
                >
                  <AiOutlineHeart />
                </Button>
              </>
            ) : (
              <>
                <p>{productDetail?.description}</p>

                <Link onClick={() => handleClickEdit(id)} to={"/edit"}>
                  <Button className="mr-3">Edit</Button>
                </Link>
                <Button className="mr-3" onClick={() => handleClickDelete(id)}>
                  Delete
                </Button>

                <Link to="/admin-list">
                  <Button>Exit</Button>
                </Link>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <Container
        className="d-flex"
        style={{ flexWrap: "wrap", flexDirection: "column" }}
      >
        <Col xs={12} md={6}>
          <InputGroup
            className="mb-3 mt-3"
            style={{ width: "100%", alignSelf: "center" }}
          >
            <FormControl
              placeholder="Оставьте отзыв"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <InputGroup.Append>
              <Button variant="outline-primary" onClick={() => handleComment()}>
                отзывы
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
        <Col xs={12} md={6}>
          <Table striped bordered hover size="sm">
            <tbody>
              <strong>Отзывы о данном товаре </strong>
              {productDetail?.comments.map((item, index) => (
                <tr key={index}>
                  <td>{item.comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Container>
    </>
  );
};

export default ProductDetails;
