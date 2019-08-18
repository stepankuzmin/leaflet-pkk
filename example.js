import L from 'leaflet';
import LeafletPKK from './index';

const map = L.map('map').setView([55.750883, 37.628852], 16);

const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(baseLayer);

const pkkLayer = L.tileLayer.pkk({
  layers: '8,9,10,11,12',
  format: 'image/png32',
  transparent: true
});

pkkLayer.on('featureclick', ({ latlng, feature }) => {
  const popup = L.popup()
    .setLatLng(latlng)
    .setContent(feature.attrs.id)
    .openOn(map);
});

map.addLayer(pkkLayer);
