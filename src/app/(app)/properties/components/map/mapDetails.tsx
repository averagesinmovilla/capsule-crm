'use client'

import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import MapSearch from "@/app/(app)/properties/components/map/mapSearch";
import DynamicMarker from "@/app/(app)/properties/components/map/dinamicMarker";


// Definir el tipo de las props
interface MapDetailsProps {
    latitude?: number;
    longitude?: number;
    search?: string;
    onCoordinatesChange?: (latitude: number, longitude: number) => void;
}

const MapDetails: React.FC<MapDetailsProps> = ({ latitude, longitude, search, onCoordinatesChange }) => {
    const defaultPosition: LatLngExpression = [38.27231832871174, -0.7121807064845603];

    // Estado para las coordenadas
    const [position, setPosition] = useState<LatLngExpression>(
        latitude && longitude ? [latitude, longitude] : defaultPosition
    );

    // Función de callback para actualizar las coordenadas
    const handleUpdatePosition = (newLat: number, newLon: number) => {
        setPosition([newLat, newLon]);
        if(typeof(onCoordinatesChange) ==  "function") {
            onCoordinatesChange(newLat, newLon);
        }
    };

    let className = "h-[calc(30vh-0px)] w-full rounded z-0 rounded-md border shadow";
    if(search == "desactivate") {
        className = "h-[calc(50vh-0px)] w-full rounded z-0 rounded-md border";
    }

    if(!search) {
        search = "";
    }

    return (
        <div className="w-full h-90 relative">
            {/* Pasar la función de actualización de coordenadas */}
            <MapSearch onLocationSelected={handleUpdatePosition} search={search} />
            <MapContainer
                center={defaultPosition}
                zoom={15}
                scrollWheelZoom={false}
                className={className}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {/* Mover dinámicamente la vista del mapa y marcador */}
                <DynamicMarker position={position} search={search} />
            </MapContainer>
        </div>
    );
};

export default MapDetails;