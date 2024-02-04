import { useCallback, useState } from "react";
import {
  GoogleMap,
  HeatmapLayerF,
  InfoWindow,
  MarkerF,
} from "@react-google-maps/api";
import "./../style/heatmap.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMarker,
  faSignature,
  faTrainSubway,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

const HeatMap = ({
  data,
  center,
  zoom,
  c,
  radii,
  draw,
  markers,
  oc,
  setCenter,
  setZoom,
}) => {
  const d = data();

  const [map, setMap] = useState(null);
  const onLoad = useCallback((map) => setMap(map), []);

  const [popupInfo, setPopupInfo] = useState(null);
  const [postcode, setPostcode] = useState(null);
  const [hasOpened, setHasOpened] = useState(false);

  function click(marker) {
    setPopupInfo(marker);
    (async () => {
      let res = await fetch(
        `https://findthatpostcode.uk/points/${marker.lat},${marker.lng}.json`
      );
      let data = await res.json();
      setPostcode(data.data.relationships.nearest_postcode.data.id);
    })();
  }

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={{
        width: "100%",
        height: "100vh",
      }}
      onClick={(ev) => {
        if (popupInfo !== null) {
          setPopupInfo(null);
          setHasOpened(false);
          return;
        }
        oc(ev.latLng.lat(), ev.latLng.lng());
      }}
      onLoad={onLoad}
      onDragEnd={() => {
        if (map !== null) setCenter(map.getCenter());
      }}
      onZoomChanged={() => {
        if (map !== null) setZoom(map.getZoom());
      }}
      // Starting Position
      zoom={zoom}
      center={center}
      // Disable interacting with POIs
      clickableIcons={false}
      options={{
        // Disable some of the UI elements
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        maxZoom: 16,
        minZoom: 11,
      }}
    >
      {draw ? (
        d.map((d, i) => (
          <HeatmapLayerF
            key={i}
            data={d}
            options={{
              dissipating: false,
              radius: radii[i],
              gradient: [
                `rgba(${c[i].r}, ${c[i].g}, ${c[i].b}, 0)`,
                `rgba(${c[i].r}, ${c[i].g}, ${c[i].b}, 1)`,
              ],
            }}
          />
        ))
      ) : (
        <></>
      )}
      {markers.map((marker, index) =>
        marker.placed ? (
          <MarkerF
            key={index}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
            icon={{
              path: "M64,80C64,88.83999999999997,56.839999999999975,96,48,96C48,96,-48,96,-48,96C-56.84,96,-64,88.83999999999997,-64,80C-64,80,-64,32,-64,32C-64,32,-256,32,-256,32C-256,32,-256,176,-256,176C-256,201.60000000000002,-233.6,224,-208,224C-208,224,208,224,208,224C233.60000000000002,224,256,201.60000000000002,256,176C256,176,256,32,256,32C256,32,64,32,64,32C64,32,64,80,64,80C64,80,64,80,64,80M208,-128C208,-128,128,-128,128,-128C128,-128,128,-176,128,-176C128,-201.6,105.60000000000002,-224,80,-224C80,-224,-80,-224,-80,-224C-105.6,-224,-128,-201.6,-128,-176C-128,-176,-128,-128,-128,-128C-128,-128,-208,-128,-208,-128C-233.6,-128,-256,-105.6,-256,-80C-256,-80,-256,0,-256,0C-256,0,256,0,256,0C256,0,256,-80,256,-80C256,-105.6,233.60000000000002,-128,208,-128C208,-128,208,-128,208,-128M64,-128C64,-128,-64,-128,-64,-128C-64,-128,-64,-160,-64,-160C-64,-160,64,-160,64,-160C64,-160,64,-128,64,-128C64,-128,64,-128,64,-128",
              fillColor: "black",
              fillOpacity: 1,
              scale: 0.05,
              strokeColor: "white",
              strokeWeight: 2,
            }}
            onMouseOver={() => {
              if (hasOpened) return;
              setHasOpened(true);
              click(marker);
            }}
            onClick={() => {
              click(marker);
            }}
          >
            {popupInfo === marker && (
              <InfoWindow
                onCloseClick={() => setPopupInfo(null)}
                onLoad={() => {
                  let a = document.querySelector(".gm-style");
                  if (a !== null) a.classList.remove("gm-style");
                }}
              >
                <div class="card map-popup">
                  <div class="card-content">
                    <div class="content">
                      <button
                        class="delete"
                        onClick={() => {
                          setPopupInfo(null);
                        }}
                      ></button>
                      <div className="is-flex">
                        <span class="icon">
                          <FontAwesomeIcon icon={faSignature} />
                        </span>
                        <p>
                          <strong>Name:</strong> {marker.name}
                        </p>
                      </div>
                      <div className="is-flex">
                        {" "}
                        <span class="icon">
                          <FontAwesomeIcon icon={faLocationDot} />
                        </span>
                        {postcode !== null ? (
                          <p>
                            <strong>Postcode:</strong> {postcode}
                          </p>
                        ) : (
                          <p>
                            <strong>Postcode:</strong> Loading...
                          </p>
                        )}
                      </div>
                      <div className="is-flex">
                        <span class="icon">
                          <FontAwesomeIcon icon={faTrainSubway} />
                        </span>
                        <p>
                          <strong>Nearest Tube:</strong> {marker.tube}
                        </p>
                      </div>
                      <div className="is-flex">
                        <span class="icon">
                          <FontAwesomeIcon icon={faTrophy} />
                        </span>
                        <p>
                          <strong>Main Competitor:</strong> {marker.competitor}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </MarkerF>
        ) : (
          <></>
        )
      )}
    </GoogleMap>
  );
};

export default HeatMap;
