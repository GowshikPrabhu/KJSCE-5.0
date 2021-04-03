import React, { useState } from "react";
import "./Demo.css";
import Chart from "react-apexcharts";

const RadarChart = () => {
  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [data, setData] = useState({
    series: [
      {
        name: "Series 1",
        data: [
          randomInteger(20, 30),
          randomInteger(30, 38),
          randomInteger(20, 30),
          randomInteger(20, 30),
          randomInteger(20, 30),
          randomInteger(30, 40),
          randomInteger(30, 40),
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColors: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"],
            },
          },
        },
      },
      title: {
        text: "  ",
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColor: "#FF4560",
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      xaxis: {
        categories: [
          "Speed",
          "Wave Height",
          "Temperature",
          "Heat Index",
          "Pressure",
          "Humidity",
          "Visibility",
        ],
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: function (val, i) {
            if (i % 2 === 0) {
              return val;
            } else {
              return "";
            }
          },
        },
      },
    },
  });
  return (
    <>
      <div className="demo__container">
        <div className="demo__containerHeader">
          <p>Advanced Results</p>
        </div>
        <Chart
          options={data.options}
          series={data.series}
          type="radar"
          height={290}
        />
      </div>
    </>
  );
};
export default RadarChart;
