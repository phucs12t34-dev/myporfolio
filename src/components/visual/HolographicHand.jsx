import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RotateCw } from "lucide-react";

/**
 * HolographicHand - Signature 3D Visual Sculpture (Critical Redesign)
 * Concept: "THE INTERSECTION OF HUMAN CREATIVITY AND DIGITAL INTELLIGENCE"
 *
 * Anatomical Reconstruction:
 * - A recognizable stylized human hand entering horizontally from lower-left to center-right.
 * - Palm facing upward in three-quarter perspective, creating a supportive plane.
 * - Distinct, articulated anatomy: Wrist, Palm with thenar mound, Thumb, and 4 curved Fingers (Index, Middle, Ring, Pinky).
 * - Hybrid rendering: Sculptural translucent cybernetic mesh + holographic contour lines + dense surface halftone particles.
 * - Floating Crystalline Lotus Flower: Multi-tiered faceted crystal petals radiating from an illuminated core, hovering directly above the palm.
 * - Built strictly adhering to web3d-integration-patterns (Pattern 1: Layered Separation, DPR clamp, Page Visibility API, complete disposal).
 */
export default function HolographicHand({ className = "w-full h-[480px] sm:h-[540px]" }) {
  const mountRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRotateRef = useRef(autoRotate);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 560;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0.4, 1.4, 11.2);
    camera.lookAt(0.1, 0.3, 0.1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Cinematic Lighting System (Electric Blue, Ice Blue, Soft Violet)
    const ambientLight = new THREE.AmbientLight(0x0a1033, 1.4);
    scene.add(ambientLight);

    // Directional Key Light from above-right
    const keyLight = new THREE.DirectionalLight(0xa9c9ff, 1.8);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    // Violet Rim Light from behind-left
    const rimLight = new THREE.DirectionalLight(0x9b5cff, 1.4);
    rimLight.position.set(-6, 2, -4);
    scene.add(rimLight);

    // Core Illumination (Internal light inside the floating crystalline flower)
    const crystalLight = new THREE.PointLight(0x4169ff, 5.0, 25);
    crystalLight.position.set(0.1, 1.35, 0.35);
    scene.add(crystalLight);

    const crystalAccentLight = new THREE.PointLight(0xa9c9ff, 3.2, 18);
    crystalAccentLight.position.set(0.1, 1.6, 0.35);
    scene.add(crystalAccentLight);

    // Master Group containing both Hand and Crystalline Sculpture
    const masterGroup = new THREE.Group();
    // Default 3/4 perspective tilt for optimal presentation
    masterGroup.position.set(-0.2, -0.3, 0);
    masterGroup.rotation.set(0.12, -0.22, 0.04);
    scene.add(masterGroup);

    // Array to collect disposable resources
    const disposables = [];

    // Helper to register disposable items
    const trackDisposable = (item) => {
      if (item) disposables.push(item);
      return item;
    };

    // Shared Materials
    const handMeshMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: 0x0a1438,
      emissive: 0x142b78,
      emissiveIntensity: 0.32,
      metalness: 0.88,
      roughness: 0.22,
      transparent: true,
      opacity: 0.72,
    }));

    const handWireMat = trackDisposable(new THREE.MeshBasicMaterial({
      color: 0x4169ff,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    }));

    const jointCapMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: 0x172b8f,
      emissive: 0x4169ff,
      emissiveIntensity: 0.55,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.85,
    }));

    // Soft Circular Halftone Particle Texture
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext("2d");
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    pGrad.addColorStop(0.3, "rgba(169, 201, 255, 0.9)");
    pGrad.addColorStop(0.65, "rgba(65, 105, 255, 0.4)");
    pGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 32, 32);
    const particleTexture = trackDisposable(new THREE.CanvasTexture(pCanvas));

    // Hand Group
    const handGroup = new THREE.Group();
    masterGroup.add(handGroup);

    const surfacePoints = [];
    const surfaceColors = [];
    const colorElectricBlue = new THREE.Color(0x4169ff);
    const colorIceBlue = new THREE.Color(0xa9c9ff);
    const colorWhite = new THREE.Color(0xf2f3fa);
    const colorViolet = new THREE.Color(0x9b5cff);

    // ==========================================
    // 3. ANATOMICAL HAND RECONSTRUCTION
    // ==========================================

    // 3a. Forearm & Wrist (Extends horizontally from lower-left to wrist)
    const wristRadiusX = 0.75;
    const wristRadiusY = 0.45;
    const wristLen = 2.0;

    const forearmGeo = trackDisposable(new THREE.CylinderGeometry(wristRadiusX, wristRadiusX * 1.15, wristLen, 18, 6));
    const forearmMesh = new THREE.Mesh(forearmGeo, handMeshMat);
    forearmMesh.rotation.z = Math.PI / 2.3;
    forearmMesh.rotation.x = -0.15;
    forearmMesh.scale.set(1, 1, wristRadiusY / wristRadiusX);
    forearmMesh.position.set(-2.55, -1.2, -0.3);
    handGroup.add(forearmMesh);

    const forearmWire = new THREE.Mesh(forearmGeo, handWireMat);
    forearmWire.position.copy(forearmMesh.position);
    forearmWire.rotation.copy(forearmMesh.rotation);
    forearmWire.scale.copy(forearmMesh.scale);
    handGroup.add(forearmWire);

    // Sample particles along forearm
    for (let u = 0; u < 14; u++) {
      const ty = (u / 14 - 0.5) * wristLen;
      for (let v = 0; v < 14; v++) {
        const theta = (v / 14) * Math.PI * 2;
        const localPt = new THREE.Vector3(
          Math.cos(theta) * wristRadiusX,
          ty,
          Math.sin(theta) * wristRadiusY
        );
        localPt.applyEuler(forearmMesh.rotation);
        localPt.add(forearmMesh.position);
        surfacePoints.push(localPt.x, localPt.y, localPt.z);
        const c = colorViolet.clone().lerp(colorElectricBlue, u / 14);
        surfaceColors.push(c.r, c.g, c.b);
      }
    }

    // 3b. Open Palm Body (Horizontal cupped support facing upward)
    const palmLength = 2.3;
    const palmWidth = 1.85;
    const palmDepth = 0.42;

    const palmGeo = trackDisposable(new THREE.BoxGeometry(palmLength, palmDepth, palmWidth, 12, 4, 10));
    // Modulate vertices to create natural palm cupping & thenar bulge
    const palmPos = palmGeo.attributes.position;
    for (let i = 0; i < palmPos.count; i++) {
      const vx = palmPos.getX(i);
      const vy = palmPos.getY(i);
      const vz = palmPos.getZ(i);

      // Concave dip in the center of the upper palm (+Y)
      if (vy > 0) {
        const normDist = Math.sqrt((vx / 1.1) ** 2 + (vz / 0.9) ** 2);
        if (normDist < 1.0) {
          palmPos.setY(i, vy - (1.0 - normDist) * 0.16);
        }
      }
      // Thenar mound bulge on the thumb side (-X, +Z)
      if (vx < -0.3 && vz > 0.2) {
        palmPos.setY(i, palmPos.getY(i) + 0.14);
      }
    }
    palmGeo.computeVertexNormals();

    const palmMesh = new THREE.Mesh(palmGeo, handMeshMat);
    palmMesh.position.set(-0.6, -0.48, 0.18);
    palmMesh.rotation.set(-0.08, 0.05, 0.08);
    handGroup.add(palmMesh);

    const palmWire = new THREE.Mesh(palmGeo, handWireMat);
    palmWire.position.copy(palmMesh.position);
    palmWire.rotation.copy(palmMesh.rotation);
    handGroup.add(palmWire);

    // Sample particles from actual palm vertices
    for (let i = 0; i < palmPos.count; i += 2) {
      const pt = new THREE.Vector3(palmPos.getX(i), palmPos.getY(i), palmPos.getZ(i));
      pt.applyEuler(palmMesh.rotation);
      pt.add(palmMesh.position);
      surfacePoints.push(pt.x, pt.y, pt.z);
      const c = colorElectricBlue.clone().lerp(colorIceBlue, 0.4);
      surfaceColors.push(c.r, c.g, c.b);
    }

    // 3c. Anatomical Segments Helper for Fingers & Thumb
    const buildPhalanx = (startVec, endVec, radiusBase, radiusTip, colorPhase = 0.5) => {
      const dir = new THREE.Vector3().subVectors(endVec, startVec);
      const length = dir.length();
      const mid = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);

      const pGeo = trackDisposable(new THREE.CylinderGeometry(radiusTip, radiusBase, length, 12, 3));
      const pMesh = new THREE.Mesh(pGeo, handMeshMat);
      pMesh.position.copy(mid);
      pMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      handGroup.add(pMesh);

      const pWire = new THREE.Mesh(pGeo, handWireMat);
      pWire.position.copy(pMesh.position);
      pWire.quaternion.copy(pMesh.quaternion);
      handGroup.add(pWire);

      // Knuckle joint sphere
      const jGeo = trackDisposable(new THREE.SphereGeometry(radiusBase * 1.05, 10, 8));
      const jMesh = new THREE.Mesh(jGeo, jointCapMat);
      jMesh.position.copy(startVec);
      handGroup.add(jMesh);

      // Sample ring particles along phalanx
      for (let s = 0; s < 5; s++) {
        const t = s / 5;
        const currentCenter = new THREE.Vector3().lerpVectors(startVec, endVec, t);
        const curR = radiusBase + (radiusTip - radiusBase) * t;
        const perp = new THREE.Vector3(1, 0, 0);
        if (Math.abs(dir.x) > 0.9) perp.set(0, 1, 0);
        const norm1 = new THREE.Vector3().crossVectors(dir, perp).normalize();
        const norm2 = new THREE.Vector3().crossVectors(dir, norm1).normalize();

        for (let k = 0; k < 8; k++) {
          const ang = (k / 8) * Math.PI * 2;
          const px = currentCenter.x + (norm1.x * Math.cos(ang) + norm2.x * Math.sin(ang)) * curR;
          const py = currentCenter.y + (norm1.y * Math.cos(ang) + norm2.y * Math.sin(ang)) * curR;
          const pz = currentCenter.z + (norm1.z * Math.cos(ang) + norm2.z * Math.sin(ang)) * curR;
          surfacePoints.push(px, py, pz);
          const c = colorElectricBlue.clone().lerp(colorWhite, colorPhase * 0.8);
          surfaceColors.push(c.r, c.g, c.b);
        }
      }
    };

    // 3d. Articulated Thumb (Branches to the left and curves upward)
    const thumbJoints = [
      new THREE.Vector3(-1.35, -0.62, 0.72),
      new THREE.Vector3(-0.95, -0.38, 1.15),
      new THREE.Vector3(-0.52, -0.12, 1.35),
      new THREE.Vector3(-0.12, 0.22, 1.25), // Thumb tip
    ];
    buildPhalanx(thumbJoints[0], thumbJoints[1], 0.22, 0.20, 0.4);
    buildPhalanx(thumbJoints[1], thumbJoints[2], 0.20, 0.18, 0.7);
    buildPhalanx(thumbJoints[2], thumbJoints[3], 0.18, 0.14, 0.95);

    // 3e. Articulated 4 Fingers (Forming a natural welcoming curved cup)
    // INDEX FINGER
    const indexJoints = [
      new THREE.Vector3(-0.35, -0.32, 0.82),
      new THREE.Vector3(0.35, -0.12, 0.95),
      new THREE.Vector3(0.98, 0.08, 0.95),
      new THREE.Vector3(1.48, 0.28, 0.88), // Tip
    ];
    buildPhalanx(indexJoints[0], indexJoints[1], 0.20, 0.18, 0.5);
    buildPhalanx(indexJoints[1], indexJoints[2], 0.18, 0.16, 0.75);
    buildPhalanx(indexJoints[2], indexJoints[3], 0.16, 0.12, 0.95);

    // MIDDLE FINGER (Longest finger, supporting center-right)
    const middleJoints = [
      new THREE.Vector3(0.12, -0.28, 0.48),
      new THREE.Vector3(0.88, -0.06, 0.56),
      new THREE.Vector3(1.58, 0.18, 0.54),
      new THREE.Vector3(2.18, 0.38, 0.46), // Tip
    ];
    buildPhalanx(middleJoints[0], middleJoints[1], 0.21, 0.19, 0.5);
    buildPhalanx(middleJoints[1], middleJoints[2], 0.19, 0.16, 0.75);
    buildPhalanx(middleJoints[2], middleJoints[3], 0.16, 0.13, 1.0);

    // RING FINGER
    const ringJoints = [
      new THREE.Vector3(0.55, -0.32, 0.12),
      new THREE.Vector3(1.25, -0.12, 0.16),
      new THREE.Vector3(1.85, 0.12, 0.14),
      new THREE.Vector3(2.32, 0.30, 0.08), // Tip
    ];
    buildPhalanx(ringJoints[0], ringJoints[1], 0.19, 0.17, 0.5);
    buildPhalanx(ringJoints[1], ringJoints[2], 0.17, 0.15, 0.75);
    buildPhalanx(ringJoints[2], ringJoints[3], 0.15, 0.12, 0.95);

    // PINKY FINGER
    const pinkyJoints = [
      new THREE.Vector3(0.92, -0.42, -0.25),
      new THREE.Vector3(1.48, -0.26, -0.22),
      new THREE.Vector3(1.92, -0.05, -0.22),
      new THREE.Vector3(2.28, 0.15, -0.24), // Tip
    ];
    buildPhalanx(pinkyJoints[0], pinkyJoints[1], 0.17, 0.15, 0.45);
    buildPhalanx(pinkyJoints[1], pinkyJoints[2], 0.15, 0.13, 0.7);
    buildPhalanx(pinkyJoints[2], pinkyJoints[3], 0.13, 0.10, 0.9);

    // Halftone Surface Point Cloud for the Entire Hand
    const handPointsGeo = trackDisposable(new THREE.BufferGeometry());
    handPointsGeo.setAttribute("position", new THREE.Float32BufferAttribute(surfacePoints, 3));
    handPointsGeo.setAttribute("color", new THREE.Float32BufferAttribute(surfaceColors, 3));

    const handPointsMat = trackDisposable(new THREE.PointsMaterial({
      size: 0.088,
      map: particleTexture,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
    }));
    const handPointCloud = new THREE.Points(handPointsGeo, handPointsMat);
    handGroup.add(handPointCloud);

    // ==========================================
    // 4. MAGNIFICENT CRYSTALLINE LOTUS FLOWER
    // (Large, organic, faceted crystal petals radiating above the palm)
    // ==========================================
    const flowerGroup = new THREE.Group();
    // Positioned directly above the open palm center
    flowerGroup.position.set(0.15, 1.45, 0.38);
    masterGroup.add(flowerGroup);

    // 4a. Procedural Faceted Crystal Petal Geometry Generator
    // Creates an elongated diamond-cut faceted crystal shard
    const createFacetedPetalGeometry = (len, width, thickness) => {
      const geo = new THREE.BufferGeometry();
      const hw = width * 0.5;
      const midY = len * 0.42;

      // 6 key vertices of cut diamond prism
      // 0: Base, 1: Tip, 2: Left, 3: Right, 4: Front Spine, 5: Back Spine
      const v = [
        0, 0, 0,                      // 0: Base
        0, len, 0,                    // 1: Tip
        -hw, midY, 0,                 // 2: Left Wing
        hw, midY, 0,                  // 3: Right Wing
        0, midY * 1.08, thickness,    // 4: Front Ridge (Raised)
        0, midY * 0.95, -thickness * 0.7, // 5: Back Ridge
      ];

      // 8 Triangular Facets
      const indices = [
        // Front Lower
        0, 4, 2,   0, 3, 4,
        // Front Upper
        4, 1, 2,   4, 3, 1,
        // Back Lower
        0, 2, 5,   0, 5, 3,
        // Back Upper
        5, 2, 1,   5, 1, 3
      ];

      geo.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
      geo.setIndex(indices);
      geo.computeVertexNormals();
      return trackDisposable(geo);
    };

    // Petal PBR Materials
    const crystalMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: 0x142870,
      emissive: 0x4169ff,
      emissiveIntensity: 0.42,
      metalness: 0.88,
      roughness: 0.12,
      transparent: true,
      opacity: 0.78,
    }));

    const crystalEdgeMat = trackDisposable(new THREE.LineBasicMaterial({
      color: 0xa9c9ff,
      transparent: true,
      opacity: 0.85,
      linewidth: 1.5,
    }));

    // Tier 1: Outer Blooming Petals (8 large crystal petals tilted 48° outward)
    const outerCount = 8;
    const outerPetals = [];
    const outerGeo = createFacetedPetalGeometry(1.95, 0.78, 0.26);

    for (let i = 0; i < outerCount; i++) {
      const angle = (i / outerCount) * Math.PI * 2;
      const petalHolder = new THREE.Group();
      petalHolder.rotation.y = angle;

      const pMesh = new THREE.Mesh(outerGeo, crystalMat);
      pMesh.rotation.x = Math.PI * 0.28; // Tilt outward like a blooming lotus
      pMesh.position.set(0, 0.15, 0.42);
      petalHolder.add(pMesh);

      // Sharp cut-crystal wire edges
      const edgeGeo = trackDisposable(new THREE.EdgesGeometry(outerGeo));
      const pEdge = new THREE.LineSegments(edgeGeo, crystalEdgeMat);
      pEdge.position.copy(pMesh.position);
      pEdge.rotation.copy(pMesh.rotation);
      petalHolder.add(pEdge);

      flowerGroup.add(petalHolder);
      outerPetals.push(pMesh);
    }

    // Tier 2: Mid-Layer Upright Petals (6 medium petals, 30° angle offset)
    const midCount = 6;
    const midPetals = [];
    const midGeo = createFacetedPetalGeometry(1.5, 0.6, 0.2);

    for (let i = 0; i < midCount; i++) {
      const angle = (i / midCount) * Math.PI * 2 + Math.PI / 6;
      const petalHolder = new THREE.Group();
      petalHolder.rotation.y = angle;

      const pMesh = new THREE.Mesh(midGeo, crystalMat);
      pMesh.rotation.x = Math.PI * 0.18; // More upright
      pMesh.position.set(0, 0.35, 0.3);
      petalHolder.add(pMesh);

      const edgeGeo = trackDisposable(new THREE.EdgesGeometry(midGeo));
      const pEdge = new THREE.LineSegments(edgeGeo, crystalEdgeMat);
      pEdge.position.copy(pMesh.position);
      pEdge.rotation.copy(pMesh.rotation);
      petalHolder.add(pEdge);

      flowerGroup.add(petalHolder);
      midPetals.push(pMesh);
    }

    // Tier 3: Inner Crown Petals (5 compact petals cupping central gem)
    const innerCount = 5;
    const innerGeo = createFacetedPetalGeometry(1.05, 0.42, 0.15);

    for (let i = 0; i < innerCount; i++) {
      const angle = (i / innerCount) * Math.PI * 2;
      const petalHolder = new THREE.Group();
      petalHolder.rotation.y = angle;

      const pMesh = new THREE.Mesh(innerGeo, crystalMat);
      pMesh.rotation.x = Math.PI * 0.10;
      pMesh.position.set(0, 0.52, 0.18);
      petalHolder.add(pMesh);

      const edgeGeo = trackDisposable(new THREE.EdgesGeometry(innerGeo));
      const pEdge = new THREE.LineSegments(edgeGeo, crystalEdgeMat);
      pEdge.position.copy(pMesh.position);
      pEdge.rotation.copy(pMesh.rotation);
      petalHolder.add(pEdge);

      flowerGroup.add(petalHolder);
    }

    // Central Glowing Crystal Core Jewel
    const coreGeo = trackDisposable(new THREE.OctahedronGeometry(0.48, 0));
    const coreMat = trackDisposable(new THREE.MeshStandardMaterial({
      color: 0x4169ff,
      emissive: 0xa9c9ff,
      emissiveIntensity: 0.85,
      metalness: 0.95,
      roughness: 0.08,
    }));
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 0.65, 0);
    flowerGroup.add(coreMesh);

    const coreWire = new THREE.Mesh(coreGeo, trackDisposable(new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    })));
    coreWire.position.copy(coreMesh.position);
    coreWire.scale.set(1.04, 1.04, 1.04);
    flowerGroup.add(coreWire);

    // ==========================================
    // 5. THREE-TIER PARTICLE SYSTEMS
    // ==========================================

    // System B: Crystalline Halo Particles (Orbiting in a double-helix around the flower)
    const haloCount = 65;
    const haloPositions = new Float32Array(haloCount * 3);
    for (let i = 0; i < haloCount; i++) {
      const rad = 1.1 + Math.random() * 0.9;
      const theta = (i / haloCount) * Math.PI * 4;
      const yOff = Math.sin(theta * 2) * 0.6 + 0.6;
      haloPositions[i * 3] = Math.cos(theta) * rad;
      haloPositions[i * 3 + 1] = yOff;
      haloPositions[i * 3 + 2] = Math.sin(theta) * rad;
    }
    const haloGeo = trackDisposable(new THREE.BufferGeometry());
    haloGeo.setAttribute("position", new THREE.BufferAttribute(haloPositions, 3));
    const haloMat = trackDisposable(new THREE.PointsMaterial({
      size: 0.09,
      map: particleTexture,
      color: 0xa9c9ff,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    }));
    const haloSystem = new THREE.Points(haloGeo, haloMat);
    flowerGroup.add(haloSystem);

    // System C: Sparse Atmospheric Particles (Floating in the surrounding dark space)
    const atmosCount = 45;
    const atmosPositions = new Float32Array(atmosCount * 3);
    for (let i = 0; i < atmosCount; i++) {
      atmosPositions[i * 3] = (Math.random() - 0.5) * 12;
      atmosPositions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      atmosPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const atmosGeo = trackDisposable(new THREE.BufferGeometry());
    atmosGeo.setAttribute("position", new THREE.BufferAttribute(atmosPositions, 3));
    const atmosMat = trackDisposable(new THREE.PointsMaterial({
      size: 0.065,
      map: particleTexture,
      color: 0x4169ff,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    }));
    const atmosSystem = new THREE.Points(atmosGeo, atmosMat);
    scene.add(atmosSystem);

    // ==========================================
    // 6. INTERACTION & ANIMATION LOOP
    // ==========================================
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = -0.22;
    let targetRotX = 0.12;
    let currentRotY = -0.22;
    let currentRotX = 0.12;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += deltaX * 0.007;
      targetRotX = Math.max(-0.25, Math.min(0.45, targetRotX + deltaY * 0.006));
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile devices
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
      targetRotY += deltaX * 0.007;
      targetRotX = Math.max(-0.25, Math.min(0.45, targetRotX + deltaY * 0.006));
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Page Visibility API check
    let isTabVisible = !document.hidden;
    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Gentle auto-rotation if enabled and not currently dragging
      if (autoRotateRef.current && !isDragging) {
        targetRotY += delta * 0.18;
      }

      currentRotY += (targetRotY - currentRotY) * 0.06;
      currentRotX += (targetRotX - currentRotX) * 0.06;

      masterGroup.rotation.y = currentRotY;
      masterGroup.rotation.x = currentRotX;

      // Extremely subtle, elegant levitation for the entire hand + sculpture
      masterGroup.position.y = -0.3 + Math.sin(elapsed * 1.2) * 0.07;

      // Crystalline Flower slow independent continuous rotation & internal light pulse
      flowerGroup.rotation.y = elapsed * 0.32;
      coreMesh.rotation.y = -elapsed * 0.45;
      coreMesh.rotation.z = Math.sin(elapsed * 0.8) * 0.1;
      coreWire.rotation.copy(coreMesh.rotation);

      // Subtle petal blooming breathing
      const bloomPulse = 1.0 + Math.sin(elapsed * 1.8) * 0.035;
      coreMesh.scale.set(bloomPulse, bloomPulse, bloomPulse);
      coreWire.scale.set(bloomPulse * 1.04, bloomPulse * 1.04, bloomPulse * 1.04);

      // Orbiting halo particles
      haloSystem.rotation.y = -elapsed * 0.45;

      // Shimmering particle alpha on hand
      handPointsMat.opacity = 0.85 + Math.sin(elapsed * 2.5) * 0.1;

      // Atmosphere drift
      atmosSystem.rotation.y = elapsed * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Strict Cleanup Lifecycle (Full Disposal)
    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      disposables.forEach((item) => {
        if (item.dispose) item.dispose();
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleToggleRotate = () => {
    setAutoRotate((prev) => {
      autoRotateRef.current = !prev;
      return !prev;
    });
  };

  return (
    <div className={`relative ${className} select-none flex flex-col justify-between overflow-hidden`}>
      {/* Top Compact Technical Badge */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md pointer-events-auto shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#4169FF] animate-pulse"></span>
          <span className="font-mono text-[11px] font-semibold text-white tracking-wide">
            HOLOGRAPHIC DIGITAL SCULPTURE
          </span>
          <span className="font-mono text-[9px] text-[#A9C9FF] border-l border-white/10 pl-2">
            SIG #01
          </span>
        </div>

        <button
          onClick={handleToggleRotate}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all pointer-events-auto ${
            autoRotate
              ? "bg-[#4169FF]/20 text-[#A9C9FF] border-[#4169FF]/40 shadow-sm"
              : "bg-black/60 text-[#A6A2AF] border-white/10 hover:text-white"
          }`}
          title={autoRotate ? "Tạm dừng tự xoay" : "Bật tự xoay 360°"}
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* WebGL Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full flex-1 cursor-grab active:cursor-grabbing relative"
        title="Kéo chuột để xoay điêu khắc 3D"
      />

      {/* Bottom Technical Caption */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none text-left">
        <div className="font-mono text-[10px] text-[#A6A2AF]/90 flex items-center gap-2 pointer-events-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#4169FF]" />
          <span>Faceted Crystal Lotus • Anatomical Halftone Hand</span>
        </div>
        <div className="font-mono text-[9px] text-[#686571] hidden sm:block">
          Electric Blue #4169FF • Three.js WebGL 60FPS
        </div>
      </div>
    </div>
  );
}
