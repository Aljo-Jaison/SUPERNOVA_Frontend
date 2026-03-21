import React, { useMemo } from 'react';
import * as THREE from 'three';

export function StarFlares() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();
    
    // Draw cross
    const gradientX = ctx.createLinearGradient(0, 128, 256, 128);
    gradientX.addColorStop(0, 'rgba(255,255,255,0)');
    gradientX.addColorStop(0.4, 'rgba(255,255,255,0.8)');
    gradientX.addColorStop(0.5, 'rgba(255,255,255,1)');
    gradientX.addColorStop(0.6, 'rgba(255,255,255,0.8)');
    gradientX.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = gradientX;
    ctx.fillRect(0, 127, 256, 2);
    
    const gradientY = ctx.createLinearGradient(128, 0, 128, 256);
    gradientY.addColorStop(0, 'rgba(255,255,255,0)');
    gradientY.addColorStop(0.4, 'rgba(255,255,255,0.8)');
    gradientY.addColorStop(0.5, 'rgba(255,255,255,1)');
    gradientY.addColorStop(0.6, 'rgba(255,255,255,0.8)');
    gradientY.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = gradientY;
    ctx.fillRect(127, 0, 2, 256);
    
    // Center glow
    const gradientRadial = ctx.createRadialGradient(128, 128, 0, 128, 128, 32);
    gradientRadial.addColorStop(0, 'rgba(255,255,255,1)');
    gradientRadial.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gradientRadial.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = gradientRadial;
    ctx.beginPath();
    ctx.arc(128, 128, 32, 0, Math.PI * 2);
    ctx.fill();
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const flarePositions = [
    [0, 0, 0], // Center star
    [12, 6, -5],
    [-10, -8, 2],
    [18, -3, -10],
    [-15, 10, -8],
    [8, -12, -15],
    [-22, 3, 5],
    [10, 15, -2],
  ];

  return (
    <group>
      {flarePositions.map((pos, i) => (
        <sprite key={i} position={pos as [number, number, number]} scale={i === 0 ? [15, 15, 1] : [4, 4, 1]}>
          <spriteMaterial map={texture} color="#ffffff" transparent={true} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      ))}
    </group>
  );
}
