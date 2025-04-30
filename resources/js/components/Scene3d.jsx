import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Model component that loads your GLB
const Model = ({ url }) => {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
};

// Main scene component
const Scene3D = ({ modelUrl }) => {
    return (
        <div className="h-96 w-full">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: "#f0f0f0" }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />

                <Suspense fallback={null}>
                    <Model url={modelUrl} />
                </Suspense>

                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default Scene3D;
