// import { MeshProps, useFrame } from '@react-three/fiber';
// import { useRef } from 'react';
// import { Mesh } from 'three';


// // Textures
// const earthDayTexture = textureLoader.load('./earth/day.jpg')
// earthDayTexture.colorSpace = THREE.SRGBColorSpace
// earthDayTexture.anisotropy = 8

// const earthNightTexture = textureLoader.load('./earth/night.jpg')
// earthNightTexture.colorSpace = THREE.SRGBColorSpace
// earthNightTexture.anisotropy = 8

// const earthSpecularCloudsTexture = textureLoader.load('./earth/specularClouds.jpg')
// earthSpecularCloudsTexture.anisotropy = 8

// const earthGeometry = new THREE.SphereGeometry(2, 64, 64)
// const earthMaterial = new THREE.ShaderMaterial({
//     vertexShader: earthVertexShader,
//     fragmentShader: earthFragmentShader,
//     uniforms:
//     {
//         uDayTexture: new THREE.Uniform(earthDayTexture),
//         uNightTexture: new THREE.Uniform(earthNightTexture),
//         uSpecularCloudsTexture: new THREE.Uniform(earthSpecularCloudsTexture),
//         uSunDirection: new THREE.Uniform(new THREE.Vector3(0, 0, 1)),
//         uAtmosphereDayColor: new THREE.Uniform(new THREE.Color(earthParameters.atmosphereDayColor)),
//         uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color(earthParameters.atmosphereTwilightColor))
//     }
// })
// const earth = new THREE.Mesh(earthGeometry, earthMaterial)
// earth.position.y = -1.2
// scene.add(earth)

// // Atmosphere
// const atmosphereMaterial = new THREE.ShaderMaterial({
//     side: THREE.BackSide,
//     transparent: true,
//     vertexShader: atmosphereVertexShader,
//     fragmentShader: atmosphereFragmentShader,
//     uniforms:
//     {
//         uSunDirection: new THREE.Uniform(new THREE.Vector3(0, 0, 1)),
//         uAtmosphereDayColor: new THREE.Uniform(new THREE.Color(earthParameters.atmosphereDayColor)),
//         uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color(earthParameters.atmosphereTwilightColor))
//     },
// })

// const atmosphere = new THREE.Mesh(earthGeometry, atmosphereMaterial)
// atmosphere.scale.set(1.04, 1.04, 1.04)
// atmosphere.position.y = -1.2
// scene.add(atmosphere)

// /**
//  * Sun
//  */
// // Coordinates
// const sunSpherical = new THREE.Spherical(1, Math.PI * 0.2, 4.6)
// const sunDirection = new THREE.Vector3()





// const Sun: React.FC<MeshProps> = (props) => {
//   const meshRef = useRef<Mesh>(null);

//   useFrame((state, delta) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += delta; // Rotate cube every frame
//     }
//   });

//   return (
//     <mesh ref={meshRef} {...props}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color="white" />
//     </mesh>
//   );
// };

// export default Sun;