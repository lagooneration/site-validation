// import { MeshProps, useFrame } from '@react-three/fiber';
// import { useRef, useMemo } from 'react';
// import { Mesh, TextureLoader, SRGBColorSpace, ShaderMaterial, Vector3, Color, BackSide, Uniform } from 'three';
// import { useControls } from 'leva';
// import { useSlider } from '@/components/ui/SliderContext';

// // Textures
// const textureLoader = new TextureLoader();
// const earthDayTexture = textureLoader.load('./earth/day.jpg');
// earthDayTexture.colorSpace = SRGBColorSpace;
// earthDayTexture.anisotropy = 8;

// const earthNightTexture = textureLoader.load('./earth/night.jpg');
// earthNightTexture.colorSpace = SRGBColorSpace;
// earthNightTexture.anisotropy = 8;

// const earthSpecularCloudsTexture = textureLoader.load('./earth/specularClouds.jpg');
// earthSpecularCloudsTexture.anisotropy = 8;

// const earthParameters = {
//   atmosphereDayColor: '#87CEEB',
//   atmosphereTwilightColor: '#FFA500'
// };

// const Atmosphere: React.FC<MeshProps> = (props) => {
//   const meshRef = useRef<Mesh>(null);
//   const { value } = useSlider();
// //   console.log(value)
//   const phi = value.daytime / (60 * 24) * Math.PI * 2; 
//   const theta = (value.month - 1) * (Math.PI * 2) / 12;

// //   const { phi, theta } = useControls({
// //     phi: { value: Math.PI * 0.2, min: -3.0, max: Math.PI, step: 0.01 },
// //     theta: { value: 4.6, min: 0, max: Math.PI * 2, step: 0.01 }
// //   });

//     // const { theta } = useControls({
//     //     theta: { value: 4.6, min: 0, max: Math.PI * 2, step: 0.01 }
//     // });

//   const sunDirection = useMemo(() => {
//     const direction = new Vector3();
//     direction.setFromSpherical({ radius: 1, phi, theta });
//     return direction;
//   }, [phi, theta]);
    
//   // const earthGeometry = useMemo(() => new SphereGeometry(2, 64, 64), []);

//   const earthMaterial = useMemo(() => new ShaderMaterial({
//     vertexShader: `
//       varying vec2 vUv;
//       varying vec3 vNormal;
//       varying vec3 vPosition;

//       void main() {
//         vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//         gl_Position = projectionMatrix * viewMatrix * modelPosition;

//         vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

//         vUv = uv;
//         vNormal = modelNormal;
//         vPosition = modelPosition.xyz;
//       }
//     `,
//     fragmentShader: `
//       uniform sampler2D uDayTexture;
//       uniform sampler2D uNightTexture;
//       uniform sampler2D uSpecularCloudsTexture;
//       uniform vec3 uSunDirection;
//       uniform vec3 uAtmosphereDayColor;
//       uniform vec3 uAtmosphereTwilightColor;

//       varying vec2 vUv;
//       varying vec3 vNormal;
//       varying vec3 vPosition;

//       void main() {
//         vec3 viewDirection = normalize(vPosition - cameraPosition);
//         vec3 normal = normalize(vNormal);
//         vec3 color = vec3(0.0);

//         float sunOrientation = dot(uSunDirection, normal);

//         float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
//         vec3 dayColor = texture2D(uDayTexture, vUv).rgb;
//         vec3 nightColor = texture2D(uNightTexture, vUv).rgb;
//         color = mix(nightColor, dayColor, dayMix);

//         vec2 specularCloudsColor = texture2D(uSpecularCloudsTexture, vUv).rg;

//         float cloudsMix = smoothstep(0.5, 1.0, specularCloudsColor.g);
//         cloudsMix *= dayMix;
//         color = mix(color, vec3(1.0), cloudsMix);

//         float fresnel = dot(viewDirection, normal) + 1.0;
//         fresnel = pow(fresnel, 2.0);

//         float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
//         vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
//         color = mix(color, atmosphereColor, fresnel * atmosphereDayMix);

//         vec3 reflection = reflect(-uSunDirection, normal);
//         float specular = -dot(reflection, viewDirection);
//         specular = max(specular, 0.0);
//         specular = pow(specular, 32.0);
//         specular *= specularCloudsColor.r;

//         vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);
//         color += specular * specularColor;

//         gl_FragColor = vec4(color, 1.0);
//       }
//     `,
//     uniforms: {
//       uDayTexture: new Uniform(earthDayTexture),
//       uNightTexture: new Uniform(earthNightTexture),
//       uSpecularCloudsTexture: new Uniform(earthSpecularCloudsTexture),
//       uSunDirection: new Uniform(sunDirection),
//       uAtmosphereDayColor: new Uniform(new Color(earthParameters.atmosphereDayColor)),
//       uAtmosphereTwilightColor: new Uniform(new Color(earthParameters.atmosphereTwilightColor))
//     }
//   }), [sunDirection]);

//   const atmosphereMaterial = useMemo(() => new ShaderMaterial({
//     side: BackSide,
//     transparent: true,
//     vertexShader: `
//       varying vec3 vNormal;
//       varying vec3 vPosition;

//       void main() {
//         vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//         gl_Position = projectionMatrix * viewMatrix * modelPosition;

//         vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

//         vNormal = modelNormal;
//         vPosition = modelPosition.xyz;
//       }
//     `,
//     fragmentShader: `
//       uniform vec3 uSunDirection;
//       uniform vec3 uAtmosphereDayColor;
//       uniform vec3 uAtmosphereTwilightColor;

//       varying vec3 vNormal;
//       varying vec3 vPosition;

//       void main() {
//         vec3 viewDirection = normalize(vPosition - cameraPosition);
//         vec3 normal = normalize(vNormal);
//         vec3 color = vec3(0.0);

//         float sunOrientation = dot(uSunDirection, normal);

//         float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
//         vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
//         color = mix(color, atmosphereColor, atmosphereDayMix);
//         color += atmosphereColor;

//         float edgeAlpha = dot(viewDirection, normal);
//         edgeAlpha = smoothstep(0.0, 0.5, edgeAlpha);

//         float dayAlpha = smoothstep(-0.5, 0.0, sunOrientation);

//         float alpha = edgeAlpha * dayAlpha;

//         gl_FragColor = vec4(color, alpha);
//       }
//     `,
//     uniforms: {
//       uSunDirection: new Uniform(sunDirection),
//       uAtmosphereDayColor: new Uniform(new Color(earthParameters.atmosphereDayColor)),
//       uAtmosphereTwilightColor: new Uniform(new Color(earthParameters.atmosphereTwilightColor))
//     },
//   }), [sunDirection]);

//   useFrame(() => {
//     if (earthMaterial.uniforms) {
//       earthMaterial.uniforms.uSunDirection.value.copy(sunDirection);
//     }
//     if (atmosphereMaterial.uniforms) {
//       atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDirection);
//     }
//   });

//   return (
//     <>
    
//       <mesh ref={meshRef} {...props}>
//         <sphereGeometry args={[2, 64, 64]} />
//         <primitive object={earthMaterial} attach="material" />
//       </mesh>
//       <mesh>
//         <sphereGeometry args={[2.08, 64, 64]} />
//         <primitive object={atmosphereMaterial} attach="material" />
//       </mesh>
//     </>
//   );
// };

// export default Atmosphere;