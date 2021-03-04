import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "./Style.css";

const Section = () => {
  return (
    <Container className="mt-5 mb-5">
      <Row className="ml-auto mr-auto d-flex flexWrap">
        <Col xs={12} md={6} lg={6}>
          <Card
            className="section-item mt-2"
            style={{
              width: "16rem",
              height: "200px",
            }}
          >
            <strong>Женские</strong>

            <Card.Img src="https://preview.colorlib.com/theme/cozastore/images/banner-01.jpg" />
          </Card>
        </Col>
        <Col xs={12} md={6} lg={6}>
          <Card
            className="section-item mt-2"
            style={{ width: "16rem", height: "200px" }}
          >
            <strong>Мужские</strong>
            <Card.Img src="https://preview.colorlib.com/theme/cozastore/images/banner-02.jpg" />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Section;
