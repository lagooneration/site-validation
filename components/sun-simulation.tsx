// SunSimulation.tsx
import { useMemo, useState } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const SunSimulation = () => {
  // Leva sliders for user input
  const { timeOfDay, month } = useControls({
    timeOfDay: { value: 12, min: 0, max: 23, step: 1 }, // 24-hour slider
    month: { value: 6, min: 1, max: 12, step: 1 }, // 12-month slider
  });

  // Latitude and Longitude (you can customize or set via Leva sliders too)
  const latitude = degToRad(37.7749); // Example: San Francisco
  const longitude = degToRad(-122.4194);

  // Calculate day of the year from the month slider (approx.)
  const dayOfYear = useMemo(() => Math.floor((month - 1) * 30.42 + 15), [month]);

  // Solar Declination (δ)
  const declination = useMemo(() => {
    return degToRad(23.45) * Math.sin(((2 * Math.PI) / 365) * (dayOfYear - 81));
  }, [dayOfYear]);

  // Hour Angle (h)
  const hourAngle = useMemo(() => {
    return degToRad(15 * (timeOfDay - 12));
  }, [timeOfDay]);

  // Solar Altitude Angle (α)
  const solarAltitude = useMemo(() => {
    return Math.asin(
      Math.sin(latitude) * Math.sin(declination) +
      Math.cos(latitude) * Math.cos(declination) * Math.cos(hourAngle)
    );
  }, [latitude, declination, hourAngle]);

  // Solar Azimuth Angle (A)
  const solarAzimuth = useMemo(() => {
    const cosA = (Math.sin(declination) - Math.sin(solarAltitude) * Math.sin(latitude)) /
      (Math.cos(solarAltitude) * Math.cos(latitude));
    const A = Math.acos(cosA);
    return hourAngle > 0 ? 2 * Math.PI - A : A; // Adjust for morning/afternoon
  }, [declination, solarAltitude, latitude, hourAngle]);

  // Sun direction vector for the shader
  const sunDirection = useMemo(() => {
    const x = Math.cos(solarAltitude) * Math.sin(solarAzimuth);
    const y = Math.sin(solarAltitude);
    const z = Math.cos(solarAltitude) * Math.cos(solarAzimuth);
    return new Vector3(x, y, z).normalize();
  }, [solarAltitude, solarAzimuth]);

  // Update shader or light direction on every frame
  useFrame(({ gl, scene }) => {
    const sunLight = scene.getObjectByName('SunLight');
    if (sunLight) sunLight.position.copy(sunDirection);
  });

  return (
    <>
    <ambientLight intensity={0.1} />
    <directionalLight
      name="SunLight"
      position={sunDirection}
      intensity={2.0}
      color="white"
    />
    </>
  );
};

export default SunSimulation;