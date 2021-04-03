import React from "react";
import { Column } from "simple-flexbox";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShip, faWeight } from "@fortawesome/free-solid-svg-icons";

const SmallDetails = (props) => {
  const { shipName, summerDwt, location } = props.data;
  return (
    <>
      <Column>
        <b className="demo__smallBlueText">
          <FontAwesomeIcon icon={faShip} style={{ marginRight: 10 }} />
          {shipName + " (" + location.lat + "," + location.lon + ")"}
        </b>
      </Column>
      <Column style={{ marginRight: 20 }}>
        <p className="demo__smallBlueText">
          <FontAwesomeIcon icon={faWeight} style={{ marginRight: 10 }} />
          Current Capacity -{" "}
          <b>
            {summerDwt !== undefined ? (
              summerDwt
            ) : (
              <Loader
                type="TailSpin"
                color="#00BFFF"
                height={20}
                width={20}
                style={{ display: "inline-block" }}
              />
            )}
          </b>
        </p>
      </Column>
    </>
  );
};

export default SmallDetails;
