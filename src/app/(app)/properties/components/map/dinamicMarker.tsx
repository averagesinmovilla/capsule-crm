import React, { useState } from 'react';
import {Marker, Popup, useMap} from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapDetails from "@/app/(app)/properties/components/map/mapDetails";

// Componente para manejar dinámicamente la vista del mapa
interface DynamicMarkerProps {
    position: LatLngExpression;
    search: string;
}

// Crear un icono personalizado
const customIcon = new L.Icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41], // tamaño del icono
    iconAnchor: [12, 41], // punto de anclaje, en relación al icono
    popupAnchor: [1, -34], // punto de anclaje del popup, en relación al icono
    shadowSize: [41, 41] // tamaño de la sombra
});

const DynamicMarker: React.FC<DynamicMarkerProps> = ({ position, search }) => {
    const map = useMap();

    React.useEffect(() => {
        // Mueve el centro del mapa a las nuevas coordenadas
        map.setView(position, map.getZoom());
    }, [position, map]);

    return (
        <Marker position={position} icon={customIcon}>
            <Popup>
                {search}
            </Popup>
        </Marker>
    );
};

export default DynamicMarker;