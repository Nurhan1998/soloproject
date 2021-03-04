import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext/AuthContext";
import { Button, Container, Form, Image } from "react-bootstrap";

const Login = () => {
  const { users, getUsers } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  const handleLogin = () => {
    let logs = {
      email,
      password,
    };
    const candidate = users.filter((item) => {
      if (item.email === logs.email && item.password === logs.password) {
        return item;
      }
    });
    if (candidate.length) {
      if (candidate[0].email === "admin" && candidate[0].password === "admin") {
        localStorage.setItem("role", "true");
      }
      localStorage.setItem("user", email);

      history.push("/");
    } else {
      alert("такого пользователя не существует, просьба зарегистрироваться");
    }
  };
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
          margin: "120px auto",
        }}
      >
        <div style={{ backgroundColor: "black" }} className="text-center">
          <h3 style={{ color: "gray" }} className="text-center">
            Superior
          </h3>
          <Image
            src="https://thumbs.dreamstime.com/b/vintage-denim-jeans-frame-logo-classical-clothing-line-label-great-retro-badge-shop-more-78791983.jpg"
            fluid
          />
        </div>
        <p style={{ color: "whitesmoke" }}>
          Зарегистрируйтесь чтобы получить скидку в 10 % на все позиции
        </p>
        <Form.Control
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Control
          className="mt-1"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={() => handleLogin()}
          variant="outline-primary"
          size="lg"
          block
          className="mt-3"
        >
          GO!
        </Button>
        <Button onClick={() => history.push("/register")} size="lg" block>
          Create new account
        </Button>
      </Container>
    </div>
  );
};

export default Login;
