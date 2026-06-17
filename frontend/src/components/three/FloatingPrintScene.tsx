import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Vec3 = [number, number, number];

type FloatingPrintSceneVariant =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "gallery"
  | "contact"
  | "minimal";

type FloatingPrintSceneProps = {
  variant: FloatingPrintSceneVariant;
  density?: "hero" | "light";
};

type FloatingObjectKind =
  | "paper"
  | "card"
  | "frame"
  | "box"
  | "strip"
  | "orb"
  | "ring"
  | "bubble";

type FloatingObject = {
  color: string;
  emissive?: string;
  kind: FloatingObjectKind;
  opacity: number;
  offset: number;
  position: Vec3;
  rotation: Vec3;
  scale: Vec3;
};

type VariantPreset = {
  cameraZ: number;
  objects: FloatingObject[];
  opacity: {
    hero: number;
    light: number;
  };
};

const cmykColors = {
  cyan: "#38c7ff",
  purple: "#7a4dff",
  pink: "#e72a9a",
  yellow: "#f6bd29",
  orange: "#f6a13d",
  white: "#ffffff"
};

const object = (
  kind: FloatingObjectKind,
  color: string,
  position: Vec3,
  scale: Vec3,
  offset: number,
  rotation: Vec3 = [0, 0, 0],
  opacity = 0.46,
  emissive?: string
): FloatingObject => ({
  color,
  emissive,
  kind,
  opacity,
  offset,
  position,
  rotation,
  scale
});

const variantPresets: Record<FloatingPrintSceneVariant, VariantPreset> = {
  home: {
    cameraZ: 6.8,
    opacity: { hero: 0.46, light: 0.3 },
    objects: [
      object("paper", cmykColors.white, [-3.35, 1.35, -1.4], [0.9, 1.24, 1], 0.2, [0.18, -0.36, -0.16], 0.46),
      object("card", "#eef9ff", [-2.1, -1.15, -0.6], [0.72, 1, 1], 1.1, [-0.12, 0.24, 0.18], 0.34),
      object("paper", "#fff3fb", [2.95, 1.1, -1], [0.86, 1.18, 1], 2.2, [0.1, 0.34, 0.14], 0.4),
      object("card", "#f8f4ff", [1.92, -1.45, -0.2], [0.78, 1.08, 1], 3.4, [-0.16, -0.22, -0.12], 0.32),
      object("paper", "#fff8e6", [3.65, -0.15, -1.5], [0.56, 0.8, 1], 4.4, [0.16, 0.18, -0.26], 0.3),
      object("orb", cmykColors.cyan, [-3.8, 0.15, 0.4], [0.08, 0.08, 0.08], 0.7, [0, 0, 0], 0.78, cmykColors.cyan),
      object("orb", cmykColors.purple, [-2.7, 2.05, -0.4], [0.055, 0.055, 0.055], 1.4, [0, 0, 0], 0.72, cmykColors.purple),
      object("orb", cmykColors.pink, [-1.35, -1.75, 0.2], [0.075, 0.075, 0.075], 2.1, [0, 0, 0], 0.76, cmykColors.pink),
      object("orb", cmykColors.orange, [-0.4, 1.15, -0.2], [0.052, 0.052, 0.052], 2.8, [0, 0, 0], 0.72, cmykColors.orange),
      object("orb", cmykColors.cyan, [0.95, -2.1, 0.35], [0.07, 0.07, 0.07], 3.5, [0, 0, 0], 0.76, cmykColors.cyan),
      object("orb", cmykColors.purple, [1.35, 1.88, -0.6], [0.06, 0.06, 0.06], 4.2, [0, 0, 0], 0.74, cmykColors.purple),
      object("orb", cmykColors.pink, [2.35, -0.82, 0.1], [0.082, 0.082, 0.082], 4.9, [0, 0, 0], 0.74, cmykColors.pink),
      object("orb", cmykColors.yellow, [3.55, 1.78, -0.35], [0.052, 0.052, 0.052], 5.6, [0, 0, 0], 0.7, cmykColors.yellow)
    ]
  },
  about: {
    cameraZ: 7,
    opacity: { hero: 0.42, light: 0.28 },
    objects: [
      object("paper", "#ffffff", [-3.1, 1.15, -1.2], [0.82, 1.18, 1], 0.4, [0.16, -0.28, -0.12], 0.38),
      object("card", "#eef7ff", [-1.95, -1.25, -0.4], [0.72, 0.92, 1], 1.3, [-0.08, 0.18, 0.12], 0.32),
      object("card", "#f7f3ff", [0.05, 1.45, -1.7], [0.64, 0.86, 1], 2.2, [0.18, -0.12, 0.22], 0.28),
      object("paper", "#fff8ee", [2.85, -1.12, -0.8], [0.82, 1.08, 1], 3.1, [-0.14, 0.26, -0.18], 0.34),
      object("ring", cmykColors.cyan, [3.2, 1.22, -1.4], [0.34, 0.34, 0.34], 3.8, [0.28, 0.14, 0.2], 0.5, cmykColors.cyan),
      object("ring", cmykColors.pink, [-3.45, -1.55, -0.7], [0.26, 0.26, 0.26], 4.7, [-0.18, 0.2, -0.1], 0.42, cmykColors.pink),
      object("ring", cmykColors.purple, [1.82, 0.42, -0.2], [0.18, 0.18, 0.18], 5.4, [0.08, -0.24, 0.16], 0.44, cmykColors.purple),
      object("orb", cmykColors.cyan, [-2.65, 0.35, 0.2], [0.06, 0.06, 0.06], 6.1, [0, 0, 0], 0.7, cmykColors.cyan),
      object("orb", cmykColors.purple, [-0.75, -1.95, -0.1], [0.052, 0.052, 0.052], 6.8, [0, 0, 0], 0.68, cmykColors.purple),
      object("orb", cmykColors.orange, [2.25, 1.95, -0.3], [0.052, 0.052, 0.052], 7.6, [0, 0, 0], 0.66, cmykColors.orange),
      object("orb", cmykColors.pink, [3.8, -0.34, 0.12], [0.064, 0.064, 0.064], 8.4, [0, 0, 0], 0.7, cmykColors.pink)
    ]
  },
  services: {
    cameraZ: 7.2,
    opacity: { hero: 0.44, light: 0.3 },
    objects: [
      object("paper", "#ffffff", [-3.45, 1.28, -1.4], [0.74, 1.02, 1], 0.3, [0.2, -0.3, -0.14], 0.36),
      object("box", "#fff4e1", [-2.35, -1.2, -0.5], [0.68, 0.46, 0.38], 1.2, [0.24, -0.34, 0.12], 0.52),
      object("box", "#f1ecff", [2.65, 0.9, -1.1], [0.78, 0.5, 0.42], 2.1, [0.18, 0.3, -0.1], 0.44),
      object("paper", "#eef9ff", [1.6, -1.58, -0.2], [0.78, 1.06, 1], 3, [-0.16, -0.22, 0.16], 0.34),
      object("strip", cmykColors.cyan, [-0.55, 1.5, -0.6], [1.2, 1, 1], 3.8, [0.18, 0.08, -0.42], 0.66, cmykColors.cyan),
      object("strip", cmykColors.pink, [3.55, -1.42, -0.7], [1.05, 1, 1], 4.5, [-0.12, -0.1, 0.48], 0.56, cmykColors.pink),
      object("ring", cmykColors.purple, [-3.75, -0.12, -0.6], [0.26, 0.26, 0.26], 5.2, [0.2, -0.1, 0.2], 0.46, cmykColors.purple),
      object("ring", cmykColors.orange, [0.82, -0.65, -0.1], [0.18, 0.18, 0.18], 5.9, [-0.1, 0.26, -0.08], 0.5, cmykColors.orange),
      object("orb", cmykColors.cyan, [-2.4, 2.05, 0.2], [0.066, 0.066, 0.066], 6.6, [0, 0, 0], 0.7, cmykColors.cyan),
      object("orb", cmykColors.pink, [-1.2, -1.92, 0.1], [0.07, 0.07, 0.07], 7.4, [0, 0, 0], 0.72, cmykColors.pink),
      object("orb", cmykColors.purple, [2.1, 1.9, -0.2], [0.056, 0.056, 0.056], 8.2, [0, 0, 0], 0.68, cmykColors.purple),
      object("orb", cmykColors.yellow, [3.55, 0.08, 0.12], [0.052, 0.052, 0.052], 9, [0, 0, 0], 0.66, cmykColors.yellow)
    ]
  },
  projects: {
    cameraZ: 7,
    opacity: { hero: 0.4, light: 0.28 },
    objects: [
      object("frame", "#f7fbff", [-3.25, 1.28, -1.1], [0.84, 0.58, 1], 0.5, [0.18, -0.3, -0.12], 0.38),
      object("card", "#ffffff", [-2.42, -1.2, -0.2], [0.74, 0.96, 1], 1.4, [-0.12, 0.22, 0.16], 0.32),
      object("frame", "#fff4fb", [-0.3, 1.76, -1.6], [0.66, 0.48, 1], 2.3, [0.16, -0.12, 0.2], 0.3),
      object("card", "#eef9ff", [1.62, -1.42, -0.5], [0.86, 1.08, 1], 3.2, [-0.18, -0.2, -0.12], 0.36),
      object("frame", "#fff8e8", [3.25, 0.88, -1.2], [0.8, 0.54, 1], 4.1, [0.16, 0.28, 0.14], 0.34),
      object("card", "#f4f0ff", [3.65, -0.92, -0.4], [0.54, 0.7, 1], 5, [-0.08, 0.2, 0.22], 0.28),
      object("orb", cmykColors.pink, [-3.6, -0.08, 0.1], [0.066, 0.066, 0.066], 5.8, [0, 0, 0], 0.72, cmykColors.pink),
      object("orb", cmykColors.cyan, [-1.32, 0.64, -0.2], [0.052, 0.052, 0.052], 6.6, [0, 0, 0], 0.68, cmykColors.cyan),
      object("orb", cmykColors.purple, [0.58, -2.02, 0.12], [0.07, 0.07, 0.07], 7.4, [0, 0, 0], 0.72, cmykColors.purple),
      object("orb", cmykColors.yellow, [2.18, 1.92, -0.12], [0.052, 0.052, 0.052], 8.2, [0, 0, 0], 0.66, cmykColors.yellow),
      object("orb", cmykColors.cyan, [3.95, -1.74, 0.18], [0.06, 0.06, 0.06], 9, [0, 0, 0], 0.68, cmykColors.cyan)
    ]
  },
  gallery: {
    cameraZ: 6.9,
    opacity: { hero: 0.43, light: 0.28 },
    objects: [
      object("frame", "#ffffff", [-3.42, 1.42, -1.2], [0.78, 0.58, 1], 0.2, [0.2, -0.3, -0.14], 0.42),
      object("frame", "#eef9ff", [-2.2, -1.26, -0.3], [0.72, 0.52, 1], 1.1, [-0.12, 0.22, 0.14], 0.34),
      object("card", "#fff3fb", [-0.52, 1.78, -1.6], [0.56, 0.72, 1], 2, [0.18, -0.16, 0.2], 0.28),
      object("frame", "#f8f4ff", [1.56, -1.48, -0.4], [0.8, 0.56, 1], 2.9, [-0.16, -0.22, -0.14], 0.36),
      object("frame", "#fff9e9", [3.12, 1.08, -1.1], [0.76, 0.54, 1], 3.8, [0.12, 0.28, 0.16], 0.34),
      object("card", "#ffffff", [3.64, -0.86, -0.5], [0.52, 0.66, 1], 4.7, [-0.08, 0.16, 0.22], 0.26),
      object("orb", cmykColors.cyan, [-3.85, -0.24, 0.12], [0.056, 0.056, 0.056], 5.6, [0, 0, 0], 0.7, cmykColors.cyan),
      object("orb", cmykColors.pink, [-1.35, 0.56, -0.2], [0.062, 0.062, 0.062], 6.4, [0, 0, 0], 0.7, cmykColors.pink),
      object("orb", cmykColors.purple, [0.52, -2.06, 0.14], [0.068, 0.068, 0.068], 7.2, [0, 0, 0], 0.72, cmykColors.purple),
      object("orb", cmykColors.yellow, [2.32, 1.92, -0.18], [0.052, 0.052, 0.052], 8, [0, 0, 0], 0.66, cmykColors.yellow),
      object("orb", cmykColors.cyan, [3.8, -1.7, 0.2], [0.06, 0.06, 0.06], 8.8, [0, 0, 0], 0.68, cmykColors.cyan)
    ]
  },
  contact: {
    cameraZ: 7,
    opacity: { hero: 0.42, light: 0.28 },
    objects: [
      object("card", "#ffffff", [-3.25, 1.2, -1.2], [0.84, 0.56, 1], 0.3, [0.14, -0.28, -0.12], 0.38),
      object("bubble", cmykColors.cyan, [-2.32, -1.36, -0.4], [0.56, 0.34, 0.12], 1.2, [-0.1, 0.18, 0.14], 0.42, cmykColors.cyan),
      object("card", "#fff3fb", [-0.35, 1.58, -1.6], [0.68, 0.46, 1], 2.1, [0.18, -0.12, 0.2], 0.3),
      object("bubble", cmykColors.pink, [1.62, -1.5, -0.2], [0.62, 0.36, 0.12], 3, [-0.14, -0.16, -0.14], 0.4, cmykColors.pink),
      object("card", "#eef9ff", [3.08, 0.98, -1], [0.78, 0.5, 1], 3.9, [0.14, 0.24, 0.12], 0.34),
      object("ring", cmykColors.cyan, [-3.58, -0.08, -0.4], [0.24, 0.24, 0.24], 4.8, [0.18, -0.1, 0.12], 0.5, cmykColors.cyan),
      object("ring", cmykColors.purple, [0.52, -0.42, -0.2], [0.18, 0.18, 0.18], 5.6, [-0.08, 0.2, -0.12], 0.42, cmykColors.purple),
      object("ring", cmykColors.orange, [3.56, -1.52, -0.7], [0.2, 0.2, 0.2], 6.4, [0.16, 0.16, 0.12], 0.44, cmykColors.orange),
      object("orb", cmykColors.cyan, [-1.3, 0.42, 0.12], [0.058, 0.058, 0.058], 7.2, [0, 0, 0], 0.68, cmykColors.cyan),
      object("orb", cmykColors.pink, [0.58, -2.02, 0.16], [0.066, 0.066, 0.066], 8, [0, 0, 0], 0.7, cmykColors.pink),
      object("orb", cmykColors.yellow, [2.22, 1.88, -0.2], [0.05, 0.05, 0.05], 8.8, [0, 0, 0], 0.66, cmykColors.yellow)
    ]
  },
  minimal: {
    cameraZ: 7.4,
    opacity: { hero: 0.34, light: 0.26 },
    objects: [
      object("paper", "#ffffff", [-2.6, 1.05, -1], [0.54, 0.76, 1], 0.4, [0.14, -0.2, -0.12], 0.3),
      object("card", "#eef9ff", [2.22, -0.92, -0.6], [0.56, 0.72, 1], 1.4, [-0.1, 0.22, 0.14], 0.28),
      object("orb", cmykColors.cyan, [-1.6, -1.2, 0.1], [0.052, 0.052, 0.052], 2.4, [0, 0, 0], 0.66, cmykColors.cyan),
      object("orb", cmykColors.pink, [0.7, 1.32, -0.3], [0.056, 0.056, 0.056], 3.2, [0, 0, 0], 0.66, cmykColors.pink),
      object("ring", cmykColors.purple, [2.95, 0.72, -0.7], [0.18, 0.18, 0.18], 4.1, [0.16, -0.12, 0.1], 0.38, cmykColors.purple),
      object("orb", cmykColors.yellow, [-3.05, -0.24, -0.4], [0.046, 0.046, 0.046], 5, [0, 0, 0], 0.62, cmykColors.yellow)
    ]
  }
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches
  );

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

function FloatingObjects({ objects }: { objects: FloatingObject[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<Array<THREE.Mesh | null>>([]);
  const planeArgs = useMemo<[number, number, number, number]>(
    () => [1, 1, 1, 1],
    []
  );

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.14) * 0.045;
      groupRef.current.rotation.x = Math.sin(elapsed * 0.1) * 0.018;
    }

    meshRefs.current.forEach((mesh, index) => {
      if (!mesh) return;

      const item = objects[index];
      const wave = elapsed * 0.38 + item.offset;
      const pulse = 1 + Math.sin(wave * 1.16) * 0.08;

      mesh.position.y = item.position[1] + Math.sin(wave) * 0.12;
      mesh.position.x = item.position[0] + Math.cos(wave * 0.72) * 0.06;
      mesh.rotation.x = item.rotation[0] + Math.sin(wave * 0.64) * 0.038;
      mesh.rotation.y = item.rotation[1] + Math.cos(wave * 0.58) * 0.048;
      mesh.rotation.z = item.rotation[2] + Math.sin(wave * 0.5) * 0.032;

      if (item.kind === "orb" || item.kind === "bubble") {
        mesh.scale.set(
          item.scale[0] * pulse,
          item.scale[1] * pulse,
          item.scale[2] * pulse
        );
      }
    });
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.74} />
      <directionalLight position={[3, 4, 5]} intensity={1.12} />
      <pointLight color={cmykColors.cyan} intensity={1.42} position={[-3, 2, 2]} />
      <pointLight color={cmykColors.pink} intensity={1.08} position={[3, -1, 2]} />

      {objects.map((item, index) => (
        <mesh
          key={`${item.kind}-${item.offset}`}
          ref={(node) => {
            meshRefs.current[index] = node;
          }}
          position={item.position}
          rotation={item.rotation}
          scale={item.scale}
        >
          {(item.kind === "paper" || item.kind === "card" || item.kind === "frame") && (
            <planeGeometry args={planeArgs} />
          )}

          {item.kind === "box" && <boxGeometry args={[1, 0.72, 0.32]} />}
          {item.kind === "strip" && <boxGeometry args={[1, 0.06, 0.035]} />}
          {(item.kind === "orb" || item.kind === "bubble") && (
            <sphereGeometry args={[1, 14, 14]} />
          )}
          {item.kind === "ring" && <torusGeometry args={[1, 0.035, 8, 36]} />}

          <meshStandardMaterial
            color={item.color}
            emissive={item.emissive ?? "#000000"}
            emissiveIntensity={item.emissive ? 0.32 : 0}
            metalness={item.kind === "ring" || item.kind === "strip" ? 0.08 : 0.02}
            opacity={item.opacity}
            roughness={0.72}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

export default function FloatingPrintScene({
  variant,
  density = "hero"
}: FloatingPrintSceneProps) {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const canRenderScene = useMediaQuery("(min-width: 768px)");
  const preset = variantPresets[variant];
  const objects = density === "light" ? preset.objects.slice(0, 6) : preset.objects;
  const sceneStyle = {
    "--sp-three-opacity": preset.opacity[density]
  } as CSSProperties;

  if (prefersReducedMotion || !canRenderScene) {
    return null;
  }

  return (
    <div
      className={`sp-three-scene sp-three-scene-${variant} sp-three-scene-${density}`}
      aria-hidden="true"
      style={sceneStyle}
    >
      <Canvas
        className="sp-three-scene-canvas"
        camera={{ position: [0, 0, preset.cameraZ], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "low-power"
        }}
      >
        <FloatingObjects objects={objects} />
      </Canvas>
    </div>
  );
}
