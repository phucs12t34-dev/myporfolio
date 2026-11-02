import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Futuristic Neural Core - Crystalline Kinetic Sculpture
 * Concept: "Curiosity, logic, and intellectual exploration"
 * - Translucent Optical Glass Sphere + Purple/Cobalt Gimbal Rings + Core Icosahedron
 * - Dark ambient grounding
 * - Complies with web3d-integration-patterns (DPR clamp <= 1.75, Visibility API, thorough disposal)
 */
export default function NeuralCore({ className = "w-full h-[320px] sm:h-[360px]" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 340;
    let height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);
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

    // Dark Lighting
    const ambientLight = new THREE.AmbientLight(0x181824, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xB994FF, 3.0);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const cobaltLight = new THREE.DirectionalLight(0x4169FF, 2.2);
    cobaltLight.position.set(-4, -2, -3);
    scene.add(cobaltLight);

    // Master Group
    const group = new THREE.Group();
    scene.add(group);

    // Soft Contact Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 64;
    shadowCanvas.height = 64;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sGrad.addColorStop(0, 'rgba(155, 92, 255, 0.22)');
    sGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.6)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);
    const shadowTex = track(new THREE.CanvasTexture(shadowCanvas));

    const shadowGeo = track(new THREE.PlaneGeometry(2.8, 2.8));
    const shadowMat = track(new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    }));
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.6, 0);
    scene.add(shadowMesh);

    // 1. Core Faceted Icosahedron (Electric Purple/Cobalt)
    const coreGeo = track(new THREE.IcosahedronGeometry(0.85, 0));
    const coreMat = track(new THREE.MeshStandardMaterial({
      color: 0x0E0E14,
      emissive: 0x9B5CFF,
      emissiveIntensity: 0.55,
      metalness: 0.92,
      roughness: 0.18,
    }));
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    const edgeGeo = track(new THREE.EdgesGeometry(coreGeo));
    const edgeMat = track(new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 }));
    const edgeMesh = new THREE.LineSegments(edgeGeo, edgeMat);
    coreMesh.add(edgeMesh);

    // 2. Optical Glass Translucent Sphere
    const sphereGeo = track(new THREE.SphereGeometry(1.4, 32, 32));
    const sphereMat = track(new THREE.MeshPhysicalMaterial({
      color: 0x12121E,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.82,
      ior: 1.5,
      thickness: 1.2,
      transparent: true,
      opacity: 0.78,
    }));
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphereMesh);

    // 3. Satin Purple/Cobalt Gimbal Ring
    const ringGeo = track(new THREE.TorusGeometry(1.65, 0.04, 16, 64));
    const ringMat = track(new THREE.MeshStandardMaterial({
      color: 0x9B5CFF,
      emissive: 0x4169FF,
      emissiveIntensity: 0.4,
      metalness: 0.88,
      roughness: 0.16,
    }));
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // Animation Loop
    let animationFrameId = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    const onVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        isVisible = e.isIntersecting && document.visibilityState === "visible";
      });
    }, { threshold: 0.1 });
    observer.observe(container);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || 340;
      height = container.clientHeight || 320;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const resizeObs = new ResizeObserver(onResize);
    resizeObs.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      group.rotation.y = elapsed * 0.25;
      group.rotation.x = Math.sin(elapsed * 0.4) * 0.15;
      group.position.y = Math.sin(elapsed * 0.9) * 0.06;

      ringMesh.rotation.z = elapsed * 0.35;
      coreMesh.rotation.y = -elapsed * 0.45;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
      resizeObs.disconnect();

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
    <div className={`relative ${className} select-none overflow-hidden rounded-2xl bg-[#0B0B0F] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex items-center justify-center`}>
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#121218] border border-white/[0.08] text-[10px] font-mono text-[#F5F4F8]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#9B5CFF]" />
        <span>FIG. 02 &bull; NEURAL CORE</span>
      </div>
    </div>
  );
}
