import React from "react";

const PastTrack = (props) => {
  const { historicalTrackData } = props.data;
  return (
    <div className="demo__container">
      <div className="demo__containerHeader">
        <p>Past Track of the vessel</p>
      </div>
      <div className="demo__tableContainer">
        <table>
          <tr>
            <th>Speed</th>
            <th>Course</th>
            <th>Heading</th>
            <th>Lat / Lon</th>
          </tr>
          {historicalTrackData.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.SPEED}</td>
                <td>{row.COURSE}</td>
                <td>{row.HEADING}</td>
                <td>{row.LAT + ", " + row.LON}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
export default PastTrack;
