import { Popup } from "@tomtom-international/web-sdk-maps";
import { useEffect } from "react";
import { createMarker } from "src/pages/MapPage/MapPage";

const Marker = ({map, vendor, onClick}) => {
  console.log('render marker', vendor?.id)
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

  return null;
};

export default Marker;
