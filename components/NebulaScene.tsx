'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Nebula } from './Nebula';
import { StarFlares } from './StarFlares';

export default function NebulaScene() {
  return (
    <div className="absolute top-0 right-0 w-[600px] h-[600px] z-0">
      <Canvas camera={{ position: [0, 5, 40], fov: 45 }}>
        
        <Suspense fallback={null}>
          <Nebula />
          <StarFlares />
        </Suspense>
        
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          autoRotate={true}
          autoRotateSpeed={0.2}
          maxDistance={100}
          minDistance={5}
        />
      </Canvas>
    </div>
  );
}
