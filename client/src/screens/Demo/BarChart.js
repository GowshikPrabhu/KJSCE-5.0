import React, { useState } from "react";
import Chart from "react-apexcharts";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "react-loader-spinner";

const BarChart = (props) => {
  const { weatherData } = props.data;

  const [data, setData] = useState({
    series: [
      {
        name: "Series 1",
        data:
          weatherData.data !== undefined
            ? [
                weatherData.data.weather[0].hourly[0].precipMM,
                weatherData.data.weather[0].hourly[0].cloudcover - 15.3 < 0
                  ? 0
                  : weatherData.data.weather[0].hourly[0].cloudcover - 15.3,
                weatherData.data.weather[0].hourly[0].pressureInches,
                weatherData.data.weather[0].hourly[0].humidity,
                weatherData.data.weather[0].hourly[0].visibility,
              ]
            : [0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: ["#3498db", "#3498db", "#3498db", "#3498db", "#3498db"],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          ["Precipitation", "MM"],
          ["Cloud Cover", "%"],
          ["Pressure", "Inches"],
          ["Humidity", "%"],
          ["Visibility", "%"],
        ],
        labels: {
          style: {
            colors: ["#3498db", "#3498db", "#3498db", "#3498db", "#3498db"],
            fontSize: "12px",
          },
        },
      },
    },
  });
  return (
    <div className="demo__container">
      <div className="demo__containerHeader">
        <p>
          <FontAwesomeIcon icon={faCloud} style={{ marginRight: 10 }} />
          Current Weather Details
        </p>
      </div>
      <center>
        <Loader
          visible={weatherData.data === undefined}
          type="TailSpin"
          color="#00BFFF"
          height={40}
          width={40}
        />
      </center>
      {weatherData.data !== undefined ? (
        <Chart
          options={data.options}
          series={data.series}
          type="bar"
          height={320}
        />
      ) : null}
    </div>
  );
};

export default BarChart;
