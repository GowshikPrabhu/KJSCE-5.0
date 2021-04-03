import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faCircle } from "@fortawesome/free-solid-svg-icons";

const LineChart = (props) => {
  const { historicalTrackData } = props.data;
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = [];
    historicalTrackData.map((row) => {
      data.push(row.SPEED);
    });

    setData(data);
  }, []);

  return (
    <div className="demo__container">
      <div className="demo__containerHeader">
        <p>
          <FontAwesomeIcon icon={faChartBar} style={{ marginRight: 10 }} />
          Speed Chart
        </p>
      </div>
      <Chart
        options={{
          chart: {
            id: "apexchart-example",
          },
          xaxis: {
            categories: [],
          },
        }}
        series={[
          {
            name: "series-1",
            data: data,
          },
        ]}
        type="line"
        width={500}
        height={287}
      />
    </div>
  );
};
export default LineChart;
