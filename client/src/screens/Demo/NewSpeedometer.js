import React, { useState, useContext, useEffect } from "react";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faChartBar,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "context/Context";
import ApexCharts from "apexcharts";

const NewSpeedometer = ({ triggerModal, triggerNewModal }) => {
  const [state] = useContext(Context);
  console.log(state);

  const getData = () => {
    return [state.speedometerValue];
  };

  const [data, setData] = useState({
    series: getData(),
    options: {
      chart: {
        id: "ok",
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "#111",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },

      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Percent"],
    },
  });

  const changeData = () => {
    ApexCharts.exec("ok", "updateSeries", getData());
  };

  useEffect(() => {
    changeData();
  });

  return (
    <div className="demo__container">
      <div className="demo__containerHeader">
        <p>
          <FontAwesomeIcon icon={faChartBar} style={{ marginRight: 10 }} />
          Safety Analyst
          <FontAwesomeIcon icon={faCircle} className="Blinker" />
        </p>{" "}
      </div>
      <Chart
        options={data.options}
        series={data.series}
        type="radialBar"
        height={350}
      />
      <button onClick={triggerModal} className="demo__advancedModeBtn">
        Show future weather data
      </button>
      <button
        onClick={triggerNewModal}
        className="demo__advancedModeBtn"
        style={{ marginLeft: 10, marginBottom: 20 }}
      >
        Show Details
      </button>
      <br />

      <span className="specialText">
        Ship Behaviour :{" "}
        <span
          style={{
            color:
              state.speedometerValue >= 90
                ? "#27ae60"
                : state.speedometerValue >= 80
                ? "#27ae60"
                : state.speedometerValue >= 60
                ? "#e67e22"
                : state.speedometerValue < 50
                ? "#e74c3c"
                : state.speedometerValue < 20
                ? "#c0392b"
                : "Bad",
          }}
        >
          {state.speedometerValue >= 90
            ? "Very Good"
            : state.speedometerValue >= 80
            ? "Good"
            : state.speedometerValue >= 60
            ? "Moderate"
            : state.speedometerValue < 50
            ? "Bad"
            : state.speedometerValue < 20
            ? "Very Bad"
            : "Bad"}
        </span>
      </span>
      {state.changedFieldName !== "" && state.changedFieldName !== undefined ? (
        <>
          <span
            className="specialText"
            style={{
              marginLeft: 25,
              color: state.changedFieldType === "inc" ? "#27ae60" : "#e74c3c",
            }}
          >
            {state.changedFieldName} : {state.changedFieldValue}
            {"%"}
            <FontAwesomeIcon
              icon={state.changedFieldType !== "inc" ? faArrowUp : faArrowDown}
              style={{ marginLeft: 5 }}
            />
          </span>
          <span
            className="specialText"
            style={{
              marginLeft: 25,
              color: state.changedFieldType === "inc" ? "#27ae60" : "#e74c3c",
            }}
          >
            Change in safeness : {state.changedPercentage}%
            <FontAwesomeIcon
              style={{
                color: state.changedFieldType === "inc" ? "#27ae60" : "#e74c3c",
              }}
              icon={state.changedFieldType === "inc" ? faArrowUp : faArrowDown}
              style={{ marginLeft: 5 }}
            />
          </span>
        </>
      ) : null}
    </div>
  );
};
export default NewSpeedometer;
