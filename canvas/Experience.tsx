import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Text } from '@react-three/drei';
import Land from '@/components/three/Land';
import Earth from '@/components/three/Earth';
// import Cube from '@/components/three/Cube';
// import SunPath from '@/components/three/Sunpath';
import { SunSimulation } from '@/components/sun-simulation';
import { useControls } from 'leva';
import { Vector3 } from 'three';



const Experience: React.FC<{ uploadedImage: File | null }> = ({ uploadedImage }) => {
    const texturePath = uploadedImage ? URL.createObjectURL(uploadedImage) : null;
    
    const { showGrid, showCompass, showEarth } = useControls({
        showGrid: { value: true, label: 'Grid' },
        showCompass: { value: false, label: 'Compass' },
        showEarth: { value: true, label: 'Earth' },
        // showCube: { value: false, label: 'Cube' }
    });

    const compassDirections = useMemo(() => {
        const radius = 50.0;
        return [
          { label: 'N', position: new Vector3(0, 0, -radius) },
          { label: 'S', position: new Vector3(0, 0, radius) },
          { label: 'E', position: new Vector3(radius, 0, 0) },
          { label: 'W', position: new Vector3(-radius, 0, 0) },
        ];
      }, []);

    return (
        <>
            <Canvas camera={{ position: [72, -72, -128], fov: 75, near: 0.1, far: 1000 }}>
                <ambientLight intensity={0.2}/>
                {/* <SunPath /> */}
                {showEarth && <Earth />}
                {/* {showCube && <Cube />} */}
                {showCompass && compassDirections.map(({ label, position }) => (
                <Text
                    key={label}
                    position={position.add(new Vector3(0, 1, 1))}
                    rotation={[-Math.PI / 3, 0, 0]}
                    strokeWidth={0.08}
                    strokeColor="black"
                    color={label === 'N' ? 'red' : 'white'}
                    fontSize={8}
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
                ))}
                {texturePath && (
                    <Land texturePath={texturePath} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
                )}
                {showGrid && <Grid args={[100, 100]} position={[0, -0.5, 0]} />}
                <SunSimulation />
                <OrbitControls />
            </Canvas>
        </>
    );
};

export default Experience;