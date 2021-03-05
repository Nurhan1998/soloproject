import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import NaviBar from "../../components/NaviBar";
import { cartContext } from "../../contexts/CartContext/CartContext";

const Purchases = () => {
  const { purchases, getPurchases } = useContext(cartContext);

  useEffect(() => {
    getPurchases();
  }, []);

  return (
    <>
      <NaviBar />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {purchases?.map((elem, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{elem.name}</td>
              <td>{elem.price}</td>
              <td style={{ width: "350px" }}>
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={elem.image}
                />
                <span style={{ color: "#C26401" }}>уже купили</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Purchases;
