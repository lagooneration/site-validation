import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';
import { useControls } from 'leva';
import { calculateSunPathPoints } from '@/lib/sunPathUtils';

const SunPath = () => {
  const { latitude, dayOfYear } = useControls({
    latitude: { value: 37.7749, min: -90, max: 90, step: 0.1 },
    dayOfYear: { value: 1, min: 1, max: 365, step: 1 },
  });

  const month = useMemo(() => {
    return Math.ceil(dayOfYear / 30.42);
  }, [dayOfYear]);

  const day = useMemo(() => {
    return dayOfYear - Math.floor((month - 1) * 30.42);
  }, [month, dayOfYear]);

  const sunPathPoints = useMemo(() => {
    const latInRadians = (latitude * Math.PI) / 180;
    return calculateSunPathPoints(latInRadians, dayOfYear);
  }, [latitude, dayOfYear]);

  // Calculate upper and lower bounds based on latitude only
  const upperBoundDayOfYear = 172; // Example: Summer Solstice (around June 21)
  const lowerBoundDayOfYear = 355; // Example: Winter Solstice (around December 21)

  const upperBoundPoints = useMemo(() => {
    const latInRadians = (latitude * Math.PI) / 180;
    return calculateSunPathPoints(latInRadians, upperBoundDayOfYear);
  }, [latitude]);

  const lowerBoundPoints = useMemo(() => {
    const latInRadians = (latitude * Math.PI) / 180;
    return calculateSunPathPoints(latInRadians, lowerBoundDayOfYear);
  }, [latitude]);

  return (
    <group scale={[12, 12, 12]}>
      {/* Upper bound line */}
      <Line
        points={upperBoundPoints}
        color="lightgray" // Dimmed color for upper bound
        lineWidth={1}
        dashed={true}
        dashSize={0.2}
        gapSize={0.1}
      />
      {/* Lower bound line */}
      <Line
        points={lowerBoundPoints}
        color="lightgray" // Dimmed color for lower bound
        lineWidth={1}
        dashed={true}
        dashSize={0.2}
        gapSize={0.1}
      />
      {/* Dashed line to visualize the sun path */}
      <Line
        points={sunPathPoints}
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






// import { useMemo } from 'react';
// import { Line } from '@react-three/drei';
// import { Vector3 } from 'three';
// import { useControls } from 'leva';
// import { calculateSunPathPoints } from '@/lib/sunPathUtils';

// // Function to create infinity-like path points
// const createInfinityPath = (month: number, timeOfDay: number, latitude: number) => {
//   const points = [];
//   const amplitude = 0.5;
//   const frequency = 0.5;
//   const centerY = 0;
//   const latitudeFactor = Math.cos((latitude * Math.PI) / 180);

//   for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
//     const x = Math.sin(t) * amplitude * Math.cos((month / 12) * Math.PI * 2);
//     const y = centerY + Math.sin(frequency * t) * amplitude * latitudeFactor;
//     const z = Math.cos(t) * amplitude * Math.sin((month / 12) * Math.PI * 2);
//     points.push(new Vector3(x, y, z));
//   }
//   return points;
// };

// const generateCurvedSunPaths = (latitude: number, month: number) => {
//   const paths = [];
//   const sunriseHour = 6; // Approximate sunrise time
//   const sunsetHour = 18; // Approximate sunset time
  
//   for (let hour = sunriseHour; hour <= sunsetHour; hour++) {
//     const t = (hour - sunriseHour) / (sunsetHour - sunriseHour);
//     const elevation = Math.sin(t * Math.PI) * 0.5;
//     const radius = 0.5 + elevation * 0.2;
//     const points = [];
    
//     for (let angle = 0; angle <= Math.PI; angle += 0.1) {
//       const x = Math.cos(angle) * radius * Math.cos((month / 12) * Math.PI * 2);
//       const y = Math.sin(angle) * radius + elevation;
//       const z = Math.cos(angle) * radius * Math.sin((month / 12) * Math.PI * 2);
//       points.push(new Vector3(x, y, z));
//     }
    
//     paths.push(points);
//   }
  
//   return paths;
// };


// const SunPath = () => {
//   const { latitude, month, timeOfDay } = useControls({
//     latitude: { value: 37.7749, min: -90, max: 90, step: 0.1 },
//     month: { value: 6, min: 1, max: 12, step: 1 },
//     timeOfDay: { value: 12, min: 0, max: 23, step: 1 },
//   });

 

//   const infinityPathPoints = useMemo(() => createInfinityPath(month, timeOfDay, latitude), [month, timeOfDay, latitude]);
//   const curvedSunPaths = useMemo(() => generateCurvedSunPaths(latitude, month), [latitude, month]);

//   return (
//     <group scale={[12, 12, 12]}>
//     {/* Infinity path */}
//     <Line
//       points={infinityPathPoints}
//       color="blue"
//       lineWidth={2}
//       dashed={true}
//       dashSize={0.2}
//       gapSize={0.1}
//     />
//     {/* Curved sun paths */}
//     {curvedSunPaths.map((path, index) => (
//       <Line
//         key={index}
//         points={path}
//         color={`hsl(${index * 20}, 100%, 50%)`}
//         lineWidth={1}
//         dashed={true}
//         dashSize={0.1}
//         gapSize={0.05}
//       />
//     ))}
//   </group>
//   );
// };

// export default SunPath;