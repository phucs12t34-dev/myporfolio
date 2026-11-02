import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Editorial Web3D Background - Minimalist Fine Particles & Spatial Dust
 * Conforms to web3d-integration-patterns:
 * - Subtle ivory atmosphere with restrained geometric particles
 * - Throttles / pauses rendering when tab is hidden or reduced motion is active
 * - Strict WebGL disposal on unmount
 */
export default function Web3DBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0); // Transparent over #F7F5F0
    container.appendChild(renderer.domElement);

    // 2. Fine Editorial Dust Particles (Warm gray, muted sand, subtle cobalt)
    const particleCount = prefersReducedMotion ? 40 : 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cCobalt = new THREE.Color('#304FFE');
    const cCharcoal = new THREE.Color('#66645F');
    const cSand = new THREE.Color('#D8D5CD');

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const pick = Math.random();
      const col = pick < 0.15 ? cCobalt : (pick < 0.6 ? cSand : cCharcoal);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(23, 23, 23, 0.45)');
    grad.addColorStop(0.5, 'rgba(48, 79, 254, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Animation State & Parallax
    let animationFrameId = null;
    let mouseX = 0;
    let mouseY = 0;
    let isVisible = true;
    const clock = new THREE.Clock();

    const onMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = normX * 0.5;
      mouseY = normY * 0.5;
    };

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || prefersReducedMotion) return;

      const elapsed = clock.getElapsedTime();
      particles.rotation.y = elapsed * 0.02 + mouseX * 0.1;
      particles.rotation.x = elapsed * 0.015 + mouseY * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      geometry.dispose();
      material.dispose();
      pTexture.dispose();
      renderer.dispose();
      try {
        renderer.forceContextLoss();
      } catch (e) {
        // silent
      }
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
}
