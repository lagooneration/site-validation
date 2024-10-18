"use client"
import React from "react"
import { Canvas } from "@react-three/fiber"
import { Box } from "@react-three/drei"
import { useControls } from "leva"
import { OrbitControls } from "@react-three/drei"
// import { location1 } from "@/utils/index"
import TestGeo from "./test-geo"
// import { useCameraReset } from "@/lib/useCameraReset"
// import { useThree } from "@react-three/fiber"
// import { useEffect } from "react"
// import { Vector3 } from "three"
// import { useSearchParams } from 'next/navigation'




// const initialCameraPosition = new Vector3(0, 0, 5);


export function SunCanvas() {
    // const searchParams = useSearchParams()
    // const mapTexture = searchParams.get("screenshot")
    // console.log(mapTexture)

    


    const color = useControls({
        value: '#84daff',
      })
      const bg = useControls({
        bg: '#0a0c17',
      })
       

  return (
    <Canvas shadows>
        <color attach="background" args={[bg.bg]} />
        <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {/* <directionalLight intensity={2.0} position={[2, 2, 0]} /> */}
      <Box position={[0, 0, 0]} args={[1, 1, 1]} castShadow>
        <meshBasicMaterial color={color.value} />
      </Box>
      <mesh position={[2, -2, 0]}>
      <boxGeometry args={[2, 1, 1]}/>
      <meshNormalMaterial />
      </mesh>
      <TestGeo texturePath="/assets/location1.png" position={[0, 0, -0.5]} castShadow/>
    </Canvas>
  )
}

// export default SunCanvas;