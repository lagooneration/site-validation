'use client'
// import React from 'react'

// const PropertyDetails = () => {
//   return (
//     <div className="h-full w-full">
//       <h2>Property Details</h2>
//       {/* Add your shadow analysis content here */}
//     </div>
//   )
// }

// export default PropertyDetails;



import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';
import Sun from '@/components/three/Sun';

const PropertyDetails: React.FC = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState(12); // 0 to 24
  const [month, setMonth] = useState(6); // 1 to 12
  const [sunPosition, setSunPosition] = useState(new THREE.Vector3());

  const calculateSunPosition = (lat: number, lon: number, time: number, month: number) => {
    const phi = (lat * Math.PI) / 180;
    const theta = ((time / 24) * 2 * Math.PI) - Math.PI / 2;
    const declination = 23.45 * Math.sin(((360 / 365) * (month - 81)) * (Math.PI / 180));
    const delta = (declination * Math.PI) / 180;

    const x = Math.cos(phi) * Math.cos(theta);
    const y = Math.sin(phi) * Math.cos(delta) - Math.cos(phi) * Math.sin(delta) * Math.sin(theta);
    const z = Math.sin(phi) * Math.sin(delta) + Math.cos(phi) * Math.cos(delta) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  };

  useEffect(() => {
    setSunPosition(calculateSunPosition(latitude, longitude, timeOfDay, month));
  }, [latitude, longitude, timeOfDay, month]);

  return (
    <div>
      <div>
        <label>
          Latitude:
          <input
            type="range"
            min="-90"
            max="90"
            value={latitude}
            onChange={(e) => setLatitude(Number(e.target.value))}
          />
        </label>
        <label>
          Longitude:
          <input
            type="range"
            min="-180"
            max="180"
            value={longitude}
            onChange={(e) => setLongitude(Number(e.target.value))}
          />
        </label>
        <label>
          Time of Day:
          <input
            type="range"
            min="0"
            max="24"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(Number(e.target.value))}
          />
        </label>
        <label>
          Month:
          <input
            type="range"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="w-full h-[800px]">
      <Sun sunPosition={sunPosition} />
      </div>
    </div>
  );
};

export default PropertyDetails;