import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Editorial Algorithmic Structure - Minimalist Mathematical Sculpture
 * Concept: "Logic, Discrete Mathematics, and Computational Rigour"
 * - Interconnected geometric forms: Matte Cobalt Octahedron, Titanium Cube & Fine Struts
 * - Realistic soft ground shadow for spatial grounding
 * - Complies with web3d-integration-patterns (DPR clamp <= 1.75, Visibility API, thorough disposal)
 */
export default function AlgorithmicStructure({ className = "w-full h-[280px] sm:h-[320px]" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.0, 7.5);
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

    const ambientLight = new THREE.AmbientLight(0xf0eee8, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.2);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const cobaltLight = new THREE.DirectionalLight(0x304FFE, 1.5);
    cobaltLight.position.set(-4, -1, -3);
    scene.add(cobaltLight);

    const group = new THREE.Group();
    scene.add(group);

    // Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 64;
    shadowCanvas.height = 64;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    sGrad.addColorStop(0, 'rgba(23, 23, 23, 0.18)');
    sGrad.addColorStop(0.5, 'rgba(23, 23, 23, 0.04)');
    sGrad.addColorStop(1, 'rgba(23, 23, 23, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);
    const shadowTex = track(new THREE.CanvasTexture(shadowCanvas));

    const shadowGeo = track(new THREE.PlaneGeometry(3.0, 3.0));
    const shadowMat = track(new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.7, depthWrite: false }));
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -1.5, 0);
    scene.add(shadowMesh);

    // 1. Center Matte Cobalt Octahedron
    const octGeo = track(new THREE.OctahedronGeometry(1.0, 0));
    const octMat = track(new THREE.MeshStandardMaterial({
      color: 0x304FFE,
      emissive: 0x172b8f,
      emissiveIntensity: 0.25,
      metalness: 0.85,
      roughness: 0.2,
    }));
    const octMesh = new THREE.Mesh(octGeo, octMat);
    group.add(octMesh);

    const octEdgeGeo = track(new THREE.EdgesGeometry(octGeo));
    const octEdgeMat = track(new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 }));
    const octEdges = new THREE.LineSegments(octEdgeGeo, octEdgeMat);
    octMesh.add(octEdges);

    // 2. Satellite Nodes (Small Beveled Cubes)
    const satGeo = track(new THREE.BoxGeometry(0.42, 0.42, 0.42));
    const satMat = track(new THREE.MeshStandardMaterial({
      color: 0x171717,
      metalness: 0.9,
      roughness: 0.2,
    }));

    const satEdgesGeo = track(new THREE.EdgesGeometry(satGeo));
    const satEdgeMat = track(new THREE.LineBasicMaterial({ color: 0x304FFE, transparent: true, opacity: 0.8 }));

    const sat1 = new THREE.Mesh(satGeo, satMat);
    sat1.position.set(-1.6, 0.6, 0.4);
    sat1.add(new THREE.LineSegments(satEdgesGeo, satEdgeMat));
    group.add(sat1);

    const sat2 = new THREE.Mesh(satGeo, satMat);
    sat2.position.set(1.5, -0.5, -0.4);
    sat2.add(new THREE.LineSegments(satEdgesGeo, satEdgeMat));
    group.add(sat2);

    // 3. Fine Connecting Line Struts
    const lineMat = track(new THREE.LineBasicMaterial({ color: 0xD8D5CD, transparent: true, opacity: 0.8 }));
    const pts1 = [new THREE.Vector3(0, 0, 0), sat1.position];
    const lineGeo1 = track(new THREE.BufferGeometry().setFromPoints(pts1));
    group.add(new THREE.Line(lineGeo1, lineMat));

    const pts2 = [new THREE.Vector3(0, 0, 0), sat2.position];
    const lineGeo2 = track(new THREE.BufferGeometry().setFromPoints(pts2));
    group.add(new THREE.Line(lineGeo2, lineMat));

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
      width = container.clientWidth || 320;
      height = container.clientHeight || 280;
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
      group.rotation.x = Math.sin(elapsed * 0.3) * 0.1;
      group.position.y = Math.sin(elapsed * 0.8) * 0.05;

      sat1.rotation.x = elapsed * 0.5;
      sat1.rotation.y = elapsed * 0.3;
      sat2.rotation.y = -elapsed * 0.5;

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
    <div className={`relative ${className} select-none overflow-hidden rounded-2xl bg-white border border-[#D8D5CD] shadow-editorial flex items-center justify-center`}>
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F7F5F0] border border-[#D8D5CD] text-[10px] font-mono text-[#171717]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#304FFE]" />
        <span>FIG. 03 &bull; ALGORITHMIC STRUCTURE</span>
      </div>
    </div>
  );
}
