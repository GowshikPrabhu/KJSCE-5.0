import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { Row, Column } from "simple-flexbox";
import Chart from "react-apexcharts";
import "react-responsive-modal/styles.css";

const AdvancedModeModal = ({ isOpen, handleClose, data }) => {
  const { weatherData } = data;

  const [heatIndexData] = useState({
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Heat Index (in C)",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [300, 600, 900, 1200, 1500, 1800, 2100],
        title: {
          text: "Time",
        },
      },
      yaxis: {
        title: {
          text: "Temperature",
        },
        min: 5,
        max: 30,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [
      {
        name: "High - 2013",
        data: weatherData.data.weather[0].hourly.map((row) => {
          return parseFloat(row.HeatIndexC);
        }),
      },
    ],
  });
  const [waveHeightData] = useState({
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Wave Height (in M)",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [300, 600, 900, 1200, 1500, 1800, 2100],
        title: {
          text: "Time",
        },
      },
      yaxis: {
        title: {
          text: "Metre",
        },
        min: 0,
        max: 10,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [
      {
        name: "High - 2013",
        data: weatherData.data.weather[0].hourly.map((row) => {
          return parseFloat(row.swellHeight_m);
        }),
      },
    ],
  });
  const [visibilityData] = useState({
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Visibility (KM)",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [300, 600, 900, 1200, 1500, 1800, 2100],
        title: {
          text: "Time",
        },
      },
      yaxis: {
        title: {
          text: "KM",
        },
        min: 0,
        max: 20,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [
      {
        name: "High - 2013",
        data: weatherData.data.weather[0].hourly.map((row) => {
          return parseFloat(row.visibility);
        }),
      },
    ],
  });
  const [pressureData] = useState({
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Pressure (Inches)",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [300, 600, 900, 1200, 1500, 1800, 2100],
        title: {
          text: "Time",
        },
      },
      yaxis: {
        title: {
          text: "Inches",
        },
        min: 0,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [
      {
        name: "High - 2013",
        data: weatherData.data.weather[0].hourly.map((row) => {
          return parseFloat(row.pressureInches);
        }),
      },
    ],
  });

  return (
    <Modal open={isOpen} onClose={handleClose} id="customModal">
      <div className="modal">
        <div className="modal__header">
          <h1>
            <FontAwesomeIcon icon={faLightbulb} style={{ marginRight: 10 }} />
            Weather Conditions of upcoming hours
          </h1>
        </div>

        <div className="modal__content">
          <Row
            flexGrow={1}
            breakpoints={{ 1024: "column" }}
            className="demo__row"
          >
            <Column flexGrow={3}>
              <Chart
                options={heatIndexData.options}
                series={heatIndexData.series}
                type="line"
                height={350}
              />
            </Column>
            <Column flexGrow={7}>
              <Chart
                options={waveHeightData.options}
                series={waveHeightData.series}
                type="line"
                height={350}
              />
            </Column>
          </Row>
          <Row
            flexGrow={1}
            breakpoints={{ 1024: "column" }}
            className="demo__row"
          >
            <Column flexGrow={3}>
              <Chart
                options={visibilityData.options}
                series={visibilityData.series}
                type="line"
                height={350}
              />
            </Column>
            <Column flexGrow={7}>
              <Chart
                options={pressureData.options}
                series={pressureData.series}
                type="line"
                height={350}
              />
            </Column>
          </Row>
        </div>
      </div>
    </Modal>
  );
};
export default AdvancedModeModal;
