import React from "react";
import { Column, Row } from "simple-flexbox";
import "../Demo/Demo.css";

const Home = () => {
  return (
    <div>
      <Row vertical="center" horizontal="center">
        <Column style={{ width: "50%" }}>
          <div
            className="demo__container"
            style={{ padding: 20, paddingLeft: 25, paddingRight: 25 }}
          >
            <div className="demo__containerHeader">
              <p>Get Started</p>
            </div>
            <input
              style={{
                border: "1px solid #666",
                padding: 8,
                width: "90%",
                borderRight: "none",

                outline: "none",
                fontSize: 15,
              }}
              type="text"
              placeholder="Enter the MMSI number of the vessel"
            />
            <button
              style={{
                padding: 8,
                fontSize: 15,
                border: "1px solid  #2980b9",
                backgroundColor: "#2980b9",
                color: "#fff",
              }}
            >
              Go
            </button>
            <center>
              {" "}
              <p
                style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold" }}
              >
                OR
              </p>
              <a
                href="/search"
                style={{
                  backgroundColor: "#27ae60",
                  border: "none",
                  borderRadius: 8,
                  marginTop: 10,
                  outline: "none",
                  padding: 10,
                  cursor: "pointer",
                  fontSize: 15,
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Get vessels list
              </a>
            </center>
          </div>
        </Column>{" "}
      </Row>
    </div>
  );
};
export default Home;
