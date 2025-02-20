import { InfoWindow } from "@vis.gl/react-google-maps";
import styles from "./CustomInfoWindow.module.css";
import { formatPrice } from "@/utils";

const CustomInfoWindow = ({ selectedSchedule, selectedMarker, onClose }) => {
  return (
    <InfoWindow
      anchor={selectedMarker}
      pixelOffset={[0, -2]}
      onCloseClick={onClose}
      headerContent={
        <h1 className={styles.header}>{selectedSchedule.title}</h1>
      }
    >
      <div className={styles.container}>
        <p>{selectedSchedule.place.name}</p>
        <p>{selectedSchedule.place.address}</p>
        <p>{selectedSchedule.date}</p>
        <p>{formatPrice(selectedSchedule.cost)}원</p>
      </div>
    </InfoWindow>
  );
};

export default CustomInfoWindow;
