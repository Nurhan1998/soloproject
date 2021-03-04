import React from "react";
import { Card, Col, Container, Image } from "react-bootstrap";
import "./Style.css";

const SecondSection = () => {
  return (
    <Container className="d-flex">
      <Col>
        <Card>
          <Image
            className="main-img"
            src="https://preview.colorlib.com/theme/cozastore/images/product-01.jpg"
          />
        </Card>
      </Col>
    </Container>
  );
};

export default SecondSection;
