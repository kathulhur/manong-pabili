import tt from "@tomtom-international/web-sdk-maps";
import { useCallback, useEffect, useState } from "react";

const Map = ({ coordinates, vendors }) => {

  const [map, setMap] = useState<tt.Map>(null)
  useEffect(() => {
      if (map && coordinates) {
          map.setCenter([coordinates.longitude, coordinates.latitude])
          map.zoomTo(15)
      }
  }, [map, coordinates])

  // initialize map
  const mapRef = useCallback(async (node) => {
    if (node !== null) {
        const map = tt.map({
            key: process.env.TOMTOM_API_KEY,
            container: node,
            zoom: 12,
        })
        setMap(map)
    }

    return () => map.remove()
}, [])

  return (
    <div
      className="w-full h-screen"
      ref={mapRef}
    >
    </div>
  );
};



export default Map;
