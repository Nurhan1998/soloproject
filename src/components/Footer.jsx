import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiTwitch,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#EBEAFF",
        bottom: "0",
      }}
    >
      <Row
        style={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          backgroundColor: "#433F36",
        }}
      >
        <Col xs={12} lg={4} className="text-center">
          <Image
            style={{ width: "100px", height: "100px" }}
            src="https://thumbs.dreamstime.com/b/vintage-denim-jeans-frame-logo-classical-clothing-line-label-great-retro-badge-shop-more-78791983.jpg"
          />
        </Col>
        <Col xs={12} lg={4} className="text-center">
          <Link to="/">
            <h4 style={{ color: "white" }}>Обратный звонок</h4>
          </Link>
          <h5 style={{ color: "white" }}>контакты: +996709995922</h5>
          <h5 style={{ color: "white" }}>ТРЦ Дордой Плаза, 2 этаж</h5>
        </Col>
        <Col xs={12} lg={4} className="text-center">
          <h5 style={{ color: "#212529" }}>Follow Us On</h5>
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            <a href="https://www.instagram.com/" style={{ color: "yellow" }}>
              <FiInstagram className="mr-3" />
            </a>
            <a href="https://www.facebook.com/">
              <FiFacebook className="mr-3" />
            </a>
            <a href="https://www.twitch.tv/" style={{ color: "purple" }}>
              <FiTwitch className="mr-3" />
            </a>
            <a href="https://www.youtube.com/" style={{ color: "red" }}>
              <FiYoutube className="mr-3" />
            </a>
            <a href="https://www.twitter.com/" style={{ color: "blue" }}>
              <FiTwitter />
            </a>
          </h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
