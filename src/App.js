import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Array of markers with position and label
const markers = [
  { position: [28.6139, 77.209], label: "New Delhi" },
  { position: [19.076, 72.8777], label: "Mumbai" },
  { position: [13.0827, 80.2707], label: "Chennai" },
  { position: [22.5726, 88.3639], label: "Kolkata" },
  { position: [12.9716, 77.5946], label: "Bangalore" },
];

// Custom hook to handle map centering
const ChangeMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const BasicMap = () => {
  const [center, setCenter] = useState([20.5937, 78.9629]); // Default center

  const handleMarkerClick = (position) => {
    setCenter(position);
  };

  return (
    <MapContainer center={center} zoom={5} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ChangeMapView center={center} />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          eventHandlers={{
            click: () => handleMarkerClick(marker.position),
          }}
        >
          <Popup>
            {marker.label}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default BasicMap;
