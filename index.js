L.TileLayer.PKK = L.TileLayer.WMS.extend({
  onAdd: function(map) {
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on("click", this.getFeatureInfo, this);
  },
  onRemove: function(map) {
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off("click", this.getFeatureInfo, this);
  },
  getFeatureInfo: function(event) {
    const url = this.getFeatureInfoUrl(event.latlng);
    const showFeatureInfo = L.Util.bind(this.showFeatureInfo, this);
    console.log(url);

    fetch(url)
      .then((response) => response.text())
      .then((info) => showFeatureInfo(null, event.latlng, info))
      .catch((error) => showFeatureInfo(error, event.latlng, null));
  },
  getFeatureInfoUrl: function(latlng) {
    const point = this._map.latLngToContainerPoint(latlng, this._map.getZoom());
    const size = this._map.getSize();

    const params = {
      request: "GetFeatureInfo",
      service: "WMS",
      srs: "EPSG:3857", // this.wmsParams.crs
      styles: this.wmsParams.styles,
      transparent: this.wmsParams.transparent,
      version: this.wmsParams.version,
      format: this.wmsParams.format,
      bbox: this._map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: this.wmsParams.layers,
      query_layers: this.wmsParams.layers,
      info_format: "text/html"
      /* info_format: "application/json" */
      /* info_format: "text/plain" */
    };

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },
  showFeatureInfo: function(error, latlng, info) {
    console.log("error", error);
    console.log("latlng", latlng);
    console.log("info", info);
  }
});

L.tileLayer.pkk = function(options) {
  const opts = L.extend(
    {
      layers:
        "1,2,3,4,5,6,8,9,10,11,12,14,15,16,18,19,20,21,22,23,24,25,27,28,29,30,31,32,33",
      format: "image/png32",
      transparent: true
    },
    options
  );

  const url =
    options.url ||
    "https://pkk5.rosreestr.ru/arcgis/services/Cadastre/CadastreWMS/MapServer/WMSServer?";

  return new L.TileLayer.PKK(url, opts);
};
