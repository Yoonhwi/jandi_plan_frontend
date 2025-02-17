import { AdvancedMarker, Map, useMap } from "@vis.gl/react-google-maps";
import { usePlanDetail } from "../PlanDetailContext";
import styles from "./PlanMap.module.css";
import { useEffect, useMemo } from "react";
import Polyline from "./PolyLine";

const PlanMap = () => {
  const mapId = import.meta.env.VITE_MAP_ID;
  const map = useMap();

  const { plan, focusDay } = usePlanDetail();
  const allLocation = plan.data
    .map((day) => day.contentData.map((data) => data.place))
    .flat();

  const flightPlanCoordinates = allLocation.map((v) => {
    return { lat: v.lat, lng: v.lng };
  });

  const focusSchedule = plan.data.find((v) => v.date === focusDay);

  const currentScheduleLocation = useMemo(() => {
    return focusSchedule?.contentData.map((v) => v.place) || [];
  }, [focusSchedule?.contentData]);

  const defaultPosition = useMemo(() => {
    return { lat: plan.latitude, lng: plan.longitude };
  }, [plan.latitude, plan.longitude]);

  // 선택된 날짜의 첫번째 스케쥴을 Map의 중심으로 설정합니다.
  useEffect(() => {
    if (!map) return;

    if (currentScheduleLocation.length > 0) {
      map.panTo({
        lat: currentScheduleLocation[0].lat,
        lng: currentScheduleLocation[0].lng,
      });
    } else {
      map.panTo(defaultPosition);
    }
  }, [currentScheduleLocation, defaultPosition, map]);

  return (
    <div className={styles.map_container}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={defaultPosition}
        defaultZoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={mapId}
      >
        {(currentScheduleLocation.length > 0
          ? currentScheduleLocation
          : allLocation
        ).map((location, index) => {
          return (
            <AdvancedMarker
              key={index}
              position={{
                lat: location.lat,
                lng: location.lng,
              }}
            />
          );
        })}

        <Polyline path={flightPlanCoordinates} />
      </Map>
    </div>
  );
};

export default PlanMap;
