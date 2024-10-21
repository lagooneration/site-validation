import { Canvas, MeshProps } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import { OrbitControls, Sky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
interface SunProps extends MeshProps {
  sunPosition: Vector3;
  latitude: number;
  month: number;
  timeOfDay: number;
  onSunlightChange: (sunlightPercentage: number) => void;
}


  export function Sun({ sunPosition, latitude, month, timeOfDay, onSunlightChange, ...props }: SunProps) {
    const meshRef = useRef<Mesh>(null);
  const [sunlightPercentage, setSunlightPercentage] = useState(0);

  useFrame(() => {
    // Calculate sunlight percentage based on sun position, latitude, month, and time of day
    const calculatedPercentage = calculateSunlightPercentage(sunPosition, latitude, month, timeOfDay);
    setSunlightPercentage(calculatedPercentage);
    onSunlightChange(calculatedPercentage);
  });

  function calculateSunlightPercentage(sunPosition: Vector3, latitude: number, month: number, timeOfDay: number): number {
    // Implement your sunlight percentage calculation logic here
    // This is a placeholder implementation
    const elevation = sunPosition.y;
    const basePercentage = (elevation + 1) / 2 * 100; // Convert elevation to percentage
    
    // Adjust for latitude (example: higher latitudes get less sunlight)
    const latitudeAdjustment = 1 - Math.abs(latitude) / 90;
    
    // Adjust for month (example: summer months get more sunlight)
    const monthAdjustment = 1 + Math.sin((month - 1) / 12 * Math.PI * 2) * 0.2;
    
    // Adjust for time of day (example: midday gets more sunlight)
    const timeAdjustment = Math.sin(timeOfDay / 24 * Math.PI) * 0.5 + 0.5;
    
    return Math.min(100, Math.max(0, basePercentage * latitudeAdjustment * monthAdjustment * timeAdjustment));
  }

  return (
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={sunPosition.toArray()} intensity={1} castShadow/>
      <Sky 
      sunPosition={sunPosition.toArray()} 
      rayleigh={0.155}
      mieCoefficient={0.002}
      mieDirectionalG={0.9999}
      />
      <OrbitControls />
      <mesh position={[0,8,0]} castShadow>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh ref={meshRef} {...props} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </Canvas>
  );
};

// export default Sun;