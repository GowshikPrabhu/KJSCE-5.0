import React from "react";
import { Column, Row } from "simple-flexbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCloudMoon,
  faShip,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Loader from "react-loader-spinner";

const TopRow = (props) => {
  const {
    speed,
    course,
    distanceToGo,
    windSpeed,
    windDirection,
    windDegree,
  } = props.data;
  return (
    <>
      <Column flexGrow={2} className="demo__column">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="demo__container">
            <div className="demo__containerHeader">
              <p style={{ color: "#182C61" }}>
                <FontAwesomeIcon
                  icon={faTachometerAlt}
                  style={{ marginRight: 10 }}
                />
                Speed / Course
              </p>
            </div>
            <p className="demo__cardBigText">
              <span>{speed}</span> kn <span>/ {course} °</span>
            </p>
          </div>
        </motion.div>
      </Column>
      <Column flexGrow={2} className="demo__column">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="demo__container">
            <div className="demo__containerHeader">
              <p style={{ color: "#182C61" }}>
                <FontAwesomeIcon
                  icon={faCloudMoon}
                  style={{ marginRight: 10 }}
                />
                Wind / Direction
              </p>
            </div>
            <center>
              <Loader
                visible={windDirection === ""}
                type="TailSpin"
                color="#00BFFF"
                height={40}
                width={40}
              />
            </center>
            {windDirection !== "" ? (
              <p className="demo__cardBigText">
                <span>{windSpeed}</span> km{" "}
                <span>
                  / {windDirection} ({windDegree}) °
                </span>
              </p>
            ) : null}
          </div>
        </motion.div>
      </Column>
      <Column flexGrow={2} className="demo__column">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="demo__container">
            <div className="demo__containerHeader">
              <p style={{ color: "#182C61" }}>
                <FontAwesomeIcon icon={faShip} style={{ marginRight: 10 }} />
                Distance To Go
              </p>
            </div>
            <p className="demo__cardBigText">
              <p>
                <span>{distanceToGo}</span> km
              </p>
            </p>
          </div>{" "}
        </motion.div>
      </Column>
    </>
  );
};
export default TopRow;
