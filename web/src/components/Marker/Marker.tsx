import { Popup } from "@tomtom-international/web-sdk-maps";
import { useEffect } from "react";
import { createMarker } from "src/pages/MapPage/MapPage";

interface MarkerProps {
  map: any;
  vendor: any;
  onClick?: (vendor: any) => void
}

const Marker = ({map, vendor, onClick}: MarkerProps) => {
  useEffect(() => {
    if (!map || !vendor) return
    const marker = createMarker(vendor)
    if(onClick) {
      marker.getElement().addEventListener('click', () => {
        onClick(vendor)
      })
    }
    marker.addTo(map)

    return () => {
      marker.remove()
    }
  }, [map, vendor])

  return null;
};

export default Marker;
