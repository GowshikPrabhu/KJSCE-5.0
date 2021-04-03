const prod = {
  BASE_URL: "",
  MARINE_TRAFFIC_API_KEY: "d3bac0ad60374ff187efe6edf7fec4ed3b02b22a",
  WEATHER_API_KEY: "847f37e864ac446982e185912212101",
};
const dev = {
  BASE_URL: "http://localhost:5000",
  MARINE_TRAFFIC_API_KEY: "d3bac0ad60374ff187efe6edf7fec4ed3b02b22a",
  WEATHER_API_KEY: "847f37e864ac446982e185912212101",
};

export default process.env.NODE_ENV === "development" ? dev : prod;
