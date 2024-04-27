import React from "react";
import { useGLTF } from "@react-three/drei";
import { MeshWobbleMaterial } from "@react-three/drei";
import { DoubleSide } from "three";

export default function WaveModel(props) {
  const isMobile = window.innerWidth < 768;

  const { nodes, materials } = useGLTF("./plasticPlane.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Plane.geometry}
        scale={ [0.15, 0.25, 0.35]}
        rotation={ [0, Math.PI / 2, Math.PI / 1.25]}
      >
        <MeshWobbleMaterial
          side={DoubleSide}
          color={"#500F2D"}
          factor={isMobile ? 1.5 : 0.5}
          metalness={1}
          roughness={0.5}
          envMapIntensity={isMobile ? 30 : 15}
          speed={1}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./plasticPlane.glb");
