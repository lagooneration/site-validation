// SunPathVisualizer.tsx
import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';
import { useControls } from 'leva';
import { calculateSunPathPoints } from '@/lib/sunPathUtils';

const SunPath = () => {
  // Leva controls for interactive inputs
  const { latitude, dayOfYear } = useControls({
    latitude: { value: 37.7749, min: -90, max: 90, step: 0.1 },
    dayOfYear: { value: 1, min: 1, max: 365, step: 1 },
  });

  // Calculate the month and day from the day of the year
  const month = useMemo(() => {
    return Math.ceil(dayOfYear / 30.42);
  }, [dayOfYear]);

  const day = useMemo(() => {
    return dayOfYear - Math.floor((month - 1) * 30.42);
  }, [month, dayOfYear]);

  // Calculate the sun path points
  const sunPathPoints = useMemo(() => {
    const latInRadians = (latitude * Math.PI) / 180;
    return calculateSunPathPoints(latInRadians, dayOfYear);
  }, [latitude, dayOfYear]);

  return (
    <group scale={[12,12,12]}>
      {/* Dashed line to visualize the sun path */}
      <Line
        points={sunPathPoints} // Array of Vector3 points
        color="yellow"
        lineWidth={2}
        dashed={true}
        dashSize={0.2}
        gapSize={0.1}
      />
    </group>
  );
};

export default SunPath;
