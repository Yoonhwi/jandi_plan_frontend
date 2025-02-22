import {
  AdvancedMarker,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const CustomMarker = ({
  schedule,
  selectedSchedule,
  onMarkerClick,
  ...props
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { place } = schedule;

  return (
    <AdvancedMarker
      key={schedule.id}
      position={{
        lat: place.lat,
        lng: place.lng,
      }}
      ref={markerRef}
      onClick={() => {
        if (marker) {
          onMarkerClick(marker);
        }
      }}
      {...props}
    >
      <Pin
        background={
          selectedSchedule?.id === schedule.id ? "var(--color-amber-200)" : null
        }
        borderColor={
          selectedSchedule?.id === schedule.id ? "var(--color-amber-400)" : null
        }
        glyphColor={
          selectedSchedule?.id === schedule.id ? "var(--color-amber-400)" : null
        }
      />
    </AdvancedMarker>
  );
};

export default CustomMarker;
