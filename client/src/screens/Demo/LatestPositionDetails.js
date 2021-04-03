import React from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LatestPositionDetails = (props) => {
  const { latestPosition } = props.data;

  return (
    <div className="demo__container">
      <div className="demo__containerHeader ">
        <p>
          <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: 10 }} />
          Lastest Position
        </p>
      </div>
      <div className="demo__lastestPositionContainer">
        <p>
          Ship Name: <b>{latestPosition.SHIPNAME}</b>
        </p>
        <p>
          Vessel Local Time: <b>{latestPosition.ETA_UPDATED}</b>
        </p>

        <p>
          Current Port:{" "}
          <b>
            {latestPosition.CURRENT_PORT === null
              ? "-"
              : latestPosition.CURRENT_PORT}
          </b>
        </p>
        <p>
          Latitude / Longitude:{" "}
          <b>{latestPosition.LAT + " , " + latestPosition.LON}</b>
        </p>
        <p>
          Destination: <b>{latestPosition.DESTINATION}</b>
        </p>
        <p>
          Next Port Name / Country:{" "}
          <b>
            {latestPosition.NEXT_PORT_NAME +
              " / " +
              latestPosition.NEXT_PORT_COUNTRY}
          </b>
        </p>
      </div>
    </div>
  );
};

export default LatestPositionDetails;
