import L from "leaflet";
import icon from "../assets/images/icon-location.svg";

let iconAnchor, popupAnchor;

if (window.innerWidth <= 768) {
  // Mobile
  iconAnchor = [16, -80];
  popupAnchor = [2, -40];
} else {
  // Desktop
  iconAnchor = [16, 41];
  popupAnchor = [2, -20];
}

export default L.icon({
  iconSize: [32, 40],
  iconAnchor: iconAnchor,
  popupAnchor: popupAnchor,
  iconUrl: icon,
});
