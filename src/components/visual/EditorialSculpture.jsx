import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Box } from 'lucide-react';

/**
 * DigitalSculpture - Futuristic Monolith & Crystalline Torus
 * Art Direction:
 * - Frosted Optical Crystal Box with purple edge highlights
 * - Interlocking lustrous Cobalt/Purple Torus
 * - Core brushed titanium octahedron with pulsing interior
 * - Deep dark surface grounding
 * - Complies strictly with web3d-integration-patterns (DPR clamp <= 1.75, Visibility API, thorough disposal)
 */
export default function EditorialSculpture({ className = "w-full h-[460px] sm:h-[520px]" }) {
  const mountRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 460;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 8.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const disposables = [];
    const track = (item) => {
      if (item) disposables.push(item);
      return item;
    };

    // 2. Futuristic Cybernetic Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x181824, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xB994FF, 3.2);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const cobaltRim = new THREE.DirectionalLight(0x4169FF, 2.8);
    cobaltRim.position.set(-5, 2, -4);
    scene.add(cobaltRim);

    const softFill = new THREE.DirectionalLight(0x9B5CFF, 1.2);
    softFill.position.set(0, -3, 4);
    scene.add(softFill);

    // 3. Master Sculpture Group
    const masterGroup = new THREE.Group();
    masterGroup.position.set(0, 0.2, 0);
    scene.add(masterGroup);

    // 4. Soft Contact Ground Shadow (Subtle dark purple vignette)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 64;
    shadowCanvas.height = 64;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sGrad.addColorStop(0, 'rgba(155, 92, 255, 0.25)');
    sGrad.addColorStop(0.35, 'rgba(5, 5, 8, 0.6)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);
    const shadowTex = track(new THREE.CanvasTexture(shadowCanvas));

    const shadowGeo = track(new THREE.PlaneGeometry(3.6, 3.6));
    const shadowMat = track(new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    }));
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, -1.75, 0);
    scene.add(shadowPlane);

    // 5. Outer Frosted Optical Crystal Box
    const boxGeo = track(new THREE.BoxGeometry(1.9, 1.9, 1.9, 2, 2, 2));
    const glassMaterial = track(new THREE.MeshPhysicalMaterial({
      color: 0x12121e,
      emissive: 0x9B5CFF,
      emissiveIntensity: 0.08,
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.82,
      ior: 1.55,
      thickness: 1.4,
      transparent: true,
      opacity: 0.78,
      specularIntensity: 1.0,
      depthWrite: true,
      side: THREE.DoubleSide,
    }));
    const glassMesh = new THREE.Mesh(boxGeo, glassMaterial);
    masterGroup.add(glassMesh);

    // Fine Edge Chamfer Lines
    const edgeGeo = track(new THREE.EdgesGeometry(boxGeo, 24));
    const edgeMat = track(new THREE.LineBasicMaterial({
      color: 0xB994FF,
      transparent: true,
      opacity: 0.6,
    }));
    const glassEdges = new THREE.LineSegments(edgeGeo, edgeMat);
    glassMesh.add(glassEdges);

    // 6. Interlocking Lustrous Cobalt/Purple Torus
    const torusGeo = track(new THREE.TorusGeometry(1.25, 0.22, 24, 64));
    const torusMaterial = track(new THREE.MeshStandardMaterial({
      color: 0x4169FF,
      emissive: 0x9B5CFF,
      emissiveIntensity: 0.45,
      metalness: 0.92,
      roughness: 0.18,
    }));
    const torusMesh = new THREE.Mesh(torusGeo, torusMaterial);
    torusMesh.rotation.x = Math.PI / 3;
    torusMesh.rotation.y = Math.PI / 5;
    masterGroup.add(torusMesh);

    // 7. Core Titanium Octahedron
    const coreGeo = track(new THREE.OctahedronGeometry(0.55, 0));
    const coreMat = track(new THREE.MeshStandardMaterial({
      color: 0x0E0E14,
      emissive: 0x9B5CFF,
      emissiveIntensity: 0.6,
      metalness: 0.95,
      roughness: 0.15,
    }));
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);

    const coreEdgeGeo = track(new THREE.EdgesGeometry(coreGeo));
    const coreEdgeMat = track(new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    }));
    const coreEdges = new THREE.LineSegments(coreEdgeGeo, coreEdgeMat);
    coreMesh.add(coreEdges);

    // 8. Subtle Floating Orbit Ring
    const orbitGeo = track(new THREE.TorusGeometry(1.75, 0.008, 8, 64));
    const orbitMat = track(new THREE.MeshBasicMaterial({
      color: 0xB994FF,
      transparent: true,
      opacity: 0.4,
    }));
    const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitRing.rotation.x = Math.PI / 2.4;
    masterGroup.add(orbitRing);

    // 9. Interactive Parallax & Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let isVisible = true;
    let animationFrameId = null;
    const clock = new THREE.Clock();

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = normX * 0.35;
      mouseY = normY * 0.25;
    };

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting && document.visibilityState === "visible";
      });
    }, { threshold: 0.1 });
    observer.observe(container);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 460;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Weighted Calm Rotation
      if (autoRotateRef.current) {
        targetRotY = elapsed * 0.22 + mouseX;
        targetRotX = 0.2 + Math.sin(elapsed * 0.35) * 0.1 + mouseY;
      } else {
        targetRotY = mouseX * 1.5;
        targetRotX = 0.2 + mouseY * 1.2;
      }

      masterGroup.rotation.y += (targetRotY - masterGroup.rotation.y) * 0.04;
      masterGroup.rotation.x += (targetRotX - masterGroup.rotation.x) * 0.04;

      // Independent Gentle Floating Sine
      masterGroup.position.y = 0.2 + Math.sin(elapsed * 0.8) * 0.08;

      // Internal Core Counter-Rotation
      coreMesh.rotation.y = -elapsed * 0.45;
      coreMesh.rotation.z = elapsed * 0.25;

      // Subtle breathing scale on shadow plane
      const shadowScale = 1.0 - Math.sin(elapsed * 0.8) * 0.06;
      shadowPlane.scale.set(shadowScale, shadowScale, 1);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
      resizeObserver.disconnect();

      disposables.forEach((item) => {
        try {
          if (item && typeof item.dispose === "function") item.dispose();
        } catch (e) {
          // silent
        }
      });

      if (renderer) {
        renderer.dispose();
        try {
          renderer.forceContextLoss();
        } catch (e) {
          // silent
        }
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div className={`relative ${className} select-none overflow-hidden rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.8)]`}>
      {/* Three.js Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Figure Label */}
      <div className="absolute top-3.5 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#121218] border border-white/[0.08] text-[10px] font-mono text-[#F5F4F8] tracking-wider uppercase">
          <Box className="w-3 h-3 text-[#9B5CFF]" />
          <span>FIG. 01 &bull; DIGITAL MONOLITH</span>
        </div>
      </div>

      {/* Top Right Material Metadata Stamp */}
      <div className="absolute top-3.5 right-4 z-10 hidden sm:flex items-center pointer-events-none">
        <span className="text-[10px] font-mono text-[#AAA7B2] tracking-widest uppercase">
          CRYSTALLINE &times; COBALT CORE
        </span>
      </div>

      {/* Bottom Right Control HUD */}
      <div className="absolute bottom-3.5 right-4 z-10 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono border transition-all ${
            autoRotate
              ? "bg-[#9B5CFF]/15 text-[#B994FF] border-[#9B5CFF]/40 shadow-glow-purple"
              : "bg-[#121218] text-[#706D79] border-white/[0.08] hover:text-[#F5F4F8]"
          }`}
          title="Bật / Tắt chế độ tự động xoay"
        >
          <RotateCw className={`w-3 h-3 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
          <span>{autoRotate ? "Auto-Rotate" : "Manual"}</span>
        </button>
      </div>

      {/* Bottom Left Physical Metadata */}
      <div className="absolute bottom-3.5 left-4 z-10 flex items-center gap-2 pointer-events-none">
        <span className="text-[10px] font-mono text-[#706D79]">
          PBR REFRACTION &bull; 60 FPS
        </span>
      </div>
    </div>
  );
}
