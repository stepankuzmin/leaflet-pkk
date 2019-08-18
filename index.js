L.TileLayer.PKK = L.TileLayer.WMS.extend({
  onAdd: function(map) {
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.onClick, this);
  },
  onRemove: function(map) {
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.onClick, this);
  },
  onClick: function(event) {
    const latlng = event.latlng;
    this.getFeatures(latlng);
  },
  getFeaturesURL: function(latlng) {
    const baseURL = 'https://pkk5.rosreestr.ru/api/features/1';

    const params = {
      text: latlng.lat + ',' + latlng.lng,
      tolerance: 4097,
      limit: 11
    };

    return baseURL + L.Util.getParamString(params, baseURL);
  },
  getFeatures: function(latlng) {
    const url = this.getFeaturesURL(latlng);
    const onFeaturesClick = L.Util.bind(this.onFeaturesClick, this);

    const headers = {
      referer: 'https://pkk5.rosreestr.ru/'
    };

    fetch(url, { headers })
      .then((response) => response.json())
      .then((info) => onFeaturesClick(null, latlng, info))
      .catch((error) => onFeaturesClick(error, latlng, null));
  },
  onFeaturesClick: function(error, latlng, info) {
    if (error || info.features.length <= 0) {
      return;
    }

    const features = info.features;
    this.fire('featuresclick', { latlng, features });

    const feature = features[0];
    const id = feature.attrs.id;
    this.getFeatureInfo(id, latlng);
  },
  getFeatureInfoURL: function(id) {
    const baseURL = 'https://pkk5.rosreestr.ru/api/features/1';
    return baseURL + '/' + id;
  },
  getFeatureInfo: function(id, latlng) {
    const url = this.getFeatureInfoURL(id);
    const onFeatureClick = L.Util.bind(this.onFeatureClick, this);

    const headers = {
      referer: 'https://pkk5.rosreestr.ru/'
    };

    fetch(url, { headers })
      .then((response) => response.json())
      .then((info) => onFeatureClick(null, latlng, info))
      .catch((error) => onFeatureClick(error, latlng, null));
  },
  onFeatureClick: function(error, latlng, info) {
    if (error || !info.feature) {
      return;
    }

    const feature = info.feature;
    this.fire('featureclick', { latlng, feature });
  }
});

L.tileLayer.pkk = function(options) {
  const opts = L.extend(
    {
      layers:
        '1,2,3,4,5,6,8,9,10,11,12,14,15,16,18,19,20,21,22,23,24,25,27,28,29,30,31,32,33',
      format: 'image/png32',
      transparent: true
    },
    options
  );

  const url =
    options.url ||
    'https://pkk5.rosreestr.ru/arcgis/services/Cadastre/CadastreWMS/MapServer/WMSServer?';

  return new L.TileLayer.PKK(url, opts);
};
