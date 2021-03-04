import React from "react";
import { Carousel } from "react-bootstrap";
import "./Style.css";

const Slider = () => {
  return (
    <div>
      <Carousel className="carousel mt-5 mb-5">
        <Carousel.Item interval={1000}>
          <img
            style={{ height: "600px" }}
            className="d-block w-100"
            src="https://preview.colorlib.com/theme/cozastore/images/slide-01.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            style={{ height: "600px" }}
            className="d-block w-100"
            src="https://preview.colorlib.com/theme/cozastore/images/slide-02.jpg"
            alt="Second slide"
          />
        </Carousel.Item>

        <Carousel.Item interval={1000}>
          <img
            style={{ height: "600px" }}
            className="d-block w-100"
            src="https://preview.colorlib.com/theme/cozastore/images/slide-03.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
