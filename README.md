# leaflet-pkk

Public cadastral map ([pkk5.rosreestr.ru](pkk5.rosreestr.ru)) plugin for Leaflet.

![screenshot](https://raw.githubusercontent.com/stepankuzmin/leaflet-pkk/master/screenshot.png)

## Usage

```js
const map = L.map('map').setView([55.756389, 37.63019], 14);

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
```
