import axios from "axios";

export const userLogin = async (formData) => {
  const res = await axios.post(
    "http://localhost:8000/api/v1/user/login",
    formData
  );

  return res.data;
};

export const getUserData = async () => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  };
  const res = await axios.get("http://localhost:8000/api/v1/user/me", config);

  return res.data;
};

export const addToFav = async (data) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  };
  const res = await axios.post(
    "http://localhost:8000/api/v1/user/addShip",
    data,
    config
  );

  return res.data;
};
