import {
  AdvancedMarkerAnchorPoint,
  Map,
  useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePlanDetail } from "../PlanDetailContext";
import CustomMarker from "./CustomMarker";
import styles from "./PlanMap.module.css";
import Polyline from "./PolyLine";
import CustomInfoWindow from "./CustomInfoWindow";

const PlanMap = () => {
  const [hoverId, setHoverId] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const onMouseEnter = useCallback((id) => {
    setHoverId(id);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHoverId(null);
  }, []);

  const onMarkerClick = useCallback(
    (schedule, marker) => {
      setSelectedSchedule(schedule);

      if (marker) {
        setSelectedMarker(marker);
      }

      if (schedule.id !== selectedSchedule?.id) {
        setInfoWindowShown(true);
      } else {
        setInfoWindowShown((isShown) => !isShown);
      }
    },
    [selectedSchedule]
  );

  const closeInfoWindow = useCallback(() => {
    setSelectedSchedule(null);
    setSelectedMarker(null);
    setInfoWindowShown(false);
  }, []);

  const map = useMap("main-map");

  const { plan, focusDay } = usePlanDetail();

  const allLocation = plan.data.map((day) => day.contentData).flat();

  const focusSchedule = plan.data.find((v) => v.date === focusDay);
  const defaultPosition = useMemo(() => {
    return { lat: plan.latitude, lng: plan.longitude };
  }, [plan.latitude, plan.longitude]);

  // 선택된 날짜의 첫번째 스케쥴을 Map의 중심으로 설정합니다.

  const renderSchedule = useMemo(() => {
    if (!focusDay) return allLocation;

    return allLocation.filter((v) => v.date === focusDay);
  }, [allLocation, focusDay]);

  const flightPlanCoordinates = renderSchedule.map((v) => {
    const { place } = v;
    return { lat: place.lat, lng: place.lng };
  });

  useEffect(() => {
    if (!map) return;

    if (focusSchedule?.contentData.length > 0) {
      const firstContent = focusSchedule.contentData[0];
      map.panTo({
        lat: firstContent.place.lat,
        lng: firstContent.place.lng,
      });
    } else {
      map.panTo(defaultPosition);
    }
  }, [defaultPosition, focusSchedule, map]);

  return (
    <div className={styles.map_container}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={defaultPosition}
        defaultZoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        id={"main-map"}
        mapId="main-map"
        onClick={closeInfoWindow}
      >
        {renderSchedule.map((schedule) => {
          return (
            <CustomMarker
              key={schedule.id}
              schedule={schedule}
              selectedSchedule={selectedSchedule}
              onMarkerClick={(marker) => onMarkerClick(schedule, marker)}
              onMouseEnter={() => onMouseEnter(schedule.id)}
              onMouseLeave={onMouseLeave}
              style={{
                transform: `scale(${
                  [hoverId, selectedSchedule?.id].includes(schedule.id)
                    ? 1.3
                    : 1
                })`,
                transformOrigin: AdvancedMarkerAnchorPoint["BOTTOM"].join(" "),
              }}
            />
          );
        })}

        <Polyline path={flightPlanCoordinates} />
        {infoWindowShown && selectedMarker && (
          <CustomInfoWindow
            selectedSchedule={selectedSchedule}
            selectedMarker={selectedMarker}
            onClose={closeInfoWindow}
          />
        )}
      </Map>
    </div>
  );
};

export default PlanMap;
