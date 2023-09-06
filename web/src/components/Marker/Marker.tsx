import { Popup } from "@tomtom-international/web-sdk-maps";
import { useEffect } from "react";
import { createMarker } from "src/pages/MapPage/MapPage";

const Marker = ({map, vendor, onClick}) => {
  console.log(map, vendor)
  useEffect(() => {
    if (!map || !vendor) return
    const marker = createMarker(vendor)
    marker.getElement().addEventListener('click', () => {
      onClick(vendor)
    })
    marker.addTo(map)

    return () => {
      marker.remove()
    }
  }, [map, vendor])

  return (
    <div>
      <h2>{"Marker"}</h2>
      <p>{"Find me in ./web/src/components/Marker/Marker.tsx"}</p>
    </div>
  );
};

export default Marker;
