import { useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const Polyline = ({ path }) => {
  const map = useMap();
  const maps = useMapsLibrary("maps");

  useEffect(() => {
    if (!map || !maps) return;

    const polyline = new maps.Polyline({
      path,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    polyline.setMap(map);

    return () => {
      polyline.setMap(null);
    };
  }, [map, maps, path]);

  return null;
};

export default Polyline;
