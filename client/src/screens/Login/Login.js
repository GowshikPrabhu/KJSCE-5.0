import React, { useState } from "react";
import { userLogin } from "actions/userActions";
import { Row, Column } from "simple-flexbox";
import "./Login.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [formData, setFormData] = useState({
    type: "Other (Normal User)",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleClick = async () => {
    try {
      const query = await userLogin(formData);

      if (query.success) {
        localStorage.setItem("TOKEN", query.payload.token);
        window.location = "/dashboard";
      }
    } catch (err) {
      alert("Failed to login");
    }
  };
  console.log(formData.type);
  return (
    <div>
      <Row vertical="center" horizontal="center">
        <Column style={{ width: "80vh" }}>
          <div
            className="login__container"
            style={{ marginTop: 100, padding: 50 }}
          >
            <div className="login__containerHeader">
              <p style={{ fontSize: 20 }}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: 10 }} />
                Login into your account
              </p>
            </div>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={handleChange}
              className="login__input"
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
              className="login__input"
            />
            <label style={{ color: "#2c3e50", fontSize: 15 }}>
              Account Type :{" "}
            </label>
            <select
              style={{ color: "#2c3e50", fontSize: 15 }}
              defaultValue={formData.type}
              onChange={handleChange}
              name="type"
            >
              <option>Marine Official</option>
              <option>Other (Normal User)</option>
            </select>
            <hr />
            {formData.type === "Marine Official" ? (
              <input
                type="text"
                style={{ marginTop: 10 }}
                placeholder="Official ID"
                name="id"
                onChange={handleChange}
                className="login__input"
              />
            ) : null}
            <button onClick={handleClick} className="login__loginButton">
              Login
            </button>
          </div>
        </Column>
      </Row>
    </div>
  );
};
export default Login;
