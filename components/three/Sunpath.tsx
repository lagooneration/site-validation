// import { useMemo } from 'react';
// import { Line, Text } from '@react-three/drei';
// import { Vector3 } from 'three';
// import { useControls } from 'leva';
// import { calculateSunPathPoints } from '@/lib/sunPathUtils';

// const SunPath = () => {
//   const { latitude, dayOfYear, showCompass } = useControls({
//     latitude: { value: 37.7749, min: -90, max: 90, step: 0.1 },
//     dayOfYear: { value: 1, min: 1, max: 365, step: 1 },
//     showCompass: { value: false, label: 'Show Compass' },
//   });

//   const month = useMemo(() => {
//     return Math.ceil(dayOfYear / 30.42);
//   }, [dayOfYear]);

//   const day = useMemo(() => {
//     return dayOfYear - Math.floor((month - 1) * 30.42);
//   }, [month, dayOfYear]);

//   const sunPathPoints = useMemo(() => {
//     const latInRadians = (latitude * Math.PI) / 180;
//     return calculateSunPathPoints(latInRadians, dayOfYear);
//   }, [latitude, dayOfYear]);

//   // Calculate upper and lower bounds based on latitude only
//   const upperBoundDayOfYear = 172; // Example: Summer Solstice (around June 21)
//   const lowerBoundDayOfYear = 355; // Example: Winter Solstice (around December 21)

//   const upperBoundPoints = useMemo(() => {
//     const latInRadians = (latitude * Math.PI) / 180;
//     return calculateSunPathPoints(latInRadians, upperBoundDayOfYear);
//   }, [latitude]);

//   const lowerBoundPoints = useMemo(() => {
//     const latInRadians = (latitude * Math.PI) / 180;
//     return calculateSunPathPoints(latInRadians, lowerBoundDayOfYear);
//   }, [latitude]);

//   const compassDirections = useMemo(() => {
//     const radius = 1.2;
//     return [
//       { label: 'N', position: new Vector3(0, 0, -radius) },
//       { label: 'S', position: new Vector3(0, 0, radius) },
//       { label: 'E', position: new Vector3(radius, 0, 0) },
//       { label: 'W', position: new Vector3(-radius, 0, 0) },
//     ];
//   }, []);

//   return (
//     <group scale={[12, 12, 12]}>
//       {/* Upper bound line */}
//       <Line
//         points={upperBoundPoints}
//         color="lightgray" // Dimmed color for upper bound
//         lineWidth={1}
//         dashed={true}
//         dashSize={0.2}
//         gapSize={0.1}
//       />
//       {/* Lower bound line */}
//       <Line
//         points={lowerBoundPoints}
//         color="lightgray" // Dimmed color for lower bound
//         lineWidth={1}
//         dashed={true}
//         dashSize={0.2}
//         gapSize={0.1}
//       />
//       {/* Dashed line to visualize the sun path */}
//       <Line
//         points={sunPathPoints}
//         color="yellow"
//         lineWidth={2}
//         dashed={true}
//         dashSize={0.2}
//         gapSize={0.1}
//       />
//       {/* Compass directions */}
//       {showCompass && compassDirections.map(({ label, position }) => (
//         <Text
//           key={label}
//           position={position}
//           rotation={[-Math.PI / 2, 0, 0]}
//           color="white"
//           fontSize={0.2}
//           anchorX="center"
//           anchorY="middle"
//         >
//           {label}
//         </Text>
//       ))}
//     </group>
//   );
// };

// export default SunPath;