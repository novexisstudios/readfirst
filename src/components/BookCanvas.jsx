import React, { Component, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { getStoryProgress, subscribeStoryProgress } from '../lib/storyScroll';

/**
 * Book animation state derived from story scroll progress.
 * Read inside frame loops (never via props) so scrolling causes no React
 * re-renders; cached so it is computed once per scroll position.
 */
const bookProgress = { p: -1, cover: 0, l1: 0, l2: 0, l3: 0, l4: 0 };

function leafT(p, start, length) {
  return THREE.MathUtils.smoothstep(p >= start ? Math.min(1, (p - start) / length) : 0, 0, 1);
}

function getBookProgress() {
  const p = getStoryProgress();
  if (p !== bookProgress.p) {
    bookProgress.p = p;
    bookProgress.cover = leafT(p, 0.08, 0.12); // Cover: 0.08 to 0.20
    bookProgress.l1 = leafT(p, 0.36, 0.10);    // Leaf 1: 0.36 to 0.46
    bookProgress.l2 = leafT(p, 0.58, 0.08);    // Leaf 2: 0.58 to 0.66
    bookProgress.l3 = leafT(p, 0.76, 0.08);    // Leaf 3: 0.76 to 0.84 (Catalytic Turn)
    bookProgress.l4 = leafT(p, 0.92, 0.04);    // Leaf 4: 0.92 to 0.96
  }
  return bookProgress;
}

/**
 * Error boundary to ensure 3D canvas never breaks the webpage.
 */
class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn('3D Model fallback activated:', error?.message);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/**
 * High-Resolution Luxury Editorial Page Canvas Texture Generator
 * Resolution: 1400 x 1960 (~300 DPI book fidelity)
 */
function createPageTexture(renderFn) {
  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = 1960;
  const ctx = canvas.getContext('2d');

  // Luminous museum archival ivory paper stock
  ctx.fillStyle = '#FCF9F2';
  ctx.fillRect(0, 0, 1400, 1960);

  // Subtle paper grain/warmth
  ctx.fillStyle = 'rgba(240, 235, 222, 0.35)';
  for (let i = 0; i < 1960; i += 8) {
    ctx.fillRect(0, i, 1400, 1);
  }

  renderFn(ctx);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.anisotropy = 16;
  return texture;
}

/**
 * Deep Gutter Crease Shadow (Ambient occlusion where pages curve into spine binding)
 */
function createGutterShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0, 'rgba(0, 15, 35, 0)');
  grad.addColorStop(0.30, 'rgba(0, 15, 35, 0.08)');
  grad.addColorStop(0.46, 'rgba(0, 15, 35, 0.38)');
  grad.addColorStop(0.50, 'rgba(0, 15, 35, 0.54)');
  grad.addColorStop(0.54, 'rgba(0, 15, 35, 0.38)');
  grad.addColorStop(0.70, 'rgba(0, 15, 35, 0.08)');
  grad.addColorStop(1, 'rgba(0, 15, 35, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1024);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Procedural Book-Cloth Linen Normal / Bump Texture
 */
function createLinenBumpTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  for (let i = 0; i < 512; i += 4) {
    ctx.fillRect(i, 0, 2, 512);
    ctx.fillRect(0, i, 512, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 22);
  return texture;
}

/**
 * Procedural Archival Spine Texture (Bespoke Fine Binding with Raised Ribs & Foil Titling)
 */
function createSpineTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1960;
  const ctx = canvas.getContext('2d');

  // Deep archival navy cloth
  ctx.fillStyle = '#001833';
  ctx.fillRect(0, 0, 512, 1960);

  // Subtle tactile weave
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 1960; i += 6) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Outer framing rules along the spine shoulder
  ctx.strokeStyle = 'rgba(242, 100, 42, 0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 40, 452, 1880);

  // Traditional Raised Bands / Ribs (5 horizontal spine hubs)
  const bandPositions = [260, 620, 980, 1340, 1700];
  bandPositions.forEach((y) => {
    // Deep shadow under rib
    ctx.fillStyle = 'rgba(0, 8, 20, 0.65)';
    ctx.fillRect(20, y + 10, 472, 12);

    // Raised rib highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(20, y - 10, 472, 20);

    // Gold foil double rules on rib
    ctx.strokeStyle = 'rgba(242, 100, 42, 0.85)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(35, y - 5);
    ctx.lineTo(477, y - 5);
    ctx.moveTo(35, y + 5);
    ctx.lineTo(477, y + 5);
    ctx.stroke();
  });

  // Clean luxury cloth spine with traditional raised bands and shoulder rules
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.anisotropy = 16;
  return texture;
}

/**
 * Organic Page Gutter Dip & Concave Curvature Mathematical Functions
 * Real physical open books dip into the sewn spine binding at u = 0,
 * curve concavely upward out of the gutter valley, crest gently,
 * and settle toward the outer edge.
 */
function getGutterDip(u) {
  const cu = Math.max(0, Math.min(1, Number.isFinite(u) ? u : 0));
  // Deep smooth concave trough: dips -0.026 at u = 0, smoothly levels out by u = 0.28
  if (cu >= 0.28) return 0;
  const factor = 1.0 - cu / 0.28;
  return -0.026 * factor * factor;
}

function getRestCurveRight(u) {
  const cu = Math.max(0, Math.min(1, Number.isFinite(u) ? u : 0));
  const crest = 0.022 * Math.sin(Math.PI * cu) * (1.0 - 0.22 * cu);
  const dip = getGutterDip(cu);
  return crest + dip;
}

function getRestCurveLeft(u) {
  const cu = Math.max(0, Math.min(1, Number.isFinite(u) ? u : 0));
  const crest = 0.024 * Math.sin(Math.PI * cu) * (1.0 - 0.22 * cu);
  const dip = getGutterDip(cu);
  return crest + dip;
}

/**
 * Curved Static Resting Page Component
 * Used for Spread 04 Right base page.
 * Guarantees every surface in the book has organic concave paper curvature.
 */
function CurvedRestingPage({ texture, side = 'right', pageW, pageH, zOffset, thetaR, thetaL }) {
  const lastCover = useRef(NaN);

  // Built once; vertices are re-shaped in place only when the cover moves
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(pageW, pageH, 24, 1);
    g.userData.baseX = Float32Array.from({ length: g.attributes.position.count }, (_, i) =>
      Math.max(0, g.attributes.position.getX(i) + pageW / 2)
    );
    if (side !== 'right') {
      // Invert U coordinate for left page
      const uv = g.attributes.uv;
      for (let i = 0; i < uv.count; i++) uv.setX(i, 1.0 - uv.getX(i));
      uv.needsUpdate = true;
    }
    return g;
  }, [side, pageW, pageH]);

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame(() => {
    const openCoverProgress = side === 'right' ? getBookProgress().cover : 1;
    if (openCoverProgress === lastCover.current) return;
    lastCover.current = openCoverProgress;

    const pos = geo.attributes.position;
    const baseX = geo.userData.baseX;
    for (let i = 0; i < pos.count; i++) {
      const origX = baseX[i];                 // 0 to pageW
      const u = Math.min(1, origX / pageW);   // 0 to 1

      if (side === 'right') {
        const effThetaR = thetaR * openCoverProgress;
        const x = origX * Math.cos(effThetaR);
        const z = origX * Math.sin(effThetaR) + openCoverProgress * getRestCurveRight(u) + zOffset;
        pos.setXYZ(i, x, pos.getY(i), z);
      } else {
        const x = -origX * Math.cos(thetaL);
        const z = origX * Math.sin(thetaL) + getRestCurveLeft(u) + zOffset;
        pos.setXYZ(i, x, pos.getY(i), z);
      }
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
  });

  return (
    <mesh geometry={geo}>
      <meshStandardMaterial
        map={texture}
        roughness={0.88}
        metalness={0.02}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Curved Inner Flyleaf Component (Spread 01 Left Page)
 * Dynamically curves into the gutter when the front cover opens,
 * maintaining seamless organic concave curvature across both page halves.
 */
function InnerFlyleafCurved({ texture, pageW, pageH }) {
  const geoRef = useRef();
  const lastCover = useRef(NaN);

  const geo = useMemo(() => {
    const segmentsX = 24;
    const g = new THREE.PlaneGeometry(pageW, pageH, segmentsX, 1);
    g.translate(pageW / 2, 0, 0); // Hinge at x = 0
    // Invert U coordinate for left page
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
      uv.setX(i, 1.0 - uv.getX(i));
    }
    uv.needsUpdate = true;
    return g;
  }, [pageW, pageH]);

  useFrame(() => {
    if (!geoRef.current) return;
    const t = getBookProgress().cover;
    if (t === lastCover.current) return;
    lastCover.current = t;
    const pos = geoRef.current.attributes.position;
    const count = pos.count;

    for (let i = 0; i < count; i++) {
      const origX = (i % 25) * (pageW / 24);
      const u = Math.min(1, Math.max(0, origX / pageW));

      // Real physical flyleaf behavior:
      // When closed (t = 0): flat against board at z = -0.002
      // When open (t = 1): curves concavely toward the gutter valley
      const curve = t * (getRestCurveLeft(u) - getGutterDip(0));
      const z = -0.002 - curve;

      pos.setXYZ(i, origX + 0.01, pos.getY(i), z);
    }
    pos.needsUpdate = true;
    geoRef.current.computeVertexNormals();
  });

  return (
    <mesh>
      <primitive object={geo} ref={geoRef} attach="geometry" />
      <meshStandardMaterial
        map={texture}
        roughness={0.88}
        metalness={0.02}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Parametric Curved Turning Paper Leaf with Real V-Cradle Physics
 * - 24 subdivisions along X
 * - Starts in right-wing V-cradle profile at t = 0
 * - Parabolic lift & dynamic curl wave across gutter during transit
 * - Settles into left-wing V-cradle profile at t = 1
 * - Recomputed vertex normals for specular highlights rolling across paper
 */
function FlexibleCurvedLeaf({
  frontTexture,
  backTexture,
  leaf, // key into bookProgress: 0 = resting on right, 1 = resting on left
  pageW,
  pageH,
  zRight,
  zLeft,
  thetaR,
  thetaL,
}) {
  const frontMeshRef = useRef();
  const backMeshRef = useRef();
  const lastState = useRef({ t: NaN, cover: NaN });

  const frontGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(pageW, pageH, 24, 1);
    geo.translate(pageW / 2, 0, 0); // Hinge exactly at spine x = 0
    return geo;
  }, [pageW, pageH]);

  const backGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(pageW, pageH, 24, 1);
    geo.translate(pageW / 2, 0, 0);
    const uv = geo.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
      uv.setX(i, 1.0 - uv.getX(i));
    }
    uv.needsUpdate = true;
    return geo;
  }, [pageW, pageH]);

  useFrame(() => {
    if (!frontMeshRef.current || !backMeshRef.current) return;
    const book = getBookProgress();
    const t = THREE.MathUtils.clamp(book[leaf], 0, 1);
    const openCoverProgress = book.cover;
    // Resting leaves don't change shape, so skip the vertex + normal work
    if (t === lastState.current.t && openCoverProgress === lastState.current.cover) return;
    lastState.current.t = t;
    lastState.current.cover = openCoverProgress;

    const pos = frontGeo.attributes.position;
    const count = pos.count;

    if (!frontGeo.userData.basePositions) {
      frontGeo.userData.basePositions = new Float32Array(pos.array);
    }
    const base = frontGeo.userData.basePositions;

    const baseZ = THREE.MathUtils.lerp(zRight, zLeft, t);
    // Dynamic arch lift when crossing gutter
    const archAmount = Math.sin(t * Math.PI) * 0.40;

    const effThetaR = thetaR * openCoverProgress;

    for (let i = 0; i < count; i++) {
      const origX = Math.max(0, base[i * 3]); // 0 to pageW
      const u = Math.min(1, origX / pageW);   // 0 to 1

      // Leading-edge curl: outer edge turns ahead of spine
      const curlLead = Math.sin(t * Math.PI) * Math.sin(u * Math.PI * 0.5) * 0.38;
      // Polar angle transitioning from right V-angle (effThetaR) to left V-angle (PI - thetaL)
      const phi = effThetaR + t * (Math.PI - effThetaR - thetaL) + curlLead;

      // Parabolic 3D lift in foreground
      const lift = Math.sin(t * Math.PI) * Math.sin(u * Math.PI) * archAmount;

      // Organic curvature interpolation (scaled by openCoverProgress when on right)
      const curve = openCoverProgress * ((1.0 - t) * getRestCurveRight(u) + t * getRestCurveLeft(u));

      const newX = origX * Math.cos(phi);
      const newZ = origX * Math.sin(phi) + lift + curve + baseZ;

      const safeX = Number.isFinite(newX) ? newX : 0;
      const safeZ = Number.isFinite(newZ) ? newZ : baseZ;

      pos.setXYZ(i, safeX, base[i * 3 + 1], safeZ);
    }
    pos.needsUpdate = true;
    frontGeo.computeVertexNormals();
    frontGeo.computeBoundingSphere();

    // Back geometry follows front with microscopic 0.0015 offset
    const backPos = backGeo.attributes.position;
    for (let i = 0; i < count; i++) {
      backPos.setXYZ(i, pos.getX(i), pos.getY(i), pos.getZ(i) - 0.0015);
    }
    backPos.needsUpdate = true;
    backGeo.computeVertexNormals();
    backGeo.computeBoundingSphere();
  });

  return (
    <group>
      <mesh ref={frontMeshRef} geometry={frontGeo}>
        <meshStandardMaterial
          map={frontTexture}
          roughness={0.86}
          metalness={0.03}
          side={THREE.FrontSide}
        />
      </mesh>
      <mesh ref={backMeshRef} geometry={backGeo}>
        <meshStandardMaterial
          map={backTexture}
          roughness={0.86}
          metalness={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

/**
 * Headband (Endband) Component
 * Traditional bookbinding detail: striped silk headband reinforcing spine head and foot.
 */
/**
 * Luxury Archival Spine Component
 * True fine-bound hardcover casing with:
 * - Parametrically flexing rounded cloth arch (seamlessly enclosing the entire page block when closed)
 * - Solid sealed cloth turn-in endcaps on top and bottom (completely closing any hollow gaps)
 * - Continuous navy cloth texture with 5 raised ribs and debossed gold foil typography
 * - Archival orange satin bookmark ribbon resting inside the gutter
 */
function LuxurySpine({ pageH = 2.06, materials }) {
  const lastCover = useRef(NaN);
  const spineGeoRef = useRef();
  const ribbonGeoRef = useRef();
  const spineTopCapRef = useRef();
  const spineBottomCapRef = useRef();

  const Nu = 28;
  const Nv = 18;
  const totalH = pageH + 0.05;

  // Initialize spine geometry
  const spineGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(1, 1, Nu, Nv);
    return geo;
  }, [Nu, Nv]);

  // Initialize solid top endcap geometry (seals top arch)
  const topCapGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array((Nu + 2) * 3);
    const indices = [];
    for (let i = 0; i < Nu; i++) {
      indices.push(0, i + 2, i + 1);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setIndex(indices);
    return geo;
  }, [Nu]);

  // Initialize solid bottom endcap geometry (seals bottom arch)
  const bottomCapGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array((Nu + 2) * 3);
    const indices = [];
    for (let i = 0; i < Nu; i++) {
      indices.push(0, i + 1, i + 2);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setIndex(indices);
    return geo;
  }, [Nu]);

  // Initialize ribbon geometry (32 segments along length)
  const ribbonGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.022, pageH - 0.04, 2, 32);
    return geo;
  }, [pageH]);

  // Frame loop for dynamic flexing spine arch, endcaps & gutter ribbon
  useFrame(() => {
    if (!spineGeoRef.current) return;
    const t = getBookProgress().cover; // 0 (closed) to 1 (open)
    if (t === lastCover.current) return;
    lastCover.current = t;
    const pos = spineGeoRef.current.attributes.position;

    // Mathematical parameters for closed book spine:
    // Z-span: bottom of back cover (-0.080) to top of front cover (+0.064)
    const zMid = -0.008;
    const rZ = 0.072;
    const rX = 0.048;

    let index = 0;
    const topCapPos = spineTopCapRef.current ? spineTopCapRef.current.attributes.position : null;
    const btmCapPos = spineBottomCapRef.current ? spineBottomCapRef.current.attributes.position : null;

    for (let j = 0; j <= Nv; j++) {
      const v = j / Nv;
      const y = -totalH / 2 + v * totalH;

      for (let i = 0; i <= Nu; i++) {
        const u = i / Nu;
        const theta = u * Math.PI;

        // Closed shape: Semi-elliptical cylinder hugging the book edge
        const xClosed = -rX * Math.sin(theta);
        const zClosed = zMid + rZ * Math.cos(theta);

        // Open shape: Natural U-cradle flexing beneath the gutter
        const s = (u - 0.5) * 2; // -1 to +1
        const xOpen = s * 0.028;
        const zOpen = -0.082 + (s * s) * 0.028;

        // Smoothly interpolate between closed and open states
        const x = THREE.MathUtils.lerp(xClosed, xOpen, t);
        const z = THREE.MathUtils.lerp(zClosed, zOpen, t);

        pos.setXYZ(index, x, y, z);

        // Update bottom cap outer rim
        if (j === 0 && btmCapPos) {
          btmCapPos.setXYZ(i + 1, x, -totalH / 2, z);
        }

        // Update top cap outer rim
        if (j === Nv && topCapPos) {
          topCapPos.setXYZ(i + 1, x, totalH / 2, z);
        }

        index++;
      }
    }

    pos.needsUpdate = true;
    spineGeoRef.current.computeVertexNormals();

    // Seal top and bottom endcaps with center vertex
    const capCenterZ = THREE.MathUtils.lerp(zMid, -0.076, t);
    if (topCapPos && spineTopCapRef.current) {
      topCapPos.setXYZ(0, 0, totalH / 2, capCenterZ);
      topCapPos.needsUpdate = true;
      spineTopCapRef.current.computeVertexNormals();
    }
    if (btmCapPos && spineBottomCapRef.current) {
      btmCapPos.setXYZ(0, 0, -totalH / 2, capCenterZ);
      btmCapPos.needsUpdate = true;
      spineBottomCapRef.current.computeVertexNormals();
    }

    // Animate satin ribbon drape in gutter
    if (ribbonGeoRef.current) {
      const ribPos = ribbonGeoRef.current.attributes.position;
      const ribSegs = 32;

      for (let k = 0; k <= ribSegs; k++) {
        const frac = k / ribSegs; // 0 at head to 1 at foot
        // Stay neatly within the page height
        const ribY = (pageH / 2 - 0.02) - frac * (pageH - 0.04);

        // In open book, ribbon rests right inside the gutter curve
        // In closed book, ribbon is pressed flat inside the leaves
        const archWave = Math.sin(frac * Math.PI * 1.5) * 0.012 * (1 - t * 0.5);
        const ribX = (1 - t) * 0.008 + t * (Math.sin(frac * 4) * 0.005);
        const ribZ = THREE.MathUtils.lerp(
          -0.005 + archWave,
          -0.038 + (1 - Math.abs(frac - 0.5) * 2) * 0.026,
          t
        );

        // Set left and right vertices of ribbon strip
        const vIdx0 = k * 3;
        const vIdx1 = k * 3 + 1;
        const vIdx2 = k * 3 + 2;

        if (ribPos.getX(vIdx0) !== undefined) {
          ribPos.setXYZ(vIdx0, ribX - 0.011, ribY, ribZ);
          ribPos.setXYZ(vIdx1, ribX, ribY, ribZ + 0.001);
          ribPos.setXYZ(vIdx2, ribX + 0.011, ribY, ribZ);
        }
      }
      ribPos.needsUpdate = true;
      ribbonGeoRef.current.computeVertexNormals();
    }
  });

  return (
    <group>
      {/* Dynamic Flexing Spine Cloth Casing */}
      <mesh>
        <primitive object={spineGeometry} ref={spineGeoRef} attach="geometry" />
        <primitive object={materials.spine || materials.cover} />
      </mesh>

      {/* Solid Top Endcap Casing (Seamlessly seals top of spine arch) */}
      <mesh>
        <primitive object={topCapGeometry} ref={spineTopCapRef} attach="geometry" />
        <primitive object={materials.cover} />
      </mesh>

      {/* Solid Bottom Endcap Casing (Seamlessly seals bottom of spine arch) */}
      <mesh>
        <primitive object={bottomCapGeometry} ref={spineBottomCapRef} attach="geometry" />
        <primitive object={materials.cover} />
      </mesh>

      {/* Archival Orange Satin Bookmark Ribbon */}
      <mesh>
        <primitive object={ribbonGeometry} ref={ribbonGeoRef} attach="geometry" />
        <primitive object={materials.ribbon || materials.cover} />
      </mesh>
    </group>
  );
}

/**
 * Physical Gutter Signature Stack & Soft Ambient Crease
 * Renders the visible depth of sewn paper signatures dipping into the spine,
 * layered physical page thickness in the gutter trough, and soft natural ambient shadow.
 */
function GutterSignatureStack({ pageH, materials }) {
  const shadowMeshRef = useRef();

  // Create signature stack texture showing multiple physical paper layers in gutter
  const signatureTex = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Rich ivory text block core
    ctx.fillStyle = '#EFE9DC';
    ctx.fillRect(0, 0, 128, 1024);

    // Subtle stacked signature layer lines
    ctx.strokeStyle = 'rgba(0, 20, 46, 0.09)';
    ctx.lineWidth = 1;
    for (let x = 8; x < 128; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }

    // Outer subtle crease tone
    const grad = ctx.createLinearGradient(0, 0, 128, 0);
    grad.addColorStop(0, 'rgba(0, 15, 35, 0.10)');
    grad.addColorStop(0.5, 'rgba(0, 15, 35, 0.32)');
    grad.addColorStop(1, 'rgba(0, 15, 35, 0.10)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 1024);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Multi-layered curved signature geometry
  const signatureGeo = useMemo(() => {
    const width = 0.08;
    const height = pageH - 0.02;
    const geo = new THREE.PlaneGeometry(width, height, 16, 1);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i); // -0.04 to +0.04
      // Deep U-dip in center
      const dip = -0.030 + (x * x / 0.0016) * 0.016;
      pos.setZ(i, dip);
    }
    geo.computeVertexNormals();
    return geo;
  }, [pageH]);

  // Soft Ambient Crease Shadow Geometry
  const shadowGeo = useMemo(() => {
    const width = 0.14;
    const height = pageH;
    const geo = new THREE.PlaneGeometry(width, height, 16, 1);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i); // -0.07 to +0.07
      const dip = -0.026 + (x * x / 0.0049) * 0.016;
      pos.setZ(i, dip + 0.002);
    }
    geo.computeVertexNormals();
    return geo;
  }, [pageH]);

  useFrame(() => {
    if (shadowMeshRef.current && shadowMeshRef.current.material) {
      shadowMeshRef.current.material.opacity = 0.52 * getBookProgress().cover;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Physical Sewn Signature Trough (Layered bound pages depth) */}
      <mesh geometry={signatureGeo} position={[0, 0, 0]}>
        <meshStandardMaterial
          map={signatureTex}
          roughness={0.92}
          metalness={0.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Soft Ambient Crease Shadow between pages */}
      <mesh ref={shadowMeshRef} geometry={shadowGeo} position={[0, 0, 0]}>
        <primitive object={materials.gutterShadow} />
      </mesh>
    </group>
  );
}

/**
 * Main Narrative Book Object in Spatial Studio Lighting
 */
/**
 * Responsive camera framing
 * Returns a zoom factor (1 = original desktop camera distance) plus a look-at
 * shift so the book composes well on any aspect ratio.
 */
const SPREAD_FIT_WIDTH = 2.55;     // open V-cradle spread + breathing room (world units)
const CLOSED_BOOK_HEIGHT = 1.78;   // closed, reclined book incl. shadow margin
const CLOSED_BOOK_WIDTH = 1.3;
const CLOSED_BOOK_CENTER_X = 0.6;  // cover hinges at x=0, so its centre sits right of origin

function zoomForVisibleHeight(visibleHeight, tanHalfFov) {
  return Math.max(1, (visibleHeight / (2 * tanHalfFov) + 0.12) / 3.38);
}

function computeResponsiveFraming(size, fov, frame, openT) {
  const { width, height } = size;
  if (!width || !height) return { zoom: 1, shiftX: 0, shiftY: 0 };

  const aspect = width / height;
  const tanHalf = Math.tan(THREE.MathUtils.degToRad(fov / 2));
  const headerPx = frame?.headerPx ?? 80;

  // The open spread must always fit the screen width
  let openZoom = zoomForVisibleHeight(SPREAD_FIT_WIDTH / aspect, tanHalf);
  let closedZoom;
  let closedShiftX = 0;
  let closedShiftY = 0;

  if (aspect < 1) {
    // Portrait (phones, tablets): the closed book sits centred in the band
    // between the header and the hero copy anchored at the bottom.
    const top = headerPx + 12;
    const textTop = frame?.textTopPx || height * 0.55;
    const bottom = Math.max(top + 120, textTop - 16);
    const bandFrac = (bottom - top) / height;

    closedZoom = Math.max(
      zoomForVisibleHeight(CLOSED_BOOK_HEIGHT / bandFrac, tanHalf),
      zoomForVisibleHeight(CLOSED_BOOK_WIDTH / (0.78 * aspect), tanHalf)
    );

    const visibleHeight = 2 * tanHalf * (3.38 * closedZoom - 0.12);
    closedShiftX = CLOSED_BOOK_CENTER_X - 0.02;
    closedShiftY = (((top + bottom) / 2 - height / 2) / height) * visibleHeight;
  } else {
    // Landscape: keep the desktop composition, but clear the header on short screens
    const usable = Math.max(0.3, (height - 2 * headerPx) / height);
    closedZoom = zoomForVisibleHeight(1.6 / usable, tanHalf);
    openZoom = Math.max(openZoom, closedZoom);
    // Squarer screens (landscape tablets): nudge the book right of the hero copy
    closedShiftX = -0.3 * THREE.MathUtils.clamp((1.6 - aspect) / 0.6, 0, 1);
  }

  return {
    zoom: THREE.MathUtils.lerp(closedZoom, openZoom, openT),
    shiftX: THREE.MathUtils.lerp(closedShiftX, 0, openT),
    shiftY: THREE.MathUtils.lerp(closedShiftY, 0, openT),
  };
}

function CinematicNarrativeBook({
  fontsReady,
  cameraMode = 'B',
  cursorTarget,
  cursorSmooth,
  heroFrame,
}) {
  const rootGroupRef = useRef();
  const cameraTarget = useRef(new THREE.Vector3(0.02, -0.08, 0));
  const coverHingeRef = useRef();
  const leftWingGroupRef = useRef();
  const rightWingGroupRef = useRef();

  // Book Dimensions (Luxury large physical publication)
  const pageW = 1.46;
  const pageH = 2.06;
  const coverThick = 0.032;
  const blockThick = 0.048;

  // Natural V-Cradle Opening Angles (total spread ~154° instead of flat 180°)
  const thetaR = 0.205; // ~11.75° upward tilt on right
  const thetaL = 0.245; // ~14.00° upward tilt on left (natural slight asymmetry)

  // Create High-Fidelity Textures
  const textures = useMemo(() => {
    // -------------------------------------------------------------
    // COVER TEXTURE (Deep ReadFirst Navy with gold & copper debossing)
    // -------------------------------------------------------------
    const coverCanvas = document.createElement('canvas');
    coverCanvas.width = 1400;
    coverCanvas.height = 1960;
    const cctx = coverCanvas.getContext('2d');

    // Deep archival navy cloth
    cctx.fillStyle = '#001833';
    cctx.fillRect(0, 0, 1400, 1960);

    // Subtle tactile weave
    cctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    cctx.lineWidth = 1;
    for (let i = 0; i < 1960; i += 6) {
      cctx.beginPath();
      cctx.moveTo(0, i);
      cctx.lineTo(1400, i);
      cctx.stroke();
    }

    // Outer gold foil debossed rule
    cctx.strokeStyle = 'rgba(242, 100, 42, 0.85)';
    cctx.lineWidth = 4;
    cctx.strokeRect(75, 75, 1250, 1810);

    // Inner hairline frame
    cctx.strokeStyle = 'rgba(251, 207, 186, 0.55)';
    cctx.lineWidth = 1.5;
    cctx.strokeRect(95, 95, 1210, 1770);

    // Corner decorative accents
    cctx.fillStyle = '#F2642A';
    cctx.fillRect(90, 90, 12, 12);
    cctx.fillRect(1298, 90, 12, 12);
    cctx.fillRect(90, 1858, 12, 12);
    cctx.fillRect(1298, 1858, 12, 12);

    // READFIRST Brand Title
    cctx.fillStyle = '#FFFFFF';
    cctx.font = '800 100px "Plus Jakarta Sans", sans-serif';
    cctx.textAlign = 'center';
    cctx.fillText('READFIRST', 700, 780);

    // Subtitle
    cctx.fillStyle = '#FBCFBA';
    cctx.font = '700 32px "JetBrains Mono", monospace';
    cctx.fillText('RESEARCH-BASED INQUIRY', 700, 875);

    // Inquiry Glyph
    cctx.fillStyle = '#F2642A';
    cctx.font = 'italic 500 135px "Newsreader", serif';
    cctx.fillText('?', 700, 1080);

    // Monograph Note
    cctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    cctx.font = '600 24px "JetBrains Mono", monospace';
    cctx.fillText('AN INQUIRY MONOGRAPH // EDITION 01', 700, 1720);

    const coverTex = new THREE.CanvasTexture(coverCanvas);
    coverTex.colorSpace = THREE.SRGBColorSpace;
    coverTex.generateMipmaps = true;
    coverTex.minFilter = THREE.LinearMipmapLinearFilter;
    coverTex.anisotropy = 16;

    // -------------------------------------------------------------
    // SPREAD 01 — THE ART OF LEARNING
    // -------------------------------------------------------------
    const s1LeftTex = createPageTexture((ctx) => {
      ctx.fillStyle = '#4A6278';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText('PAGE 01', 240, 160);
      ctx.textAlign = 'right';
      ctx.fillText('READFIRST // MONOGRAPH', 1200, 160);
      ctx.textAlign = 'left';

      // Big Number
      ctx.fillStyle = '#F2642A';
      ctx.font = 'italic 600 180px "Newsreader", serif';
      ctx.fillText('01', 240, 410);

      // Chapter Title
      ctx.fillStyle = '#00142E';
      ctx.font = '800 64px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('THE ART OF LEARNING', 240, 505);

      ctx.strokeStyle = '#F2642A';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(240, 555);
      ctx.lineTo(650, 555);
      ctx.stroke();

      // Main Editorial Thought (Bolder & Bigger)
      ctx.fillStyle = '#00142E';
      ctx.font = '600 52px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Learning is more than receiving information.', 240, 680);
      ctx.fillText('It is the disciplined ability to perceive,', 240, 755);
      ctx.fillText('question, explore, and make meaning.', 240, 830);

      // Archival Box Note
      ctx.strokeStyle = 'rgba(0, 20, 46, 0.28)';
      ctx.lineWidth = 2;
      ctx.strokeRect(240, 1040, 860, 360);
      ctx.fillStyle = '#00142E';
      ctx.font = 'italic 600 46px "Newsreader", serif';
      ctx.fillText('"The learner is not a vessel to be filled,', 280, 1140);
      ctx.fillText('but an investigator encountering reality."', 280, 1205);
      ctx.fillStyle = '#F2642A';
      ctx.font = '700 24px "JetBrains Mono", monospace';
      ctx.fillText('// ARCHIVAL NOTE — ESSAY ON ATTENTION', 280, 1320);
    });

    const l1FrontTex = createPageTexture((ctx) => {
      ctx.fillStyle = '#4A6278';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText('CHAPTER 01', 210, 160);
      ctx.textAlign = 'right';
      ctx.fillText('PAGE 02', 1230, 160);
      ctx.textAlign = 'left';

      // Giant Statement (Bolder & Bigger)
      ctx.fillStyle = '#00142E';
      ctx.font = '600 144px "Newsreader", serif';
      ctx.fillText('TO LEARN', 210, 470);
      ctx.fillText('IS AN ', 210, 610);
      ctx.fillStyle = '#F2642A';
      ctx.font = 'italic 700 144px "Newsreader", serif';
      ctx.fillText('ART.', 670, 610);

      // Supporting Text (Bolder & Bigger)
      ctx.fillStyle = '#00142E';
      ctx.font = '600 52px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Learning is more than receiving information.', 210, 790);

      // Editorial Line
      ctx.fillStyle = '#F2642A';
      ctx.font = '800 30px "JetBrains Mono", monospace';
      ctx.fillText('OBSERVE · QUESTION · EXPLORE · REFLECT', 210, 930);

      ctx.fillStyle = '#1D3550';
      ctx.font = 'italic 600 38px "Newsreader", serif';
      ctx.fillText('Attention precedes inquiry.', 210, 1140);
      ctx.fillText('Inquiry precedes understanding.', 210, 1200);
    });

    // -------------------------------------------------------------
    // SPREAD 02 — THE PRINCIPLE OF ATTENTION
    // -------------------------------------------------------------
    const l1BackTex = createPageTexture((ctx) => {
      ctx.fillStyle = '#4A6278';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText('PAGE 03', 240, 160);
      ctx.textAlign = 'right';
      ctx.fillText('READFIRST // MONOGRAPH', 1200, 160);
      ctx.textAlign = 'left';

      ctx.fillStyle = '#F2642A';
      ctx.font = 'italic 600 180px "Newsreader", serif';
      ctx.fillText('02', 240, 410);

      ctx.fillStyle = '#00142E';
      ctx.font = '800 62px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('THE PRINCIPLE OF ATTENTION', 240, 505);

      ctx.strokeStyle = '#F2642A';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(240, 555);
      ctx.lineTo(670, 555);
      ctx.stroke();

      ctx.fillStyle = '#00142E';
      ctx.font = '600 50px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Before an answer is constructed,', 240, 680);
      ctx.fillText('attention must be paid to what is present,', 240, 755);
      ctx.fillText('what is unstated, and what remains overlooked.', 240, 830);

      // Marginalia Note Box
      ctx.strokeStyle = '#F2642A';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(240, 1040, 860, 380);
      ctx.fillStyle = '#F2642A';
      ctx.font = 'italic 600 46px "Newsreader", serif';
      ctx.fillText('"Attention is an act of', 280, 1160);
      ctx.fillText('intellectual devotion."', 280, 1225);
      ctx.fillStyle = '#4A6278';
      ctx.font = '700 24px "JetBrains Mono", monospace';
      ctx.fillText('MARGINALIA NOTE // READFIRST FIELD JOURNAL', 280, 1310);
    });

    const l2FrontTex = createPageTexture((ctx) => {
      ctx.fillStyle = '#4A6278';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText('CHAPTER 02', 210, 160);
      ctx.textAlign = 'right';
      ctx.fillText('PAGE 04', 1230, 160);
      ctx.textAlign = 'left';

      ctx.fillStyle = '#00142E';
      ctx.font = '600 136px "Newsreader", serif';
      ctx.fillText('LEARN IT', 210, 460);
      ctx.fillText('FROM AN', 210, 595);
      ctx.fillStyle = '#F2642A';
      ctx.font = 'italic 700 136px "Newsreader", serif';
      ctx.fillText('ARTIST.', 210, 730);

      ctx.fillStyle = '#00142E';
      ctx.font = '600 52px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('The deepest learning begins with attention.', 210, 890);

      ctx.fillStyle = '#1D3550';
      ctx.font = '600 42px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('The artist looks twice where others glance once.', 210, 990);
      ctx.fillText('Independent inquiry is built upon that exact rigor.', 210, 1055);
    });

    // -------------------------------------------------------------
    // SPREAD 03A — THE QUESTION & THE LINEAR SYSTEM
    // -------------------------------------------------------------
    const l2BackTex = createPageTexture((ctx) => {
      ctx.fillStyle = '#4A6278';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText('PAGE 05', 240, 160);
      ctx.textAlign = 'right';
      ctx.fillText('READFIRST // MONOGRAPH', 1200, 160);
      ctx.textAlign = 'left';

      ctx.fillStyle = '#F2642A';
      ctx.font = 'italic 600 180px "Newsreader", serif';
      ctx.fillText('03', 240, 410);

      ctx.fillStyle = '#00142E';
      ctx.font = '800 64px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('THE QUESTION', 240, 505);

      ctx.strokeStyle = '#F2642A';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(240, 555);
      ctx.lineTo(620, 555);
      ctx.stroke();

      ctx.fillStyle = '#00142E';
      ctx.font = '600 52px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Education can teach students what to learn.', 240, 680);
      ctx.fillText('But does it teach them how to learn?', 240, 755);

      ctx.fillStyle = '#1D3550';
      ctx.font = '600 44px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('When learning is reduced to coverage and testing,', 240, 920);
      ctx.fillText('there is less space for curiosity, reflection,', 240, 985);
      ctx.fillText('and independent inquiry.', 240, 1050);
    });

    const l3FrontTex = createPageTexture((ctx) => {
      ctx.fillStyle = '#4A6278';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText('CHAPTER 03 // THE PROBLEM', 210, 160);
      ctx.textAlign = 'right';
      ctx.fillText('PAGE 06', 1230, 160);
      ctx.textAlign = 'left';

      ctx.fillStyle = '#00142E';
      ctx.font = '600 80px "Newsreader", serif';
      ctx.fillText('WHAT IF WE TAUGHT', 210, 340);
      ctx.fillStyle = '#F2642A';
      ctx.font = 'italic 700 80px "Newsreader", serif';
      ctx.fillText('PEOPLE HOW TO LEARN?', 210, 435);

      ctx.fillStyle = '#00142E';
      ctx.font = '600 40px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Conventional schooling organizes learning linearly:', 210, 535);

      // Linear steps printed into the page (Bolder & Larger)
      const steps = ['SYLLABUS', 'TEACHING', 'ASSIGNMENT', 'EXAMINATION', 'MARKS'];
      steps.forEach((step, idx) => {
        const topY = 610 + idx * 175;
        const isMarks = step === 'MARKS';

        ctx.fillStyle = isMarks ? '#00142E' : '#FFFFFF';
        ctx.strokeStyle = isMarks ? '#00142E' : 'rgba(0, 20, 46, 0.35)';
        ctx.lineWidth = 3;
        ctx.fillRect(210, topY, 740, 92);
        ctx.strokeRect(210, topY, 740, 92);

        ctx.fillStyle = isMarks ? '#FFFFFF' : '#00142E';
        ctx.font = isMarks ? '800 34px "JetBrains Mono", monospace' : '700 32px "JetBrains Mono", monospace';
        ctx.fillText(step, 250, topY + 60);

        if (idx < steps.length - 1) {
          ctx.fillStyle = '#F2642A';
          ctx.font = 'bold 32px sans-serif';
          ctx.fillText('↓', 580, topY + 140);
        }
      });
    });

    // -------------------------------------------------------------
    // SPREAD 03B — MAKE SPACE FOR QUESTIONS (Catalytic Transition)
    // -------------------------------------------------------------
    const l3BackTex = createPageTexture((ctx) => {
      ctx.fillStyle = '#4A6278';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText('PAGE 07', 240, 160);
      ctx.textAlign = 'right';
      ctx.fillText('READFIRST // INQUIRY', 1200, 160);
      ctx.textAlign = 'left';

      ctx.fillStyle = '#00142E';
      ctx.font = '600 116px "Newsreader", serif';
      ctx.fillText('MAKE SPACE', 240, 530);
      ctx.fillStyle = '#F2642A';
      ctx.font = 'italic 700 116px "Newsreader", serif';
      ctx.fillText('FOR QUESTIONS.', 240, 655);

      ctx.fillStyle = '#00142E';
      ctx.font = '600 50px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('What happens when learning has', 240, 800);
      ctx.fillText('space for questions?', 240, 870);
      ctx.fillText('A different kind of learner begins to emerge.', 240, 960);
    });

    const l4FrontTex = createPageTexture((ctx) => {
      ctx.fillStyle = '#4A6278';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText('THE FOUR INQUIRIES', 210, 160);
      ctx.textAlign = 'right';
      ctx.fillText('PAGE 08', 1230, 160);
      ctx.textAlign = 'left';

      const questions = ['Why?', 'How?', 'What if?', 'How do we know?'];
      questions.forEach((q, i) => {
        const y = 470 + i * 240;
        ctx.fillStyle = '#00142E';
        ctx.font = 'italic 600 126px "Newsreader", serif';
        ctx.fillText(q, 260, y);

        ctx.fillStyle = '#F2642A';
        ctx.beginPath();
        ctx.arc(200, y - 40, 9, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = '#F2642A';
      ctx.font = '700 26px "JetBrains Mono", monospace';
      ctx.fillText('// THE CATALYSTS OF INDEPENDENT THINKING', 210, 1490);
    });

    // -------------------------------------------------------------
    // SPREAD 04 — THE READFIRST IDEA
    // -------------------------------------------------------------
    const l4BackTex = createPageTexture((ctx) => {
      ctx.fillStyle = '#4A6278';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText('PAGE 09', 240, 160);
      ctx.textAlign = 'right';
      ctx.fillText('READFIRST // MONOGRAPH', 1200, 160);
      ctx.textAlign = 'left';

      ctx.fillStyle = '#F2642A';
      ctx.font = 'italic 600 180px "Newsreader", serif';
      ctx.fillText('04', 240, 410);

      ctx.fillStyle = '#00142E';
      ctx.font = '800 64px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('THE READFIRST IDEA', 240, 505);

      ctx.strokeStyle = '#F2642A';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(240, 555);
      ctx.lineTo(670, 555);
      ctx.stroke();

      ctx.fillStyle = '#00142E';
      ctx.font = '600 50px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('We believe learning should change the learner.', 240, 680);
      ctx.fillText('Not simply what they know, but how they read,', 240, 755);
      ctx.fillText('question, think, and continue learning.', 240, 830);
    });

    const s4RightTex = createPageTexture((ctx) => {
      ctx.fillStyle = '#4A6278';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText('CHAPTER 04 // THE IDEA', 210, 160);
      ctx.textAlign = 'right';
      ctx.fillText('PAGE 10', 1230, 160);
      ctx.textAlign = 'left';

      ctx.fillStyle = '#00142E';
      ctx.font = '600 88px "Newsreader", serif';
      ctx.fillText('LEARNING SHOULD', 210, 430);

      ctx.fillText('CREATE ', 210, 540);
      const createW = ctx.measureText('CREATE ').width;

      ctx.fillStyle = '#F2642A';
      ctx.font = 'italic 700 88px "Newsreader", serif';
      ctx.fillText('QUESTIONS,', 210 + createW + 18, 540);

      ctx.fillStyle = '#00142E';
      ctx.font = '600 88px "Newsreader", serif';
      ctx.fillText('NOT JUST ANSWERS.', 210, 650);

      ctx.fillStyle = '#00142E';
      ctx.font = '600 50px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('A learner who can ask a meaningful question', 210, 840);
      ctx.fillText('can continue learning beyond the classroom.', 210, 910);

      ctx.fillStyle = '#F2642A';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.fillText('CONTINUE TO THE READFIRST SYSTEM ↓', 210, 1120);
    });

    const gutterShadowTex = createGutterShadowTexture();
    const linenBumpTex = createLinenBumpTexture();
    const spineTex = createSpineTexture();

    return {
      coverTex,
      spineTex,
      s1LeftTex,
      l1FrontTex,
      l1BackTex,
      l2FrontTex,
      l2BackTex,
      l3FrontTex,
      l3BackTex,
      l4FrontTex,
      l4BackTex,
      s4RightTex,
      gutterShadowTex,
      linenBumpTex,
    };
  }, [fontsReady]);

  // Three.js Standard Materials with Realistic Specular/Roughness Maps
  const materials = useMemo(() => {
    return {
      cover: new THREE.MeshStandardMaterial({
        map: textures.coverTex,
        bumpMap: textures.linenBumpTex,
        bumpScale: 0.009,
        roughness: 0.44,
        metalness: 0.16,
      }),
      spine: new THREE.MeshStandardMaterial({
        map: textures.spineTex,
        bumpMap: textures.linenBumpTex,
        bumpScale: 0.012,
        roughness: 0.42,
        metalness: 0.16,
        side: THREE.DoubleSide,
      }),
      ribbon: new THREE.MeshStandardMaterial({
        color: '#F2642A',
        roughness: 0.35,
        metalness: 0.15,
        side: THREE.DoubleSide,
      }),
      paperBlock: new THREE.MeshStandardMaterial({
        color: '#EFE8D8',
        roughness: 0.94,
        metalness: 0.0,
      }),
      gutterShadow: new THREE.MeshBasicMaterial({
        map: textures.gutterShadowTex,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
      }),
    };
  }, [textures]);

  // Frame Loop: Smooth camera drift, spatial reading tilt, and subtle alive breathing
  useFrame((state, delta) => {
    if (!rootGroupRef.current) return;
    const leafProgress = getBookProgress();
    const p = leafProgress.p; // 0.00 to 1.00
    const time = state.clock.getElapsedTime();

    // Subtle microscopic breathing drift so the book feels alive in physical space
    const aliveDrift = Math.sin(time * 0.75) * 0.003;
    const aliveTilt = Math.cos(time * 0.55) * 0.002;

    // Smooth spring-like cursor inertia (heavy luxury object feel)
    const targetCursorX = cursorTarget?.current ? cursorTarget.current.x : 0;
    const targetCursorY = cursorTarget?.current ? cursorTarget.current.y : 0;
    cursorSmooth.current.x = THREE.MathUtils.damp(cursorSmooth.current.x, targetCursorX, 2.5, delta);
    cursorSmooth.current.y = THREE.MathUtils.damp(cursorSmooth.current.y, targetCursorY, 2.5, delta);

    // Subtle cursor rotational influence:
    // Horizontal: ±2.6° (±0.045 rad)
    // Vertical: ±1.4° (±0.024 rad)
    // Roll: ±0.4° (±0.007 rad)
    const cursorYaw = cursorSmooth.current.x * 0.045;
    const cursorPitch = cursorSmooth.current.y * 0.024;
    const cursorRoll = cursorSmooth.current.x * 0.007;

    // Staging Configurations:
    // Straight, centered reading position from initial load
    let targetX = 0.0;
    let targetY = -0.04 + aliveDrift;
    let targetZ = 0.12;
    let targetRotX = -0.24 + aliveTilt;  // Natural backward recline
    let targetRotY = 0.0;                // Straight facing forward
    let targetRotZ = 0.0;                // Straight level horizon

    if (p > 0.982) {
      // Exit perspective: Pull back, close gently, and sink into background
      const t = (p - 0.982) / 0.018;
      targetY = THREE.MathUtils.lerp(targetY, -2.4, t);
      targetZ = THREE.MathUtils.lerp(targetZ, -0.8, t);
      targetRotX = THREE.MathUtils.lerp(targetRotX, 0.45, t);
    }

    // Combine master scroll staging with subtle cursor reaction
    const finalRotX = targetRotX + cursorPitch;
    const finalRotY = targetRotY + cursorYaw;
    const finalRotZ = targetRotZ + cursorRoll;

    rootGroupRef.current.position.x = THREE.MathUtils.damp(rootGroupRef.current.position.x, targetX, 5, delta);
    rootGroupRef.current.position.y = THREE.MathUtils.damp(rootGroupRef.current.position.y, targetY, 5, delta);
    rootGroupRef.current.position.z = THREE.MathUtils.damp(rootGroupRef.current.position.z, targetZ, 5, delta);

    rootGroupRef.current.rotation.x = THREE.MathUtils.damp(rootGroupRef.current.rotation.x, finalRotX, 4, delta);
    rootGroupRef.current.rotation.y = THREE.MathUtils.damp(rootGroupRef.current.rotation.y, finalRotY, 4, delta);
    rootGroupRef.current.rotation.z = THREE.MathUtils.damp(rootGroupRef.current.rotation.z, finalRotZ, 4, delta);

    // Responsive framing: desktop keeps the original composition; narrower
    // screens pull the camera back so the book is never cropped, and portrait
    // screens centre the closed book in the space above the hero copy.
    const { zoom, shiftX, shiftY } = computeResponsiveFraming(
      state.size,
      state.camera.fov,
      heroFrame?.current,
      leafProgress.cover
    );

    const camTarget = cameraTarget.current;
    camTarget.x = THREE.MathUtils.damp(camTarget.x, 0.02 + shiftX, 4, delta);
    camTarget.y = THREE.MathUtils.damp(camTarget.y, -0.08 + shiftY, 4, delta);

    // Subtle camera parallax (2-6px equivalent shift), scaled with the framing distance
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      camTarget.x + (0.04 + cursorSmooth.current.x * 0.040) * zoom,
      3.0,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      camTarget.y + (0.46 - cursorSmooth.current.y * 0.020) * zoom,
      3.0,
      delta
    );
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      3.38 * zoom,
      4,
      delta
    );
    state.camera.lookAt(camTarget);

    // Front Cover Hinge (Opens from closed position to resting left wing cradle)
    if (coverHingeRef.current) {
      // Closed angle: 0 (flat over right page block). Open angle: -(PI - thetaL) (resting on left wing)
      const closedCoverAngle = 0;
      const openCoverAngle = -(Math.PI - thetaL);
      const targetCoverAngle = THREE.MathUtils.lerp(closedCoverAngle, openCoverAngle, leafProgress.cover);

      coverHingeRef.current.rotation.y = THREE.MathUtils.damp(
        coverHingeRef.current.rotation.y,
        targetCoverAngle,
        6,
        delta
      );

      // Organic lift arch over spine during opening
      const liftZ = Math.sin(leafProgress.cover * Math.PI) * 0.06;
      const baseZ = THREE.MathUtils.lerp(0.032, -0.016, leafProgress.cover);
      coverHingeRef.current.position.z = baseZ + liftZ;
    }

    // Wings dynamic opening cradle
    if (leftWingGroupRef.current && rightWingGroupRef.current) {
      const openT = leafProgress.cover;
      leftWingGroupRef.current.rotation.y = THREE.MathUtils.damp(
        leftWingGroupRef.current.rotation.y,
        thetaL * openT,
        6,
        delta
      );
      rightWingGroupRef.current.rotation.y = THREE.MathUtils.damp(
        rightWingGroupRef.current.rotation.y,
        -thetaR * openT,
        6,
        delta
      );
    }
  });

  return (
    <group ref={rootGroupRef} scale={[0.80, 0.80, 0.80]}>
      {/* -----------------------------------------------------------
          LEFT WING GROUP (Tilted at +thetaL in V-Cradle)
          ----------------------------------------------------------- */}
      <group ref={leftWingGroupRef} />

      {/* -----------------------------------------------------------
          RIGHT WING GROUP (Tilted at -thetaR in V-Cradle)
          ----------------------------------------------------------- */}
      <group ref={rightWingGroupRef}>
        {/* Right Back Cover Board */}
        <mesh position={[pageW / 2 + 0.015, 0, -coverThick / 2 - blockThick]}>
          <boxGeometry args={[pageW + 0.03, pageH + 0.05, coverThick]} />
          <primitive object={materials.cover} />
        </mesh>

        {/* Right Page Block (Recessed within spine casing and cover squares) */}
        <mesh position={[(pageW - 0.015) / 2 + 0.015, 0, -blockThick / 2]}>
          <boxGeometry args={[pageW - 0.015, pageH - 0.03, blockThick]} />
          <primitive object={materials.paperBlock} />
        </mesh>
      </group>

      {/* -----------------------------------------------------------
          PHYSICAL LUXURY SPINE & CASING (Archival fine-binding structure)
          ----------------------------------------------------------- */}
      <LuxurySpine
        pageH={pageH}
        materials={materials}
      />

      {/* -----------------------------------------------------------
          PHYSICAL GUTTER SIGNATURE STACK & SOFT AMBIENT CREASE
          ----------------------------------------------------------- */}
      <GutterSignatureStack
        pageH={pageH}
        materials={materials}
      />

      {/* -----------------------------------------------------------
          SPREAD 04 RIGHT RESTING BASE PAGE (Fixed at bottom of right stack)
          ----------------------------------------------------------- */}
      <CurvedRestingPage
        texture={textures.s4RightTex}
        side="right"
        pageW={pageW}
        pageH={pageH}
        zOffset={0.004}
        thetaR={thetaR}
        thetaL={thetaL}
      />

      {/* -----------------------------------------------------------
          TURNING LEAVES 4 TO 1 (Parametric Curved Flexible Sheets)
          ----------------------------------------------------------- */}
      {/* Leaf 4: Spread 03B Right (Questions) -> Spread 04 Left (Idea) */}
      <FlexibleCurvedLeaf
        frontTexture={textures.l4FrontTex}
        backTexture={textures.l4BackTex}
        leaf="l4"
        pageW={pageW}
        pageH={pageH}
        zRight={0.010}
        zLeft={0.034}
        thetaR={thetaR}
        thetaL={thetaL}
      />

      {/* Leaf 3: Spread 03A Right (The System) -> Spread 03B Left (Make Space) */}
      <FlexibleCurvedLeaf
        frontTexture={textures.l3FrontTex}
        backTexture={textures.l3BackTex}
        leaf="l3"
        pageW={pageW}
        pageH={pageH}
        zRight={0.016}
        zLeft={0.028}
        thetaR={thetaR}
        thetaL={thetaL}
      />

      {/* Leaf 2: Spread 02 Right (Artist) -> Spread 03A Left (The Question) */}
      <FlexibleCurvedLeaf
        frontTexture={textures.l2FrontTex}
        backTexture={textures.l2BackTex}
        leaf="l2"
        pageW={pageW}
        pageH={pageH}
        zRight={0.022}
        zLeft={0.022}
        thetaR={thetaR}
        thetaL={thetaL}
      />

      {/* Leaf 1: Spread 01 Right (Art of Learning) -> Spread 02 Left (Attention) */}
      <FlexibleCurvedLeaf
        frontTexture={textures.l1FrontTex}
        backTexture={textures.l1BackTex}
        leaf="l1"
        pageW={pageW}
        pageH={pageH}
        zRight={0.028}
        zLeft={0.016}
        thetaR={thetaR}
        thetaL={thetaL}
      />

      {/* -----------------------------------------------------------
          FRONT COVER HINGE (Heavy debossed board with inner Spread 01 flyleaf)
          Swings open from closed position over the right stack to resting left wing
          ----------------------------------------------------------- */}
      <group ref={coverHingeRef} position={[0, 0, 0.032]}>
        {/* Board thickness box */}
        <mesh position={[pageW / 2 + 0.015, 0, coverThick / 2]}>
          <boxGeometry args={[pageW + 0.03, pageH + 0.05, coverThick]} />
          <primitive object={materials.cover} />
        </mesh>

        {/* Outer Debossed Foil Cover (Visible when closed) */}
        <mesh position={[pageW / 2 + 0.015, 0, coverThick + 0.001]}>
          <planeGeometry args={[pageW + 0.02, pageH + 0.04]} />
          <primitive object={materials.cover} />
        </mesh>

        {/* Inner Flyleaf / Spread 01 Left Page (Organic concave curvature into spine) */}
        <InnerFlyleafCurved
          texture={textures.s1LeftTex}
          pageW={pageW}
          pageH={pageH}
        />
      </group>
    </group>
  );
}

/**
 * Cursor-Reactive Dynamic Light Highlight
 * Shifts softly across the open spreads to reveal tactile paper grain and curvature
 */
function CursorReactiveLight({ cursorSmooth }) {
  const lightRef = useRef();

  useFrame((state, delta) => {
    if (!lightRef.current) return;
    const targetX = -1.2 + cursorSmooth.current.x * 2.2;
    const targetY = 2.2 - cursorSmooth.current.y * 1.4;
    lightRef.current.position.x = THREE.MathUtils.damp(lightRef.current.position.x, targetX, 3.2, delta);
    lightRef.current.position.y = THREE.MathUtils.damp(lightRef.current.position.y, targetY, 3.2, delta);
  });

  return (
    <directionalLight
      ref={lightRef}
      position={[-1.2, 2.2, 3.8]}
      intensity={0.7}
      color="#FFFDF8"
    />
  );
}

/**
 * Main 3D Canvas Container
 */
export default function BookCanvas({ cameraMode = 'B', heroFrame }) {
  // Touch devices start at a lighter pixel ratio; PerformanceMonitor steps it
  // down further if the frame rate drops.
  const [dpr, setDpr] = useState(() =>
    Math.min(window.devicePixelRatio || 1, window.matchMedia('(pointer: coarse)').matches ? 1.5 : 2)
  );

  // Only the visible/hidden flip re-renders; once the book has exited the
  // render loop is paused entirely so the rest of the page scrolls freely.
  const [isVisible, setIsVisible] = useState(() => getStoryProgress() < 0.985);
  useEffect(() => subscribeStoryProgress((p) => setIsVisible(p < 0.985)), []);

  const [fontsReady, setFontsReady] = useState(false);
  const cursorTarget = useRef({ x: 0, y: 0, active: false });
  const cursorSmooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => setFontsReady(true)).catch(() => setFontsReady(true));
    } else {
      setFontsReady(true);
    }
  }, []);

  // Listen for cursor position with touch / reduced-motion checks
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const handlePointerMove = (e) => {
      // Normalized to -1 (left / top) to +1 (right / bottom)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      cursorTarget.current.x = THREE.MathUtils.clamp(nx, -1, 1);
      cursorTarget.current.y = THREE.MathUtils.clamp(ny, -1, 1);
      cursorTarget.current.active = true;
    };

    const handlePointerLeave = () => {
      cursorTarget.current.x = 0;
      cursorTarget.current.y = 0;
      cursorTarget.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
    };
  }, []);

  return (
    <div
      className="rf-story-3d-viewport"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.6s ease',
      }}
      aria-label="ReadFirst 3D Reading Experience"
    >
      <ModelErrorBoundary fallback={<div />}>
        <Canvas
          camera={{ position: [0.06, 0.38, 3.38], fov: 37 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.08,
          }}
          dpr={dpr}
          frameloop={isVisible ? 'always' : 'never'}
        >
          <PerformanceMonitor
            onDecline={() => setDpr((current) => Math.max(1, current - 0.5))}
            flipflops={3}
          />

          {/* Spatial Studio Gallery Lighting */}
          <ambientLight intensity={0.85} color="#DCE6F5" />

          {/* Large Soft Key Light from upper-left casting realistic shadows across the V-cradle */}
          <directionalLight
            position={[-3.8, 6.2, 5.0]}
            intensity={3.6}
            color="#FFFDF7"
          />

          {/* Cool Rim/Backlight to carve book edges and headbands against dark spatial atmosphere */}
          <directionalLight
            position={[-5.2, 4.5, -2.8]}
            intensity={2.1}
            color="#689FD4"
          />

          {/* Secondary Soft Fill from front-right */}
          <directionalLight
            position={[4.2, 2.5, 3.2]}
            intensity={1.2}
            color="#385F88"
          />

          {/* Warm Peach Underfill (Studio desk bounce) */}
          <pointLight position={[0, -2.5, 2.2]} intensity={0.65} color="#FBCFBA" />

          {/* Cursor-Reactive Soft Grazing Highlight */}
          <CursorReactiveLight cursorSmooth={cursorSmooth} />

          {/* The Physical Narrative Publication */}
          <CinematicNarrativeBook
            fontsReady={fontsReady}
            cameraMode={cameraMode}
            cursorTarget={cursorTarget}
            cursorSmooth={cursorSmooth}
            heroFrame={heroFrame}
          />

          {/* Deep Sharp Spine & Bottom Edge Contact Shadow */}
          <ContactShadows
            position={[0, -0.96, 0.15]}
            opacity={0.65}
            scale={5.8}
            resolution={256}
            blur={1.4}
            far={2.8}
            color="#000612"
          />

          {/* Soft Diffuse Room Ambient Shadow */}
          <ContactShadows
            position={[0, -0.96, 0.15]}
            opacity={0.32}
            scale={9.4}
            resolution={256}
            blur={3.0}
            far={4.8}
            color="#000A1C"
          />
        </Canvas>
      </ModelErrorBoundary>
    </div>
  );
}

