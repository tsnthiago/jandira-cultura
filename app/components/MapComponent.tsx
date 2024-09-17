// ./app/components/MapComponent.tsx

'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { cn } from '@/lib/utils';

// Fix para os ícones do Leaflet no Webpack (Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: typeof window !== 'undefined' ? require('leaflet/dist/images/marker-icon-2x.png') : '',
  iconUrl: typeof window !== 'undefined' ? require('leaflet/dist/images/marker-icon.png') : '',
  shadowUrl: typeof window !== 'undefined' ? require('leaflet/dist/images/marker-shadow.png') : '',
});

interface MapComponentProps {
  lat: number;
  lng: number;
  title: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, title }) => {
  const center: LatLngExpression = [lat, lng];

  return (
    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-full">
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>{title}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
