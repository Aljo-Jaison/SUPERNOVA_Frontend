/* eslint-disable react-hooks/purity */
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

const noise3D = createNoise3D();

// Fractional Brownian Motion for the cloudy/wavy edges
function fbm(x: number, y: number, z: number) {
  let total = 0;
  let frequency = 1.5;
  let amplitude = 1;
  let maxValue = 0;
  for (let i = 0; i < 4; i++) {
    total += noise3D(x * frequency, y * frequency, z * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return total / maxValue;
}

export function Nebula() {
  const particlesCount = 500000;
  
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const col = new Float32Array(particlesCount * 3);
    const siz = new Float32Array(particlesCount);
    
    let i = 0;
    
    // 1. Background Stars (10,000)
    const starCount = 10000;
    for (let j = 0; j < starCount; j++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.pow(Math.random(), 1/3) * 150 + 20; 
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      const intensity = Math.random() * 0.8 + 0.2;
      col[i * 3] = intensity;
      col[i * 3 + 1] = intensity;
      col[i * 3 + 2] = intensity;
      
      siz[i] = Math.random() * 2.0 + 0.5;
      i++;
    }
    
    // 2. Wide Disk / Jet (200,000)
    const diskCount = 200000;
    for (let j = 0; j < diskCount; j++) {
      const r = Math.pow(Math.random(), 4) * 80; 
      const theta = Math.random() * Math.PI * 2;
      
      // Very thin disk, slightly thicker in the middle
      const thickness = Math.max(0.02, Math.exp(-r / 5) * 1.5);
      const y = (Math.random() - 0.5) * thickness;
      
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = r * Math.sin(theta);
      
      // Brighter in the center
      const intensity = Math.min(1.0, 4.0 / (r + 0.5));
      col[i * 3] = intensity;
      col[i * 3 + 1] = intensity;
      col[i * 3 + 2] = intensity;
      
      siz[i] = Math.random() * 1.5 + 0.5;
      i++;
    }
    
    // 3. Wavy Shell (290,000)
    const shellCount = particlesCount - i;
    for (let j = 0; j < shellCount; j++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const nx = Math.sin(phi) * Math.cos(theta);
      const ny = Math.sin(phi) * Math.sin(theta);
      const nz = Math.cos(phi);
      
      // Base radius
      let baseR = 12.0;
      
      // Add fractal noise to radius
      const n = fbm(nx * 1.2, ny * 1.2, nz * 1.2);
      baseR += n * 5.0;
      
      // Add thickness (volume)
      const thickness = Math.pow(Math.random(), 2) * 3.0;
      const r = baseR + thickness;
      
      pos[i * 3] = r * nx;
      pos[i * 3 + 1] = r * ny;
      pos[i * 3 + 2] = r * nz;
      
      // Color based on density/thickness
      const intensity = Math.max(0.1, 1.0 - (thickness / 3.0));
      col[i * 3] = intensity;
      col[i * 3 + 1] = intensity;
      col[i * 3 + 2] = intensity;
      
      siz[i] = Math.random() * 1.5 + 0.5;
      i++;
    }
    
    return [pos, col, siz];
  }, []);
  
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    time: { value: 0 },
  }), []);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <group rotation={[Math.PI / 8, 0, Math.PI / 12]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[sizes, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={uniforms}
          vertexShader={`
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            void main() {
              vColor = color;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (30.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            void main() {
              // Circular particle
              float d = distance(gl_PointCoord, vec2(0.5));
              if (d > 0.5) discard;
              
              // Soft edge
              float alpha = smoothstep(0.5, 0.1, d);
              gl_FragColor = vec4(vColor, alpha * 0.6);
            }
          `}
        />
      </points>
      {/* Central bright star */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" distance={20} />
    </group>
  );
}
