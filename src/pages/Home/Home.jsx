import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import NaviBar from "../../components/NaviBar";
import SecondSection from "../../components/SecondSection";
import Section from "../../components/Section";
import Slider from "../../components/Slider";
import "./Home.css";

const Home = () => {
  return (
    <>
      <NaviBar />
      <div className="main_header">
        <div className="main_header_content">
          <h2>Акции и Распродажи</h2>
          <h3 className="mt-3">Большая коллекция товаров</h3>
          <Link to="/list">
            <h4
              style={{
                textDecoration: "none",
                color: "white",
                marginTop: "10px",
              }}
            >
              к каталогу
            </h4>
          </Link>
        </div>
      </div>
      <div>
        <Section />
        <SecondSection />
        <Slider />
        <Footer />
      </div>
    </>
  );
};

export default Home;
