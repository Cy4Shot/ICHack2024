import React, { useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { customers } from "../customers";
import HeatMap from "../components/HeatMap";
import { rent } from "../rent";
import { tube } from "../tube";
import "./../style/inputbox.css";
import "./../style/dashboard.scss";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { stream } from "../App";

// Function to calculate the distance between two points using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

// Function to find the closest point in the list to a given latitude and longitude
function findClosestNPoints(latitude, longitude, points, N) {
  let closestPoints = [];

  // Calculate distances to all points
  const distances = points.map((point) => ({
    point,
    distance: calculateDistance(
      latitude,
      longitude,
      point.latitude,
      point.longitude
    ),
  }));

  // Sort distances in ascending order
  distances.sort((a, b) => a.distance - b.distance);

  // Select the N closest points
  for (let i = 0; i < Math.min(N, points.length); i++) {
    closestPoints.push(distances[i].point);
  }

  return closestPoints;
}

const tabs = [
  {
    name: "Customers Potential",
    data: () =>
      customers.map((point) => ({
        location: new window.google.maps.LatLng(
          point.latitude,
          point.longitude
        ),
        weight: point.value,
      })),
    radius: 20,
  },
  {
    name: "Rent Pricing",
    data: () =>
      rent.map((point) => ({
        location: new window.google.maps.LatLng(
          parseFloat(point.latitude),
          parseFloat(point.longitude)
        ),
        weight: parseFloat(point.fas) / 1000000,
      })),
    radius: 200,
  },
  {
    name: "Public Transport",
    data: () =>
      tube.map((point) => ({
        location: new window.google.maps.LatLng(
          parseFloat(point.latitude),
          parseFloat(point.longitude)
        ),
        weight: 0.5,
      })),
    radius: 20,
  },
];

const HeatmapItem = ({ id, title, toggle, def, c, ocp }) => {
  return (
    <div className="is-flex is-justify-content-space-between">
      <div className="field">
        <input
          id={"checkbox-" + id}
          type="checkbox"
          className="switch is-primary is-medium"
          defaultChecked={def}
        />
        <label htmlFor="switchExample" onClick={toggle}>
          {title}
        </label>
      </div>
      <label for="seed-color">
        <input
          className="color"
          type="color"
          id="seed-color"
          name="seed-color"
          value={
            "#" +
            c.r.toString(16).padStart(2, "0") +
            c.g.toString(16).padStart(2, "0") +
            c.b.toString(16).padStart(2, "0")
          }
          style={{
            height: "80%",
          }}
          onChange={ocp}
        />
      </label>
    </div>
  );
};

const libraries = ["places", "visualization"];
const Dashboard = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAQhd3g8LLCJnLJhnvRorbhxYfZVvl8O0Q",
    libraries,
  });

  const [center, setCenter] = React.useState({
    lat: 51.514306871224186,
    lng: -0.10702268205902332,
  });
  const [zoom, setZoom] = React.useState(13);
  const [active, setActive] = React.useState(tabs.map((_) => false));
  const [colors, setColors] = React.useState([
    { r: 255, g: 0, b: 0 },
    { r: 0, g: 255, b: 0 },
    { r: 0, g: 0, b: 255 },
  ]);
  const [location, _setLocation] = React.useState({
    placed: false,
  });
  const [profitabilityIndex, setProfitabilityIndex] = React.useState(0);
  const [accessibilityIndex, setAccessibilityIndex] = React.useState(0);

  const [showModal, setShowModal] = React.useState(false);
  const [summary, setSummary] = React.useState("");
  const [summaryGenerated, setSummaryGenerated] = React.useState(false);

  function setLocation(loc) {
    var closest = findClosestNPoints(loc.lat, loc.lng, customers, 5);
    var consumer =
      (closest.reduce((a, b) => a + b.value, 0) / closest.length) * 365.25;
    var pi =
      (consumer * (userdata.price - userdata.manufacture)) /
      (Math.pow(1 + 0.0525, userdata.time) * userdata.invest);
    setProfitabilityIndex(pi);

    var closestTubes = findClosestNPoints(loc.lat, loc.lng, tube, 1);
    var distance = calculateDistance(
      loc.lat,
      loc.lng,
      closestTubes[0].latitude,
      closestTubes[0].longitude
    );

    var closestBorough = findClosestNPoints(loc.lat, loc.lng, rent, 1);
    var r = closestBorough[0].avg;
    console.log(r);

    _setLocation({
      ...loc,
      tube: closestTubes[0].tube,
      competitor: closest[0].name,
      dcompetitor: calculateDistance(
        loc.lat,
        loc.lng,
        closest[0].latitude,
        closest[0].longitude
      ),
      rent: r,
    });
    var ai = Math.pow(0.1 / distance, 0.5);
    ai = Math.min(1, Math.max(0, ai));
    setAccessibilityIndex(ai);
  }

  const [rerenderKey, setRerenderKey] = React.useState(Date.now());
  const [userdata, setUserdata] = React.useState({});

  useEffect(() => {
    setUserdata(JSON.parse(localStorage.getItem("user_data")));
  }, []);

  const data = () => tabs.map((tab, i) => (active[i] ? tab.data() : []));

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <>
      <div class={"modal" + (showModal ? " is-active" : "")}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">AI-Powered Summary</p>
            <button
              class="delete"
              aria-label="close"
              onClick={() => {
                setShowModal(false);
              }}
            ></button>
          </header>
          <section class="modal-card-body">
            {summaryGenerated ? (
              <div class="content">{summary}</div>
            ) : (
              <div class="content is-flex is-flex-direction-column">
                <div className="is-flex is-justify-content-center is-text-align-center">
                  <h1 class="title">Loading...</h1>
                </div>
                <progress
                  class="progress is-large"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #f76b52 30%, #ededed 30%)",
                  }}
                  max="100"
                >
                  60%
                </progress>
              </div>
            )}
          </section>
          <footer class="modal-card-foot is-flex is-justify-content-right">
            <button
              class="button"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Close
            </button>
          </footer>
        </div>
      </div>
      <div className="columns">
        <div className="column is-two-thirds">
          <HeatMap
            center={center}
            zoom={zoom}
            key={rerenderKey}
            data={data}
            radii={tabs.map((tab) => tab.radius)}
            c={colors}
            draw={location.placed}
            markers={location ? [location] : []}
            setCenter={setCenter}
            setZoom={setZoom}
            oc={(lat, lng) => {
              setLocation({
                name: userdata.name,
                score: 0,
                lat: lat,
                lng: lng,
                placed: true,
              });
              setRerenderKey(Date.now());
            }}
          />
        </div>
        <div className="column">
          <div
            style={{
              display: !location.placed ? "block" : "none",
              position: "relative",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              textAlign: "center",
              fontSize: "3em",
              textShadow: "0 0 20px white",
              color: "black",
            }}
          >
            Place the Branch
          </div>
          <section
            className="section"
            style={{
              opacity: !location.placed ? 0.1 : 1,
            }}
          >
            <h1 className="title">Active Heatmaps</h1>
            <div className="list-item box">
              <div className="list-item-content">
                {tabs.map((tab, i) => (
                  <HeatmapItem
                    key={i + rerenderKey}
                    id={i}
                    title={tab.name}
                    toggle={() => {
                      const newActive = active.slice();
                      newActive[i] = !newActive[i];
                      setActive(newActive);
                      setRerenderKey(Date.now());
                    }}
                    def={active[i]}
                    c={colors[i]}
                    ocp={(e) => {
                      const newColors = colors.slice();
                      newColors[i] = {
                        r: parseInt(e.target.value.slice(1, 3), 16),
                        g: parseInt(e.target.value.slice(3, 5), 16),
                        b: parseInt(e.target.value.slice(5, 7), 16),
                      };
                      setColors(newColors);
                    }}
                  />
                ))}
              </div>
            </div>
            <section className="section">
              <CircularProgressbarWithChildren
                value={Math.sqrt(profitabilityIndex) * 50}
                circleRatio={0.5}
                styles={{
                  path: {
                    stroke: "#123342",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    transform: "rotate(-0.25turn)",
                    transformOrigin: "center center",
                  },
                  trail: {
                    stroke: "#d6d6d6",
                    strokeLinecap: "butt",
                    transform: "rotate(-0.25turn)",
                    transformOrigin: "center center",
                  },
                }}
              >
                <div>
                  <h1
                    className="title"
                    style={{
                      fontSize: "3em",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -100%)",
                      alignItems: "center",
                      alignContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <strong>
                      {Math.round(profitabilityIndex * 1000) / 1000}
                      <br />
                      <small
                        style={{
                          fontSize: "0.5em",
                        }}
                      >
                        Profitability Index
                      </small>
                    </strong>
                  </h1>
                </div>
              </CircularProgressbarWithChildren>

              <CircularProgressbarWithChildren
                value={accessibilityIndex}
                maxValue={1}
                circleRatio={0.5}
                styles={{
                  root: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -25%)",
                  },
                  path: {
                    stroke: "#123342",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    transform: "rotate(-0.25turn)",
                    transformOrigin: "center center",
                  },
                  trail: {
                    stroke: "#d6d6d6",
                    strokeLinecap: "butt",
                    transform: "rotate(-0.25turn)",
                    transformOrigin: "center center",
                  },
                }}
              >
                <div>
                  <h1
                    className="title"
                    style={{
                      fontSize: "3em",
                      position: "absolute",
                      bottom: "50%",
                      left: "50%",
                      transform: "translate(-50%, 450%)",
                      alignItems: "center",
                      alignContent: "center",
                      textAlign: "center",
                      width: "110%",
                    }}
                  >
                    <strong>
                      {Math.round(accessibilityIndex * 1000) / 1000}
                      <br />
                      <small
                        style={{
                          fontSize: "0.5em",
                        }}
                      >
                        Accessibility Index
                      </small>
                    </strong>
                  </h1>
                </div>
              </CircularProgressbarWithChildren>
            </section>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="buttons is-flex is-justify-content-center">
              <button
                className="button is-primary is-large"
                onClick={() => {
                  setShowModal(true);
                  (async () => {
                    const res = await stream(
                      `Write a summary telling the owner of the business opportunity for a new branch of ${
                        location.name
                      }. It has a profitability index of ${profitabilityIndex.toFixed(
                        3
                      )} and an accessibility index of ${accessibilityIndex.toFixed(
                        3
                      )}.

                      Remember, a profitability index is bad for the business if it is less than 1.

                      Explain what this means for the restaurant to someone who may not be familiar with the terminology.

                      The main competitor is ${
                        location.competitor
                      } which is ${location.dcompetitor.toFixed(
                        3
                      )}km away from ${
                        location.name
                      }. Say what this means for the business.

                      The rent in the area is ${
                        location.rent
                      } pounds per month. Explain what this means for the business.

                       Make it brief, 3 or 4 sentences max.`
                    );
                    setSummaryGenerated(true);
                    setSummary(res);
                  })();
                }}
              >
                Generate Summary
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
