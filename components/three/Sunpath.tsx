// SunPathVisualizer.tsx
import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';
import { useControls } from 'leva';
import { calculateSunPathPoints } from '@/lib/sunPathUtils';

const SunPath = () => {
  // Leva controls for interactive inputs
  const { latitude, month, day } = useControls({
    latitude: { value: 37.7749, min: -90, max: 90, step: 0.1 },
    month: { value: 6, min: 1, max: 12, step: 1 },
    day: { value: 15, min: 1, max: 31, step: 1 },
  });

  // Calculate the day of the year from month and day
  const dayOfYear = useMemo(() => Math.floor((month - 1) * 30.42 + day), [month, day]);

  // Calculate the sun path points
  const sunPathPoints = useMemo(() => {
    const latInRadians = (latitude * Math.PI) / 180;
    return calculateSunPathPoints(latInRadians, dayOfYear);
  }, [latitude, dayOfYear]);

  return (
    <group>
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
