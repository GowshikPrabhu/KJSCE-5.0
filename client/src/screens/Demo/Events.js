import React from "react";

const Events = () => {
  return (
    <div className="demo__container">
      <div className="demo__containerHeader">
        <p>Events</p>
      </div>
      <div className="demo__tableContainer">
        <table>
          <tr>
            <th>Event Type</th>
            <th>Content</th>
            <th>Time</th>
          </tr>
          <tr>
            <td>In Terrestrial Range </td>
            <td>At N 14° 15' 42.19" - E 073° 29' 52.47"</td>
            <td>2021-01-19 13:09 LT (UTC +5)</td>
          </tr>
          <tr>
            <td>Noon position </td>
            <td>At N 13° 55' 00.86" - E 073° 39' 02.91""</td>
            <td>2021-01-19 11:27 LT (UTC +5)</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default Events;
