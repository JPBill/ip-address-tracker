import React from "react";
import { Marker, useMap } from "react-leaflet";
import Icon from "./Icon";

const LocationMarker = ({ position }) => {
  const map = useMap();
  map.flyTo([position.lat, position.lng], 13, { animate: true });
  return position === null ? null : (
    <Marker icon={Icon} position={position}></Marker>
  );
};

export default LocationMarker;
