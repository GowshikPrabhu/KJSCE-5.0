import React from "react";
import { Modal } from "react-responsive-modal";
import "./NewModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-modal/styles.css";

const NewModal = ({ isOpen, handleClose, data, distanceToGo }) => {
  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="modal">
        <div className="modal__header">
          <h1>
            <FontAwesomeIcon icon={faLightbulb} style={{ marginRight: 10 }} />
            More Details
          </h1>
        </div>
        <div className="modal__content">
          <p>
            Estimated Efficieny :{" "}
            <b>
              {randomInteger(90, 93)}
              {"%"}
            </b>
          </p>
          <p>
            Observed Speed : <b>{data.averageSpeed} </b>
          </p>
          <p>
            Expected Speed : <b>{randomInteger(11, 15)} knots</b>
          </p>

          <p>
            Carbon Factor: <b>670 g/kWh</b>
          </p>
          <p>
            Cargo:{" "}
            <b>
              {data.grossTonnage} {"tons"}
            </b>
          </p>
          <p>
            Remaining Distance:{" "}
            <b>
              {distanceToGo}
              {" km"}
            </b>
          </p>
          <p>
            Class of the ship:{" "}
            <b>
              {data.grossTonnage >= 10000 && data.grossTonnage <= 25000
                ? "General Purpose Tanker"
                : data.grossTonnage > 25000 && data.grossTonnage <= 45000
                ? "Medium Range Tanker"
                : data.grossTonnage > 45000 && data.grossTonnage < 80000
                ? "LR1 (Long Range 1)"
                : data.grossTonnage > 80000 && data.grossTonnage < 159000
                ? "LR2 (Long Range 2)"
                : data.grossTonnage > 1600000 && data.grossTonnage < 3190000
                ? "VLCC"
                : "ULCC"}
            </b>
          </p>
          {/* <p>
            Basal cutoff level: <b>3200</b>
          </p> */}
        </div>
      </div>
    </Modal>
  );
};
export default NewModal;
