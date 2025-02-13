import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import styles from "./PlanMap.module.css";

const PlanMap = ({ plan }) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const position = { lat: plan.latitude, lng: plan.longitude };

  return (
    <div className={styles.map_container}>
      <APIProvider apiKey={API_KEY}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={position}
          defaultZoom={11}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="map_id"
        >
          <AdvancedMarker position={position} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default PlanMap;
