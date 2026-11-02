import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Web3D Background - Pattern 1 (Layered Separation: Three.js Canvas + React UI)
 * Based on web3d-integration-patterns:
 * - Geometric cybernetic lattice: Wireframe Icosahedron + Dual Orbital Gimbal Rings + Inner Glowing Core
 * - Additive blending particle constellation field
 * - Smooth lerped mouse parallax and scroll-linked rotation
 * - Page Visibility API: pause render loop when tab is hidden to save GPU cycles
 * - Responsive DPR capping (max 1.75) and strict WebGL disposal lifecycle
 */
export default function Web3DBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0); // Transparent
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const purplePointLight = new THREE.PointLight(0x9b5cff, 2.8, 50);
    purplePointLight.position.set(12, 10, 12);
    scene.add(purplePointLight);

    const cyanPointLight = new THREE.PointLight(0x38bdf8, 1.6, 45);
    cyanPointLight.position.set(-12, -8, 8);
    scene.add(cyanPointLight);

    // 3. Main Cybernetic Lattice Group
    const latticeGroup = new THREE.Group();
    scene.add(latticeGroup);

    // 3a. Primary Wireframe Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(7.2, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x9b5cff,
      wireframe: true,
      transparent: true,
      opacity: 0.24,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    latticeGroup.add(icosahedron);

    // 3b. Inner Dense Glowing Core
    const innerGeometry = new THREE.IcosahedronGeometry(4.0, 0);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    latticeGroup.add(innerCore);

    // 3c. Dual Orbital Gimbal Rings (Astrolabe / Gyroscopic design)
    const ring1Geometry = new THREE.TorusGeometry(8.6, 0.04, 8, 80);
    const ringMaterial1 = new THREE.MeshBasicMaterial({
      color: 0xb994ff,
      transparent: true,
      opacity: 0.28,
    });
    const ring1 = new THREE.Mesh(ring1Geometry, ringMaterial1);
    ring1.rotation.x = Math.PI / 3;
    latticeGroup.add(ring1);

    const ring2Geometry = new THREE.TorusGeometry(9.4, 0.035, 8, 80);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ringMaterial2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    latticeGroup.add(ring2);

    // 4. Particle Constellation Field (Optimized BufferGeometry)
    const particleCount = window.innerWidth < 768 ? 65 : 135;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorPurple = new THREE.Color(0x9b5cff);
    const colorLavender = new THREE.Color(0xb994ff);
    const colorCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 48;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 36;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 28;

      const seed = Math.random();
      const chosenColor = seed > 0.6 ? colorPurple : (seed > 0.3 ? colorLavender : colorCyan);
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Smooth soft radial sprite
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 16;
    spriteCanvas.height = 16;
    const ctx = spriteCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(185,148,255,0.7)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const particleTexture = new THREE.CanvasTexture(spriteCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.42,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 5. Interaction State & Listeners
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollY = 0;
    let isTabVisible = true;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

      // Adaptive positioning for desktop vs mobile hero view
      if (window.innerWidth < 1024) {
        latticeGroup.position.set(0, 3.5, -5);
        latticeGroup.scale.set(0.65, 0.65, 0.65);
      } else {
        latticeGroup.position.set(7.5, 1.2, -2);
        latticeGroup.scale.set(1, 1, 1);
      }
    };

    handleResize();
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 6. Smooth Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isTabVisible) return;

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Lerp mouse coordinates for fluid camera feel
      currentMouseX += (targetMouseX - currentMouseX) * 0.045;
      currentMouseY += (targetMouseY - currentMouseY) * 0.045;

      // Rotate primary lattice
      icosahedron.rotation.x = elapsed * 0.11 + currentMouseY * 0.3 + scrollY * 0.0007;
      icosahedron.rotation.y = elapsed * 0.16 + currentMouseX * 0.4;

      // Counter-rotate inner core
      innerCore.rotation.y = -elapsed * 0.22;
      innerCore.rotation.z = elapsed * 0.1;

      // Orbital gimbal rings rotate on distinct axes
      ring1.rotation.z = elapsed * 0.18 + currentMouseX * 0.2;
      ring2.rotation.x = -elapsed * 0.14 + currentMouseY * 0.2;

      // Soft particle field drift
      particleSystem.rotation.y = elapsed * 0.015 + currentMouseX * 0.08;
      particleSystem.rotation.x = -currentMouseY * 0.06;

      // Camera subtle parallax
      camera.position.y = -scrollY * 0.0035;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Strict Cleanup Lifecycle (Pattern 1 Web3D Best Practice)
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Dispose geometries
      icoGeometry.dispose();
      innerGeometry.dispose();
      ring1Geometry.dispose();
      ring2Geometry.dispose();
      particleGeometry.dispose();

      // Dispose materials
      icoMaterial.dispose();
      innerMaterial.dispose();
      ringMaterial1.dispose();
      ringMaterial2.dispose();
      particleMaterial.dispose();

      // Dispose textures
      particleTexture.dispose();

      // Dispose renderer
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
