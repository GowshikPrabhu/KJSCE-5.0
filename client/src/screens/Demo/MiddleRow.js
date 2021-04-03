import React from "react";
import { Column, Row } from "simple-flexbox";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCloudMoon,
  faShip,
} from "@fortawesome/free-solid-svg-icons";
import LoadingComponent from "components/loading";

const MiddleRow = (props) => {
  const { shipData } = props.data;
  return (
    <>
      <Column flexGrow={2} className="demo__column">
        <div className="demo__container">
          <div className="demo__containerHeader">
            <p style={{ color: "#182C61" }}>
              <FontAwesomeIcon
                icon={faTachometerAlt}
                style={{ marginRight: 10 }}
              />
              Gross Tonnage
            </p>
          </div>
          <center>
            <Loader
              visible={shipData.grossTonnage === undefined}
              type="TailSpin"
              color="#00BFFF"
              height={40}
              width={40}
            />
          </center>
          <p className="demo__cardBigText">
            <span>{shipData.grossTonnage}</span>
          </p>
        </div>
      </Column>
      <Column flexGrow={2} className="demo__column">
        <div className="demo__container">
          <div className="demo__containerHeader">
            <p style={{ color: "#182C61" }}>
              <FontAwesomeIcon icon={faCloudMoon} style={{ marginRight: 10 }} />
              Overall Length & Breadth
            </p>
          </div>
          <p className="demo__cardBigText">
            <center>
              <Loader
                visible={shipData.lengthOverallBreadthExtreme === undefined}
                type="TailSpin"
                color="#00BFFF"
                height={40}
                width={40}
              />
            </center>
            <span>{shipData.lengthOverallBreadthExtreme}</span>
          </p>
        </div>
      </Column>
      <Column flexGrow={2} className="demo__column">
        <div className="demo__container">
          <div className="demo__containerHeader">
            <p style={{ color: "#182C61" }}>
              <FontAwesomeIcon icon={faShip} style={{ marginRight: 10 }} />
              Max Speed / Average Speed
            </p>
          </div>
          <p className="demo__cardBigText">
            <center>
              <Loader
                visible={shipData.maxSpeed === undefined}
                type="TailSpin"
                color="#00BFFF"
                height={40}
                width={40}
              />
            </center>
            <p>
              <span>
                {shipData.maxSpeed}
                {shipData.maxSpeed !== undefined ? " / " : null}
                {shipData.averageSpeed}
              </span>{" "}
            </p>
          </p>
        </div>{" "}
      </Column>
    </>
  );
};
export default MiddleRow;
