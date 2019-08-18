import L from "leaflet";
import LeafletPKK from "./index";

const map = L.map("map").setView([55.756389, 37.63019], 14);

const baseLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

const pkkLayer = L.tileLayer.pkk({
  layers: "8,9,10,11,12",
  format: "image/png32",
  transparent: true
});

map.addLayer(baseLayer);
map.addLayer(pkkLayer);
