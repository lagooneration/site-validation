// sunPathUtils.ts
import { Vector3 } from 'three';

const degToRad = (deg: number) => (deg * Math.PI) / 180;
const radToDeg = (rad: number) => (rad * 180) / Math.PI;

////////////////////////////////////////////////////////////////
///// Display parameters
// let 


/**
 * Clamp a value between min and max to avoid NaN issues with acos and asin.
 */
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/**
 * Calculate solar declination (δ) for a given day of the year.
 */
const getSolarDeclination = (dayOfYear: number): number => {
  return degToRad(23.45) * Math.sin(((2 * Math.PI) / 365) * (dayOfYear - 81));
};

/**
 * Calculate the hour angle (h) in radians.
 */
const getHourAngle = (hour: number): number => {
  return degToRad(15 * (hour - 12)); // Noon is 0 degrees
};

/**
 * Calculate solar altitude angle (α) in radians.
 */
const getSolarAltitude = (lat: number, declination: number, hourAngle: number): number => {
  const sinAlt = Math.sin(lat) * Math.sin(declination) + Math.cos(lat) * Math.cos(declination) * Math.cos(hourAngle);
  return Math.asin(clamp(sinAlt, -1, 1)); // Clamp to avoid NaN
};

/**
 * Calculate solar azimuth angle (A) in radians.
 */
const getSolarAzimuth = (
  lat: number,
  declination: number,
  solarAltitude: number,
  hourAngle: number
): number => {
  const cosAz = (Math.sin(declination) - Math.sin(solarAltitude) * Math.sin(lat)) /
                (Math.cos(solarAltitude) * Math.cos(lat));
  const azimuth = Math.acos(clamp(cosAz, -1, 1)); // Clamp to avoid NaN
  return hourAngle > 0 ? 2 * Math.PI - azimuth : azimuth; // Adjust for afternoon
};

/**
 * Generate an array of 3D points representing the sun path in the sky.
 */
export const calculateSunPathPoints = (
  latitude: number,
  dayOfYear: number
): Vector3[] => {
  const points: Vector3[] = [];
  const declination = getSolarDeclination(dayOfYear);

  for (let hour = 0; hour < 24; hour++) {
    const hourAngle = getHourAngle(hour);
    const solarAltitude = getSolarAltitude(latitude, declination, hourAngle);
    const solarAzimuth = getSolarAzimuth(latitude, declination, solarAltitude, hourAngle);

    // Convert polar coordinates (altitude, azimuth) to Cartesian (x, y, z)
    const x = Math.cos(solarAltitude) * Math.sin(solarAzimuth);
    const y = Math.sin(solarAltitude);
    const z = Math.cos(solarAltitude) * Math.cos(solarAzimuth);

    // Push only valid points to avoid NaN issues
    if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
      points.push(new Vector3(x, y, z));
    }
  }

  return points;
};
