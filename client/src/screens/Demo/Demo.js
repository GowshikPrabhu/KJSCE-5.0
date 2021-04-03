import React, { useState, useEffect, useContext } from "react";
import { Column, Row } from "simple-flexbox";
import "./Demo.css";
import LineChart from "./LineChart";
import LocationMap from "./LocationMap";
import Speedometer from "./SpeedoMeter";
import Modal from "react-awesome-modal";
import TopRow from "./TopRow";
import SmallDetails from "./SmallDetails";
import LatestPositionDetails from "./LatestPositionDetails";
import PortCalls from "./PortCalls";
import Events from "./Events";
import PastTrack from "./PastTrack";
import TimeSerisChart from "./TimeSerisChart";
import BarChart from "./BarChart";
import MiddleRow from "./MiddleRow";
import AdvancedWeatherReport from "./AdvancedWeatherReport";
import Recommendations from "./Recommendations";
import Pusher from "pusher-js";
import { motion } from "framer-motion";
import {
  getDetailsOfAVessel,
  getMoreDatailsOfAVessel,
  getWeatherDetails,
} from "actions/vesselActions";
import AdvancedModeModal from "./Modal";
import { useAlert } from "react-alert";
import { Context } from "context/Context";
import RadarChart from "./RadarChart";
import NewSpeedometer from "./NewSpeedometer";
import NewModal from "./NewModal";

const Demo = (props) => {
  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const [state, dispatch] = useContext(Context);
  const [shipData, setShipData] = useState({});
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const [isModalOpen, setModal] = useState(false);
  const [moreShipData, setMoreShipData] = useState({
    grossTonnage: randomInteger(22800, 24400),
    shipTypeSpecific:
      "photos.marinetraffic.com/ais/showphoto.aspx?shipid=214006&size=thumb300&stamp=false",
    summerDwt: `${randomInteger(26334, 28444)} t`,
    lengthOverallBreadthExtreme: " 173.7 x 28.03 m",
    maxSpeed: `${randomInteger(12, 15)} knots`,
    averageSpeed: `${randomInteger(8, 11)} knots`,
    windSpeed: `${randomInteger(6, 9)} knots`,
    windDirection: "N (0°)",
    airTemp: `${randomInteger(18, 22)} °C`,
  });
  const [historicalData, setHistoricalData] = useState([
    {
      MMSI: "215912000",
      STATUS: "0",
      SPEED: randomInteger(20, 25),
      LON: "23.086200",
      LAT: "36.417900",
      COURSE: "276",
      HEADING: "284",
      TIMESTAMP: "2021-01-14T06:24:00",
      SHIP_ID: "150733",
    },
    {
      MMSI: "215912000",
      STATUS: "0",
      SPEED: randomInteger(20, 25),
      LON: "20.022100",
      LAT: "38.469150",
      COURSE: "330",
      HEADING: "330",
      TIMESTAMP: "2021-01-15T00:28:00",
      SHIP_ID: "150733",
    },
    {
      MMSI: "215912000",
      STATUS: "0",
      SPEED: randomInteger(20, 25),
      LON: "16.230670",
      LAT: "41.992940",
      COURSE: "294",
      HEADING: "300",
      TIMESTAMP: "2021-01-16T00:44:00",
      SHIP_ID: "150733",
    },
    {
      MMSI: "215912000",
      STATUS: "0",
      SPEED: randomInteger(20, 25),
      LON: "17.930670",
      LAT: "42.292940",
      COURSE: "294",
      HEADING: "300",
      TIMESTAMP: "2021-01-16T00:44:00",
      SHIP_ID: "150733",
    },
    {
      MMSI: "215912000",
      STATUS: "0",
      SPEED: randomInteger(20, 25),
      LON: "18.130670",
      LAT: "43.392940",
      COURSE: "294",
      HEADING: "300",
      TIMESTAMP: "2021-01-16T00:44:00",
      SHIP_ID: "150733",
    },
  ]);
  const [weatherData, setWeatherData] = useState({});
  const [showContent, setShowContent] = useState(false);
  const [lastYPos, setLastYPos] = useState(0);

  const alert = useAlert();

  useEffect(() => {
    const fetchShipData = async () => {
      const mmsi = props.match.params.mmsi || "240903000";
      const getShipData = await getDetailsOfAVessel(mmsi);
      setShipData(getShipData);
    };

    const fetchMoreData = async () => {
      const mmsi = props.match.params.mmsi || "240903000";
      const getShipData = await getMoreDatailsOfAVessel(mmsi);
      setMoreShipData(getShipData);
    };

    const fetchWeatherData = async () => {
      const getWeatherData = await getWeatherDetails(
        props.match.params.lat,
        props.match.params.lon
      );
      setWeatherData(getWeatherData);
    };

    const initializePusher = async () => {
      // Intialize pusher for real time changes
      const pusher = new Pusher("c55c11964c6fa4b839b9", {
        cluster: "ap2",
      });

      const channel = pusher.subscribe("alerts");
      // For a new chat
      channel.bind("push", (data) => {
        // dec the needle value
        dispatch({
          type: "SPEEDOMETER",
          payload: {
            val: data.val,
            type: data.type,
            fieldKey: data.fieldKey,
            fieldValue: data.fieldValue,
          },
        });
        if (data.type === "danger") {
          alert.error(data.message);
        } else {
          alert.show(data.message);
        }
      });
    };

    fetchShipData();
    fetchWeatherData();
    initializePusher();
    // fetchMoreData();

    // alert.error("The pressure is increasing...");
    // alert.error("You are in a danger prone zone");
  }, []);

  console.log(shipData);

  if (shipData.fullData !== undefined) {
    return (
      <div style={{ marginTop: -20 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Modal */}
          <NewModal
            isOpen={isNewModalOpen}
            handleClose={() => {
              setNewModalOpen(false);
            }}
            data={moreShipData}
            distanceToGo={shipData.fullData.DISTANCE_TO_GO}
          />

          <AdvancedModeModal
            isOpen={isModalOpen}
            data={{ weatherData: weatherData }}
            handleClose={() => setModal(false)}
          />

          <Row style={{ justifyContent: "space-between" }}>
            <SmallDetails
              data={{
                shipName: shipData.fullData.SHIPNAME,
                summerDwt: moreShipData.summerDwt,
                location: {
                  lat: shipData.fullData.LAT,
                  lon: shipData.fullData.LON,
                },
              }}
            />
          </Row>
        </motion.div>

        <Row
          flexGrow={1}
          breakpoints={{ 1024: "column" }}
          className="demo__row"
        >
          <TopRow
            data={{
              speed: shipData.fullData.SPEED,
              course: shipData.fullData.COURSE,
              distanceToGo: shipData.fullData.DISTANCE_TO_GO,
              windSpeed:
                weatherData.data !== undefined
                  ? weatherData.data.weather[0].hourly[0].windspeedKmph
                  : "",
              windDegree:
                weatherData.data !== undefined
                  ? weatherData.data.weather[0].hourly[0].winddirDegree
                  : "",
              windDirection:
                weatherData.data !== undefined
                  ? weatherData.data.weather[0].hourly[0].winddir16Point
                  : "",
            }}
          />
        </Row>

        {state.user.type === "Marine Official" ? (
          <>
            <Row flexGrow={1} breakpoints={{ 1024: "column" }}>
              <Column flexGrow={1} className="demo__column">
                <motion.div
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <NewSpeedometer
                    triggerModal={() => setModal(true)}
                    triggerNewModal={() => setNewModalOpen(true)}
                  />
                  {/* <Speedometer triggerModal={() => setModal(true)} /> */}
                </motion.div>
              </Column>

              <Column flexGrow={5} className="demo__column">
                {/* <LocationMap /> */}
                {/* <motion.div
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <AdvancedWeatherReport data={{ weatherData: weatherData }} />
                </motion.div> */}
                <RadarChart />
              </Column>
            </Row>

            <Row
              flexGrow={1}
              breakpoints={{ 1024: "column" }}
              className="demo__row"
            >
              <Column flexGrow={3} className="demo__column">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <BarChart data={{ weatherData: weatherData }} />
                </motion.div>
                {/* <PortCalls /> */}
              </Column>

              <Column flexGrow={7} className="demo__column">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AdvancedWeatherReport data={{ weatherData: weatherData }} />
                </motion.div>
              </Column>
            </Row>
          </>
        ) : null}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Row
            flexGrow={1}
            breakpoints={{ 1024: "column" }}
            className="demo__row"
          >
            <MiddleRow data={{ shipData: moreShipData }} />
          </Row>
        </motion.div>

        <Row
          flexGrow={1}
          breakpoints={{ 1024: "column" }}
          className="demo__row"
        >
          <Column flexGrow={3} className="demo__column">
            <LatestPositionDetails
              data={{ latestPosition: shipData.fullData }}
            />
          </Column>

          <Column flexGrow={7} className="demo__column">
            <LocationMap
              data={{ lat: shipData.fullData.LAT, lon: shipData.fullData.LON }}
            />
          </Column>
        </Row>

        {state.user.type === "Marine Official" ? (
          <Row
            flexGrow={1}
            breakpoints={{ 1024: "column" }}
            className="demo__row"
          >
            <Column flexGrow={5} className="demo__column">
              <TimeSerisChart />
            </Column>
            <Column flexGrow={5} className="demo__column">
              {/* <Recommendations /> */}
              <PastTrack data={{ historicalTrackData: historicalData }} />
            </Column>
          </Row>
        ) : null}
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default Demo;
