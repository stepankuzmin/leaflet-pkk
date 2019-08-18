# leaflet-pkk

Public cadastral map ([pkk5.rosreestr.ru](pkk5.rosreestr.ru)) plugin for Leaflet.

[**Example**](https://stepankuzmin.github.io/leaflet-pkk/)

[![screenshot](https://raw.githubusercontent.com/stepankuzmin/leaflet-pkk/master/screenshot.png)](https://stepankuzmin.github.io/leaflet-pkk/)

## Install

Install using npm:

```shell
npm install --save leaflet-pkk
```

...or using unpkg CDN

```html
<script src="https://unpkg.com/leaflet-pkk/index.js"></script>
```

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
