import React, { useState } from "react";
import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Wavy from "./wavy";

const App = () => {
  const [dpr, setDpr] = useState(1.5);
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [0, 0, 5],
      }}
      dpr={dpr}
    >
      <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}></PerformanceMonitor>
      <Wavy />
    </Canvas>
  );
};

export default App;
