import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const LocationMap = (props) => {
  const { lat, lon } = props.data;
  return (
    <div>
      <div className="demo__container">
        <MapContainer
          style={{
            height: "235px",
          }}
          center={[lat, lon]}
          zoom={4}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[lat, lon]}>
            <Popup>{lat + ", " + lon}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
export default LocationMap;
