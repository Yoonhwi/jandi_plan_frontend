import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import styles from "./PlanMap.module.css";
import { usePlanDetail } from "../PlanDetailContext";

const PlanMap = () => {
  const { plan } = usePlanDetail();
  const position = { lat: plan.latitude, lng: plan.longitude };

  return (
    <div className={styles.map_container}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={position}
        defaultZoom={11}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId="fine_place"
      >
        <AdvancedMarker position={position} />
      </Map>
    </div>
  );
};

export default PlanMap;
