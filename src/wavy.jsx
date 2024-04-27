import { Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
// import { Perf } from "r3f-perf";
import { Suspense, useRef, useEffect } from "react";
import { easing } from "maath";
import { DoubleSide } from "three";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
import WaveModel from "./wavemodel";

export default function Wavy() {
  return (
    <>
      {/* <Perf position="top-left" /> */}

      <Suspense>
        <Environment
          files={"./night.hdr"}
          background={null}
        />
        <Responsive />
      </Suspense>
    </>
  );
}

const isMobile = window.innerWidth < 768;

function Responsive() {
  if (isMobile) {
    return (
      <>
         <WaveModel />
         {/* <Ring /> */}
      </>
    );
  } else {
    return (
      <>
      {/* <CameraRig> */}
        <WaveModel />
        {/* </CameraRig> */}
        <Ring />
        {/* <Light /> */}
        {/* <EffectComposer disableNormalPass>
          <Bloom mipmapBlur luminanceThreshold={0.2} radius={0.5} />
        </EffectComposer> */}
      </>
    );
  }
}

// function Light() {
//   const { viewport } = useThree();
//   const Lref = useRef();
//   const prevPosition = useRef({ x: 0, y: 0 });

//   useFrame(({ mouse }) => {
//     const x = (mouse.x * viewport.width) / 2;
//     const y = (mouse.y * viewport.height) / 2;

//     // Damping factor (adjust to control the damping effect)
//     const dampingFactor = 0.25;

//     // Calculate the new position by damping the change
//     const newX =
//       prevPosition.current.x + (x - prevPosition.current.x) * dampingFactor;
//     const newY =
//       prevPosition.current.y + (y - prevPosition.current.y) * dampingFactor;

//     Lref.current.position.set(newX, newY, 0);
//     prevPosition.current = { x: newX, y: newY };
//   });

//   return (
//     <pointLight ref={Lref} color={"#8900FF"} intensity={0.07} decay={10} />
//   );
// }

const Ring = () => {
  const RingRef = useRef();
  useEffect(() => {
    RingRef.current.rotation.set(-Math.PI / 0.25, -Math.PI / 2, 0);
  }, []);

  useFrame((state, delta) => {
    const xRotation = state.pointer.x; // Mouse movement along the X-axis
    const yRotation = state.pointer.y; // Mouse movement along the Y-axis

    const targetRotation = [
      -Math.PI / 0.1 - yRotation / 2,
      -Math.PI / 2 - xRotation,
      0,
    ];
    easing.dampE(RingRef.current.rotation, targetRotation, 0.25, delta);
  });

  return (
    <mesh
      rotation={[0, 0, 0]}
      ref={RingRef}
      scale={isMobile ? 0.9 : 1.2}
      // position-y={isMobile ? 0.35 : 0}
    >
      <ringGeometry args={[1.3, 1.35, 64]} />
      <meshBasicMaterial color={"#f53d8a"} side={DoubleSide} />
    </mesh>
  );
};

// function CameraRig({ children }) {
//   const group = useRef();
//   useFrame((state, delta) => {
//     easing.dampE(
//       group.current.rotation,
//       [state.pointer.y / 20, -state.pointer.x / 20, 0],
//       0.25,
//       delta
//     );
//   });
//   return <group ref={group}>{children}</group>;
// }
