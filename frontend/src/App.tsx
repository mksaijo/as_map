import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom"
import "./App.css";

function App() {
  const [latlng, setLatlng] = useState<{lat: number, lng: number}>({lat: 0, lng: 0});

  useEffect(() => {
    const map = L.map('map', {
        center: [33.653485, 130.421700],
        zoom: 14,
    });
    const backgroundLayer = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
    );
    map.addLayer(backgroundLayer);

    const icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  
      iconSize:     [25, 41], // size of the icon
      iconAnchor:   [13, 40], // point of the icon which will correspond to marker's location
      popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
    });

    map.attributionControl.addAttribution(
      '<a href="https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-P29-v2_0.html">国土数値情報 - 学校データ</a>',
    );
    
    map.on('click', onMapClick) 
    
    function onMapClick(e: L.LeafletMouseEvent) {
      //地図のclickイベント呼び出される
      //クリック地点の座標にマーカーを追加、マーカーのclickイベントでonMarkerClick関数を呼び出し
      //alert("この地点に観察記録をつけますか?\n /observations/form");
      var mk = L.marker(e.latlng, {icon: icon})
                .addTo(map);
      var popupContent = document.createElement('div');
      popupContent.innerHTML = `<div>この地点に観察記録をつけますか?</div>`;
    
      var haiButton = document.createElement('button');
      haiButton.innerText = 'はい';
      haiButton.addEventListener('click', function(event) {
        window.location.href = "/form";
      });
      
      var iieButton = document.createElement('button');
      iieButton.innerText = 'いいえ';
      iieButton.addEventListener('click', function(event) {
        onMarkerClick({target: mk} as L.LeafletMouseEvent);
      });
    
      popupContent.appendChild(haiButton);
      popupContent.appendChild(iieButton);
    
      mk.bindPopup(popupContent).openPopup();
    }

    function onMarkerClick(e: L.LeafletMouseEvent) {
      //マーカーのclickイベント呼び出される
      //クリックされたマーカーを地図のレイヤから削除する
      map.removeLayer(e.target);
      console.log("remove:",e.target)
    }

    // GeoJSONレイヤーを作成
    fetch('http://localhost:3000/observations')
      .then(response => response.json())
      .then(geojson => {
        L.geoJSON(geojson, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: icon});
          },
          onEachFeature: function (feature, layer) {
            if (feature.properties) {
              const popupContent = "<br>場所: " + feature.properties.place 
                                 + "<br>日時: " + feature.properties.date 
                                 + "<br>個体数: " + feature.properties.count;
              layer.bindPopup(popupContent);
            }
          }
        }).addTo(map);
      });
    });
    
    
  return (
    <>
      <div id="map" style={{ height: '80vh' }}></div>
      <Link to={{
        pathname: "/form",
        state: {lat: latlng.lat, lng: latlng.lng}
      } as any}>観察記録をつける</Link>
    </>
  );
  };


export default App;