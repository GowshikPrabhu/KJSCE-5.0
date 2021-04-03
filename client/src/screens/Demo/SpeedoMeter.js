import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faCircle } from "@fortawesome/free-solid-svg-icons";
import ReactSpeedometer from "react-d3-speedometer";
import { Context } from "context/Context";

const Speedometer = ({ triggerModal }) => {
  const [state] = useContext(Context);
  const { speedometerValue } = state;

  return (
    <div className="demo__container">
      <div className="demo__containerHeader">
        <p>
          <FontAwesomeIcon icon={faChartBar} style={{ marginRight: 10 }} />
          Probability Meter
          <FontAwesomeIcon icon={faCircle} className="Blinker" />
        </p>
      </div>
      <center>
        <ReactSpeedometer
          width={400}
          needleHeightRatio={0.8}
          value={speedometerValue}
          currentValueText="   "
          customSegmentLabels={[
            {
              position: "INSIDE",
              color: "#555",
            },
            {
              position: "INSIDE",
              color: "#555",
            },
            {
              position: "INSIDE",
              color: "#555",
              fontSize: "19px",
            },
            {
              position: "INSIDE",
              color: "#555",
            },
            {
              position: "INSIDE",
              color: "#555",
            },
          ]}
          ringWidth={47}
          needleTransitionDuration={3333}
          needleTransition="easeElastic"
          needleColor={"#2c3e50"}
          textColor={"#d8dee9"}
        />
        <button className="demo__advancedModeBtn" onClick={triggerModal}>
          Show future weather data
        </button>
      </center>
    </div>
  );
};
export default Speedometer;
