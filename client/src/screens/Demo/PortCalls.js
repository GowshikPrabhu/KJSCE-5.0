import React from "react";

const PortCalls = () => {
  return (
    <div className="demo__container">
      <div className="demo__containerHeader">
        <p>Port Calls</p>
      </div>
      <div className="demo__tableContainer">
        <table>
          <tr>
            <th>Port</th>
            <th>Arrival</th>
            <th>Departure</th>
          </tr>
          <tr>
            <td> COCHIN ANCH (Anchorage) </td>
            <td>2021-01-14 07:46 LT (UTC +5.5)</td>
            <td>2021-01-14 07:46 LT (UTC +5.5)</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default PortCalls;
