import React, { useEffect, useState, useContext } from "react";
import Chart from "react-apexcharts";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "react-loader-spinner";
import { Context } from "context/Context";
import ApexCharts from "apexcharts";

const AdvancedWeatherDetails = (props) => {
  const { weatherData } = props.data;
  const [state] = useContext(Context);
  const { additionalData } = state;

  const getColors = () => {
    return [
      additionalData.temp > 0 ? "#c0392b" : "#3498db",
      additionalData.heatIndex > 0 ? "#c0392b" : "#3498db",
      additionalData.waveHeight > 0 ? "#c0392b" : "#3498db",
      additionalData.waveDuration > 0 ? "#c0392b" : "#3498db",
      additionalData.waterTemp > 0 ? "#c0392b" : "#3498db",
    ];
  };

  const getData = () => {
    const res =
      weatherData.data !== undefined
        ? [
            parseInt(weatherData.data.weather[0].hourly[0].tempC) +
              additionalData.temp,
            parseInt(weatherData.data.weather[0].hourly[0].HeatIndexC) +
              additionalData.heatIndex,
            parseInt(weatherData.data.weather[0].hourly[0].swellHeight_m) +
              additionalData.waveHeight,
            parseInt(weatherData.data.weather[0].hourly[0].swellPeriod_secs) +
              additionalData.waveDuration,
            parseInt(weatherData.data.weather[0].hourly[0].waterTemp_C) +
              additionalData.waterTemp,
          ]
        : [0, 0, 0, 0, 0];
    return res;
  };

  const [data, setData] = useState({
    series: [
      {
        name: "Series 1",
        data: getData(),
      },
    ],
    options: {
      chart: {
        id: "gg",
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: getColors(),
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
          ["Temp", "C"],
          ["Heat ", "Index C"],
          ["Wave ", "Height M"],
          ["Wave ", "Duration S"],
          ["Water  ", "Temp C"],
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

  const click = () => {
    const tempState = data;
    tempState.series[0].data[2] = 300;
    setData(tempState);
  };

  const changeData = () => {
    ApexCharts.exec("gg", "updateSeries", [
      {
        data: getData(),
      },
    ]);
    ApexCharts.exec("gg", "updateOptions", {
      colors: getColors(),
    });
  };

  useEffect(() => {
    changeData();
  });

  console.log(data);
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

export default AdvancedWeatherDetails;
