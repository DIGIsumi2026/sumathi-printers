import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Vec3 = [number, number, number];

type FloatingPaper = {
  color: string;
  opacity: number;
  offset: number;
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};

type FloatingParticle = {
  color: string;
  offset: number;
  position: Vec3;
  scale: number;
};

const paperItems: FloatingPaper[] = [
  {
    color: "#ffffff",
    opacity: 0.46,
    offset: 0.2,
    position: [-3.3, 1.35, -1.4],
    rotation: [0.18, -0.36, -0.16],
    scale: [0.9, 1.24, 1]
  },
  {
    color: "#eef9ff",
    opacity: 0.34,
    offset: 1.1,
    position: [-2.1, -1.15, -0.6],
    rotation: [-0.12, 0.24, 0.18],
    scale: [0.72, 1, 1]
  },
  {
    color: "#fff3fb",
    opacity: 0.4,
    offset: 2.2,
    position: [2.95, 1.1, -1],
    rotation: [0.1, 0.34, 0.14],
    scale: [0.86, 1.18, 1]
  },
  {
    color: "#f8f4ff",
    opacity: 0.32,
    offset: 3.4,
    position: [1.92, -1.45, -0.2],
    rotation: [-0.16, -0.22, -0.12],
    scale: [0.78, 1.08, 1]
  },
  {
    color: "#ffffff",
    opacity: 0.28,
    offset: 4.2,
    position: [0.1, 1.75, -1.8],
    rotation: [0.24, -0.16, 0.28],
    scale: [0.62, 0.88, 1]
  },
  {
    color: "#eef7ff",
    opacity: 0.27,
    offset: 5.1,
    position: [-0.7, -1.95, -1.1],
    rotation: [-0.2, 0.1, -0.18],
    scale: [0.68, 0.94, 1]
  },
  {
    color: "#fff8e6",
    opacity: 0.3,
    offset: 6.2,
    position: [3.65, -0.15, -1.5],
    rotation: [0.16, 0.18, -0.26],
    scale: [0.56, 0.8, 1]
  }
];

const particleItems: FloatingParticle[] = [
  { color: "#38c7ff", offset: 0.1, position: [-3.8, 0.15, 0.4], scale: 0.08 },
  { color: "#7a4dff", offset: 0.7, position: [-2.7, 2.05, -0.4], scale: 0.055 },
  { color: "#e72a9a", offset: 1.4, position: [-1.35, -1.75, 0.2], scale: 0.075 },
  { color: "#f6a13d", offset: 2.1, position: [-0.4, 1.15, -0.2], scale: 0.052 },
  { color: "#38c7ff", offset: 2.8, position: [0.95, -2.1, 0.35], scale: 0.07 },
  { color: "#7a4dff", offset: 3.5, position: [1.35, 1.88, -0.6], scale: 0.06 },
  { color: "#e72a9a", offset: 4.2, position: [2.35, -0.82, 0.1], scale: 0.082 },
  { color: "#f6bd29", offset: 4.9, position: [3.55, 1.78, -0.35], scale: 0.052 },
  { color: "#38c7ff", offset: 5.6, position: [4.05, -1.28, 0.25], scale: 0.065 },
  { color: "#e72a9a", offset: 6.3, position: [-4.05, -1.3, -0.25], scale: 0.048 },
  { color: "#7a4dff", offset: 7.1, position: [-1.9, 0.5, -0.85], scale: 0.052 },
  { color: "#f6a13d", offset: 7.9, position: [0.28, -0.55, -0.15], scale: 0.045 },
  { color: "#38c7ff", offset: 8.6, position: [2.85, 0.42, -0.85], scale: 0.054 }
];

function useMediaQuery(query: string, initialValue: boolean) {
  const [matches, setMatches] = useState(initialValue);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);

    return () => {
      mediaQuery.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
}

function FloatingPrintObjects() {
  const groupRef = useRef<THREE.Group>(null);
  const paperRefs = useRef<Array<THREE.Mesh | null>>([]);
  const particleRefs = useRef<Array<THREE.Mesh | null>>([]);
  const paperGeometryArgs = useMemo<[number, number, number, number]>(
    () => [1, 1.38, 1, 1],
    []
  );

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.16) * 0.06;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.12) * 0.025;
    }

    paperRefs.current.forEach((mesh, index) => {
      if (!mesh) return;

      const item = paperItems[index];
      const wave = elapsed * 0.42 + item.offset;

      mesh.position.y = item.position[1] + Math.sin(wave) * 0.12;
      mesh.position.x = item.position[0] + Math.cos(wave * 0.72) * 0.055;
      mesh.rotation.x = item.rotation[0] + Math.sin(wave * 0.66) * 0.045;
      mesh.rotation.y = item.rotation[1] + Math.cos(wave * 0.58) * 0.055;
      mesh.rotation.z = item.rotation[2] + Math.sin(wave * 0.5) * 0.035;
    });

    particleRefs.current.forEach((mesh, index) => {
      if (!mesh) return;

      const item = particleItems[index];
      const wave = elapsed * 0.55 + item.offset;

      mesh.position.y = item.position[1] + Math.sin(wave) * 0.16;
      mesh.position.x = item.position[0] + Math.cos(wave * 0.8) * 0.08;
      mesh.scale.setScalar(item.scale * (1 + Math.sin(wave * 1.2) * 0.12));
    });
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.72} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <pointLight color="#38c7ff" intensity={1.8} position={[-3, 2, 2]} />
      <pointLight color="#e72a9a" intensity={1.25} position={[3, -1, 2]} />

      {paperItems.map((item, index) => (
        <mesh
          key={`paper-${item.offset}`}
          ref={(node) => {
            paperRefs.current[index] = node;
          }}
          position={item.position}
          rotation={item.rotation}
          scale={item.scale}
        >
          <planeGeometry args={paperGeometryArgs} />
          <meshStandardMaterial
            color={item.color}
            transparent
            opacity={item.opacity}
            roughness={0.72}
            metalness={0.02}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {particleItems.map((item, index) => (
        <mesh
          key={`particle-${item.offset}`}
          ref={(node) => {
            particleRefs.current[index] = node;
          }}
          position={item.position}
          scale={item.scale}
        >
          <sphereGeometry args={[1, 14, 14]} />
          <meshStandardMaterial
            color={item.color}
            emissive={item.color}
            emissiveIntensity={0.42}
            transparent
            opacity={0.78}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function FloatingPrintScene() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
    false
  );
  const canRenderScene = useMediaQuery("(min-width: 768px)", true);

  if (prefersReducedMotion || !canRenderScene) {
    return null;
  }

  return (
    <div className="sp-three-scene" aria-hidden="true">
      <Canvas
        className="sp-three-scene-canvas"
        camera={{ position: [0, 0, 6.8], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power"
        }}
      >
        <FloatingPrintObjects />
      </Canvas>
    </div>
  );
}
