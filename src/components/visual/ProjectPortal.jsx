import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Project Portal - Concentric Holographic Frames
 * Concept: "Gateway to engineering artifacts & real-time simulations"
 * - Concentric wireframe rectangular frames + Purple/Cobalt Diamond Core
 * - Dark ambient grounding
 * - Complies with web3d-integration-patterns (DPR clamp <= 1.75, Visibility API, thorough disposal)
 */
export default function ProjectPortal({ className = "w-full h-[220px] sm:h-[260px]" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 300;
    let height = container.clientHeight || 220;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 6.0);
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

    const ambientLight = new THREE.AmbientLight(0x181824, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xB994FF, 3.0);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const cobaltLight = new THREE.DirectionalLight(0x4169FF, 2.2);
    cobaltLight.position.set(-3, -1, -2);
    scene.add(cobaltLight);

    const group = new THREE.Group();
    scene.add(group);

    // Ground Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 64;
    shadowCanvas.height = 64;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sGrad.addColorStop(0, 'rgba(155, 92, 255, 0.2)');
    sGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.6)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);
    const shadowTex = track(new THREE.CanvasTexture(shadowCanvas));

    const shadowGeo = track(new THREE.PlaneGeometry(2.5, 2.5));
    const shadowMat = track(new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.8, depthWrite: false }));
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.3, 0);
    scene.add(shadowMesh);

    // Concentric Frames
    const frames = [];
    const frameMat = track(new THREE.LineBasicMaterial({ color: 0x9B5CFF, transparent: true, opacity: 0.75 }));
    const cobaltFrameMat = track(new THREE.LineBasicMaterial({ color: 0x4169FF, transparent: true, opacity: 0.9 }));

    for (let i = 0; i < 3; i++) {
      const size = 1.0 + i * 0.45;
      const fGeo = track(new THREE.EdgesGeometry(new THREE.BoxGeometry(size, size * 0.75, 0.08)));
      const fMesh = new THREE.LineSegments(fGeo, i === 1 ? cobaltFrameMat : frameMat);
      frames.push(fMesh);
      group.add(fMesh);
    }

    // Floating Core Diamond
    const jewelGeo = track(new THREE.OctahedronGeometry(0.35, 0));
    const jewelMat = track(new THREE.MeshStandardMaterial({
      color: 0x9B5CFF,
      emissive: 0x4169FF,
      emissiveIntensity: 0.5,
      metalness: 0.92,
      roughness: 0.15,
    }));
    const jewelMesh = new THREE.Mesh(jewelGeo, jewelMat);
    group.add(jewelMesh);

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
      width = container.clientWidth || 300;
      height = container.clientHeight || 220;
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
      group.rotation.y = elapsed * 0.2;
      group.rotation.x = Math.sin(elapsed * 0.3) * 0.08;
      group.position.y = Math.sin(elapsed * 0.9) * 0.04;

      frames.forEach((f, idx) => {
        f.rotation.z = Math.sin(elapsed * 0.5 + idx * 0.4) * 0.12;
      });
      jewelMesh.rotation.y = elapsed * 0.6;

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
      <div className="absolute top-2.5 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#121218] border border-white/[0.08] text-[9px] font-mono text-[#F5F4F8]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#9B5CFF]" />
        <span>FIG. 04 &bull; PROJECT PORTAL</span>
      </div>
    </div>
  );
}
