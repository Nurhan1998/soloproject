import React, { useContext, useState, useEffect } from "react";
import { Button, Container, FormControl, Image } from "react-bootstrap";
import { authContext } from "../../contexts/AuthContext/AuthContext";

const Register = () => {
  const { addUser, getUsers } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const handleClickAddUser = () => {
    if (!email || !password || !confirm) {
      setEmail("");
      setPassword("");
      setConfirm("");
      return alert("заполните все поля");
    } else if (password === confirm) {
      let newUser = {
        email,
        password,
        favorites: [],
      };

      addUser(newUser);
      setEmail("");
      setPassword("");
      setConfirm("");
    } else {
      setPassword("");
      setConfirm("");
      return alert("неправильно ввели пароль");
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
        <div style={{ backgroundColor: "black" }}>
          <h3 style={{ color: "gray" }} className="text-center">
            Superior
          </h3>
          <Image
            src="https://thumbs.dreamstime.com/b/vintage-denim-jeans-frame-logo-classical-clothing-line-label-great-retro-badge-shop-more-78791983.jpg"
            fluid
          />
        </div>
        <FormControl
          className="mt-1"
          value={email}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl
          className="mt-1"
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControl
          className="mt-1"
          value={confirm}
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirm(e.target.value)}
        />
        <Button onClick={handleClickAddUser} size="lg" block className="mt-3">
          Sign Up
        </Button>
      </Container>
    </div>
  );
};

export default Register;
