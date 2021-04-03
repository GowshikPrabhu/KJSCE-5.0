import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeight, faPercentage } from "@fortawesome/free-solid-svg-icons";

const TimeSerisChart = () => {
  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomData = () => {
    var originalData = [];
    var predictedData = [];
    for (var i = 0; i < 80; i++) {
      const xValue = i;
      const yValue = randomInteger(0, 15);
      const newPair = { x: xValue, y: yValue };
      const newPairWithIncreasedValue = {
        x: xValue,
        y: yValue + randomInteger(0, 2),
      };

      originalData.push(newPair);
      predictedData.push(newPairWithIncreasedValue);
    }
    return originalData;
  };

  const [data, setData] = useState({
    series: [
      {
        name: "Predicted Data",
        data: generateRandomData(),
      },
      {
        name: "Original Data",
        data: generateRandomData(),
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: "  ",
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
        title: {
          text: "  ",
        },
      },
      xaxis: {
        labels: {
          show: false,
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
      },
    },
  });

  console.log(data);

  useEffect(() => {
    // generateRandomData();
  }, []);

  return (
    <div className="demo__container">
      <div className="demo__containerHeader">
        <p>
          <FontAwesomeIcon icon={faPercentage} style={{ marginRight: 10 }} />
          Predicted Values
        </p>
      </div>
      <Chart
        options={data.options}
        series={data.series}
        type="area"
        width={500}
        height={320}
      />
    </div>
  );
};

export default TimeSerisChart;
