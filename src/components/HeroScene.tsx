"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const ROWS = 14;
const COLS = 14;
const PER_CELL = 2;
const REJECT_RATE = 0.05;
const GHOSTS_PER_SOURCE = 70;
const SRC_X = -3.0;
const GATE_X = -0.75;
const TABLE_X0 = 0.2;
const CELL = 0.24;
const ROW_H = 0.2;
const LOAD_MS = 3200;
const SIGNAL_START = 0.8;
const ROT0 = -0.16;
const ROT_RANGE = 0.36;
const FOV = 32;
const FIT_HALF_WIDTH = 3.9;
const FIT_HALF_HEIGHT = 1.9;
const CAMERA_PADDING = 0.6;
const GROUP_X_OFFSET = -0.05;
const GROUP_TILT = 0.05;
const ROTATION_LERP = 0.08;
const ROTATION_EPSILON = 0.0005;
const EDGE_LIFT = 0.14;

const POINT_VERTEX = /* glsl */ `
  uniform float uProgress, uSignal, uPixelRatio, uGateX;
  attribute vec3 aStart;
  attribute float aDelay, aKind, aStatus;
  varying float vLanded, vKind, vSignal, vAlpha;
  float easeInOutSine(float x) { return -(cos(3.14159265 * x) - 1.0) / 2.0; }
  vec3 bezier(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
    float u = 1.0 - t;
    return u*u*u*a + 3.0*u*u*t*b + 3.0*u*t*t*c + t*t*t*d;
  }
  void main() {
    float t = easeInOutSine(clamp((uProgress - aDelay) / 0.55, 0.0, 1.0));
    vec3 c1 = vec3(uGateX - 1.1, mix(aStart.y, position.y, 0.55), aStart.z * 0.3);
    vec3 c2 = vec3(uGateX + 0.5, position.y, position.z);
    vec3 p = aKind > 1.5 ? aStart : bezier(aStart, c1, c2, position, t);
    vLanded = aKind > 1.5 ? 0.0 : smoothstep(0.7, 1.0, t);
    vKind = aKind;
    vSignal = aStatus * uSignal;
    vAlpha = aKind > 1.5 ? 0.16 : aKind > 0.5 ? mix(0.6, 0.25, vLanded) : mix(0.5, 0.95, vLanded);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = aKind > 0.5 ? 2.6 : mix(2.8, 3.4, vLanded) + vSignal * 0.6;
    gl_PointSize = size * uPixelRatio * (16.0 / -mv.z);
  }
`;

const POINT_FRAGMENT = /* glsl */ `
  uniform vec3 uRaw, uClean, uSignalColor;
  varying float vLanded, vKind, vSignal, vAlpha;
  void main() {
    vec2 q = abs(gl_PointCoord - 0.5);
    float d = mix(length(q) * 1.06, max(q.x, q.y), vLanded);
    float edge = 1.0 - smoothstep(0.38, 0.5, d);
    if (edge <= 0.0) discard;
    vec3 base = mix(uRaw, uClean, vLanded * step(vKind, 0.5));
    gl_FragColor = vec4(mix(base, uSignalColor, vSignal), vAlpha * edge);
  }
`;

type RecordData = {
  start: THREE.Vector3;
  target: THREE.Vector3;
  reject: boolean;
  ghost: boolean;
  status: number;
  delay: number;
};

type Palette = {
  raw: THREE.Color;
  clean: THREE.Color;
  signal: THREE.Color;
  edge: THREE.Color;
};

function paintContext() {
  const swatch = document.createElement("canvas");
  swatch.width = 1;
  swatch.height = 1;
  return swatch.getContext("2d", { willReadFrequently: true });
}

function tokenColor(context: CanvasRenderingContext2D, token: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  if (!value) return null;
  context.fillStyle = "rgb(1, 2, 3)";
  context.fillRect(0, 0, 1, 1);
  context.fillStyle = value;
  context.fillRect(0, 0, 1, 1);
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
  if (red === 1 && green === 2 && blue === 3) return null;
  return new THREE.Color().setRGB(red / 255, green / 255, blue / 255);
}

function readPalette(): Palette | null {
  const context = paintContext();
  if (!context) return null;
  const raw = tokenColor(context, "--color-text-muted");
  const clean = tokenColor(context, "--color-text-secondary");
  const border = tokenColor(context, "--color-border");
  const signal = tokenColor(context, "--color-signal-blue");
  if (!raw || !clean || !border || !signal) return null;
  return { raw, clean, edge: border.clone().lerp(clean, EDGE_LIFT), signal };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function buildRecords(): RecordData[] {
  let seed = 11;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5;

  const sources = [
    { y: 1.15, spread: [0.75, 0.3] },
    { y: 0.0, spread: [0.9, 0.24] },
    { y: -1.15, spread: [0.65, 0.32] },
  ];

  const records: RecordData[] = [];
  const tableH = (ROWS - 1) * ROW_H;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      for (let k = 0; k < PER_CELL; k++) {
        const src = sources[(r * 7 + c * 3 + k) % 3];
        const start = new THREE.Vector3(
          SRC_X + gauss() * src.spread[0],
          src.y + gauss() * src.spread[1],
          gauss() * 0.8,
        );
        const target = new THREE.Vector3(
          TABLE_X0 + c * CELL,
          tableH / 2 - r * ROW_H,
          (k - 0.5) * 0.04,
        );
        const reject = rand() < REJECT_RATE;
        if (reject) {
          target.set(
            GATE_X + 0.1 + rand() * 0.5,
            -tableH / 2 - 0.45 - rand() * 0.3,
            gauss() * 0.2,
          );
        }
        const delay =
          Math.min(0.45, Math.max(0, (start.x - (SRC_X - 1.2)) / 2.4) * 0.12 + rand() * 0.33);
        records.push({
          start,
          target,
          reject,
          ghost: false,
          status: !reject && c === COLS - 1 ? 1 : 0,
          delay,
        });
      }
    }
  }

  sources.forEach((src) => {
    for (let g = 0; g < GHOSTS_PER_SOURCE; g++) {
      const q = new THREE.Vector3(
        SRC_X + gauss() * src.spread[0] * 1.2,
        src.y + gauss() * src.spread[1] * 1.2,
        gauss() * 0.8,
      );
      records.push({
        start: q,
        target: q.clone(),
        reject: false,
        ghost: true,
        status: 0,
        delay: 0,
      });
    }
  });

  return records;
}

function ConversionFlow() {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);
  const size = useThree((state) => state.size);

  const reduced = usePrefersReducedMotion();
  const group = useRef<THREE.Group>(null);
  const pointsMaterial = useRef<THREE.ShaderMaterial>(null);
  const rotation = useRef({ current: ROT0, target: ROT0 });
  const onScreen = useRef(true);

  const records = useMemo(buildRecords, []);
  const palette = useMemo(readPalette, []);
  const tableH = (ROWS - 1) * ROW_H;

  const geometryData = useMemo(() => {
    const n = records.length;
    const position = new Float32Array(n * 3);
    const aStart = new Float32Array(n * 3);
    const aDelay = new Float32Array(n);
    const aKind = new Float32Array(n);
    const aStatus = new Float32Array(n);
    records.forEach((rec, i) => {
      position.set(rec.target.toArray(), i * 3);
      aStart.set(rec.start.toArray(), i * 3);
      aDelay[i] = rec.delay;
      aKind[i] = rec.ghost ? 2 : rec.reject ? 1 : 0;
      aStatus[i] = rec.status;
    });
    return { position, aStart, aDelay, aKind, aStatus };
  }, [records]);

  const linePositions = useMemo(() => {
    const tx1 = TABLE_X0 + (COLS - 1) * CELL;
    const gh = tableH / 2 + 0.3;
    return new Float32Array([
      GATE_X, -gh, 0,
      GATE_X, gh, 0,
      TABLE_X0 - 0.12, tableH / 2 + 0.18, 0,
      tx1 + 0.12, tableH / 2 + 0.18, 0,
    ]);
  }, [tableH]);

  const uniforms = useMemo(() => {
    if (!palette) return null;
    return {
      uProgress: { value: 0 },
      uSignal: { value: 0 },
      uPixelRatio: { value: 1 },
      uGateX: { value: GATE_X },
      uRaw: { value: palette.raw },
      uClean: { value: palette.clean },
      uSignalColor: { value: palette.signal },
    };
  }, [palette]);

  const requestRender = useCallback(() => {
    if (onScreen.current) invalidate();
  }, [invalidate]);

  useLayoutEffect(() => {
    if (!uniforms) return;
    if (pointsMaterial.current) {
      pointsMaterial.current.uniforms = uniforms;
      pointsMaterial.current.needsUpdate = true;
    }
    invalidate();
  }, [invalidate, uniforms]);

  useEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    if (!size.width || !size.height) return;
    const aspect = size.width / size.height;
    const tangent = Math.tan(THREE.MathUtils.degToRad(perspective.fov / 2));
    perspective.aspect = aspect;
    perspective.position.set(
      0,
      0,
      Math.max(FIT_HALF_WIDTH / (tangent * aspect), FIT_HALF_HEIGHT / tangent) + CAMERA_PADDING,
    );
    perspective.updateProjectionMatrix();
    if (uniforms) uniforms.uPixelRatio.value = gl.getPixelRatio();
    invalidate();
  }, [camera, gl, invalidate, size, uniforms]);

  useEffect(() => {
    if (!uniforms) return;
    if (reduced) {
      uniforms.uProgress.value = 1;
      uniforms.uSignal.value = 1;
      invalidate();
      return;
    }
    const started = performance.now();
    let frame = 0;
    const advance = (now: number) => {
      const progress = Math.min((now - started) / LOAD_MS, 1);
      uniforms.uProgress.value = progress;
      uniforms.uSignal.value = Math.min(Math.max((progress - SIGNAL_START) / (1 - SIGNAL_START), 0), 1);
      if (progress < 1) frame = requestAnimationFrame(advance);
      invalidate();
    };
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [invalidate, reduced, uniforms]);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const hero = gl.domElement.closest<HTMLElement>("[data-hero]");
      const height = hero ? hero.offsetHeight : 0;
      const progress = height > 0 ? Math.min(Math.max(window.scrollY / height, 0), 1) : 0;
      rotation.current.target = ROT0 + progress * ROT_RANGE;
      requestRender();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [gl, reduced, requestRender]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
      if (entry.isIntersecting) invalidate();
    });
    observer.observe(gl.domElement);
    return () => observer.disconnect();
  }, [gl, invalidate]);

  useFrame(() => {
    const delta = rotation.current.target - rotation.current.current;
    if (Math.abs(delta) <= ROTATION_EPSILON) {
      rotation.current.current = rotation.current.target;
      return;
    }
    rotation.current.current += delta * ROTATION_LERP;
    if (group.current) group.current.rotation.set(GROUP_TILT, rotation.current.current, 0);
    requestRender();
  });

  if (!uniforms || !palette) return null;

  return (
    <group ref={group} position={[GROUP_X_OFFSET, 0, 0]} rotation={[GROUP_TILT, ROT0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geometryData.position, 3]} />
          <bufferAttribute attach="attributes-aStart" args={[geometryData.aStart, 3]} />
          <bufferAttribute attach="attributes-aDelay" args={[geometryData.aDelay, 1]} />
          <bufferAttribute attach="attributes-aKind" args={[geometryData.aKind, 1]} />
          <bufferAttribute attach="attributes-aStatus" args={[geometryData.aStatus, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={pointsMaterial}
          vertexShader={POINT_VERTEX}
          fragmentShader={POINT_FRAGMENT}
          transparent
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={palette.edge} transparent opacity={1} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      legacy
      linear
      flat
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ fov: FOV, near: 0.1, far: 100, position: [0, 0, 8] }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      <ConversionFlow />
    </Canvas>
  );
}
