import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import { motion, useReducedMotion } from 'framer-motion';
import { AdditiveBlending, DoubleSide, Shape } from 'three';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}

function MagicDust({ count, animate }) {
  const pointsRef = useRef(null);
  const { positions, colors } = useMemo(() => {
    const total = count;
    const nextPositions = new Float32Array(total * 3);
    const nextColors = new Float32Array(total * 3);
    const palette = [
      [0.56, 0.29, 0.18],
      [0.26, 0.32, 0.23],
      [0.77, 0.6, 0.38],
      [0.9, 0.78, 0.62],
    ];

    for (let index = 0; index < total; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const orbit = 1.12 + Math.random() * 1.45;
      const wave = Math.sin(angle * 2) * 0.24;
      const x = Math.cos(angle) * orbit;
      const y = Math.sin(angle) * (orbit * 0.52) + wave;
      const z = (Math.random() - 0.5) * 1.2;

      nextPositions[index * 3] = x;
      nextPositions[index * 3 + 1] = y;
      nextPositions[index * 3 + 2] = z;

      const color = palette[index % palette.length];
      nextColors[index * 3] = color[0];
      nextColors[index * 3 + 1] = color[1];
      nextColors[index * 3 + 2] = color[2];
    }

    return { positions: nextPositions, colors: nextColors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current || !animate) return;

    pointsRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.22) * 0.1;
    pointsRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.2;
    pointsRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.06;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.32}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.014}
          vertexColors
          transparent
          opacity={0.38}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </Float>
  );
}

function HairStrands({ animate }) {
  const groupRef = useRef(null);
  const strands = useMemo(
    () => [
      [
        [-2.4, -0.15, -0.6],
        [-1.35, 0.68, -0.2],
        [0, 0.18, 0.1],
        [1.28, 0.72, -0.15],
        [2.35, -0.1, -0.55],
      ],
      [
        [-2.15, -0.65, -0.15],
        [-1.1, -0.05, 0.18],
        [0, -0.5, 0.3],
        [1.12, -0.03, 0.12],
        [2.15, -0.62, -0.1],
      ],
      [
        [-1.75, 0.38, 0.38],
        [-0.7, 1.02, 0.18],
        [0.15, 0.86, -0.08],
        [0.9, 0.92, 0.12],
        [1.8, 0.34, 0.36],
      ],
      [
        [-1.65, -1.02, 0.22],
        [-0.65, -0.72, 0.04],
        [0.05, -0.96, -0.15],
        [0.72, -0.74, 0.05],
        [1.68, -1.0, 0.2],
      ],
    ],
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current || !animate) return;

    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.2) * 0.04;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.27) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {strands.map((points, index) => (
        <Line
          key={points[0].join('-')}
          points={points}
          color={index % 2 === 0 ? '#7C6658' : '#C98763'}
          lineWidth={index % 2 === 0 ? 0.8 : 0.55}
          transparent
          opacity={index % 2 === 0 ? 0.28 : 0.34}
        />
      ))}
    </group>
  );
}

function ButterflyWing({ mirror = false, wingColor = '#43513A', accentColor = '#C59A62' }) {
  const { forewing, hindwing } = useMemo(() => {
    const nextForewing = new Shape();
    nextForewing.moveTo(0.02, 0.08);
    nextForewing.bezierCurveTo(0.18, 0.48, 0.56, 0.62, 0.86, 0.35);
    nextForewing.bezierCurveTo(1.05, 0.16, 0.82, -0.12, 0.5, -0.16);
    nextForewing.bezierCurveTo(0.26, -0.19, 0.08, -0.07, 0.02, 0.08);

    const nextHindwing = new Shape();
    nextHindwing.moveTo(0.02, -0.08);
    nextHindwing.bezierCurveTo(0.16, -0.42, 0.48, -0.58, 0.7, -0.36);
    nextHindwing.bezierCurveTo(0.86, -0.18, 0.68, 0.08, 0.38, 0.02);
    nextHindwing.bezierCurveTo(0.18, -0.02, 0.06, -0.02, 0.02, -0.08);

    return { forewing: nextForewing, hindwing: nextHindwing };
  }, []);

  const veins = [
    [
      [0.03, 0.06, 0.012],
      [0.34, 0.25, 0.012],
      [0.75, 0.3, 0.012],
    ],
    [
      [0.05, 0.04, 0.012],
      [0.32, 0.08, 0.012],
      [0.68, 0.02, 0.012],
    ],
    [
      [0.04, -0.08, 0.012],
      [0.28, -0.22, 0.012],
      [0.58, -0.28, 0.012],
    ],
  ];
  const spots = [
    [0.55, 0.22, 0.055],
    [0.72, 0.08, 0.042],
    [0.44, -0.28, 0.045],
  ];

  return (
    <group scale={mirror ? [-1, 1, 1] : [1, 1, 1]}>
      <mesh>
        <shapeGeometry args={[forewing]} />
        <meshBasicMaterial color={wingColor} transparent opacity={0.62} depthWrite={false} side={DoubleSide} />
      </mesh>
      <mesh>
        <shapeGeometry args={[hindwing]} />
        <meshBasicMaterial color={wingColor} transparent opacity={0.54} depthWrite={false} side={DoubleSide} />
      </mesh>
      {veins.map((points) => (
        <Line key={points.flat().join('-')} points={points} color="#241913" lineWidth={0.32} transparent opacity={0.32} />
      ))}
      {spots.map(([x, y, radius]) => (
        <mesh key={`${x}-${y}`} position={[x, y, 0.018]}>
          <circleGeometry args={[radius, 18]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.46} depthWrite={false} side={DoubleSide} />
        </mesh>
      ))}
      <Line
        points={[
          [0.05, 0.08, 0.016],
          [0.28, 0.42, 0.016],
          [0.68, 0.4, 0.016],
          [0.9, 0.18, 0.016],
        ]}
        color="#E8D3B6"
        lineWidth={0.22}
        transparent
        opacity={0.38}
      />
    </group>
  );
}

function FlyingButterfly({ position, scale = 1, color = '#43513A', accent = '#C59A62', delay = 0, animate }) {
  const groupRef = useRef(null);
  const leftWingRef = useRef(null);
  const rightWingRef = useRef(null);

  useFrame(({ clock }) => {
    if (!animate) return;

    const time = clock.elapsedTime + delay;
    const flap = Math.sin(time * 2.2) * 0.24;

    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(time * 0.34) * 0.18;
      groupRef.current.position.y = position[1] + Math.sin(time * 0.52) * 0.14;
      groupRef.current.position.z = position[2] + Math.cos(time * 0.28) * 0.2;
      groupRef.current.rotation.z = Math.sin(time * 0.38) * 0.18;
      groupRef.current.rotation.y = Math.sin(time * 0.22) * 0.3;
    }

    if (leftWingRef.current && rightWingRef.current) {
      leftWingRef.current.rotation.y = 0.38 + flap;
      rightWingRef.current.rotation.y = -0.38 - flap;
    }
  });

  return (
    <Float speed={0.75} rotationIntensity={0.12} floatIntensity={0.24}>
      <group ref={groupRef} position={position} scale={scale}>
        <group ref={leftWingRef} position={[-0.03, 0.03, 0]} rotation={[0, 0.38, -0.18]} scale={[0.76, 0.76, 1]}>
          <ButterflyWing mirror wingColor={color} accentColor={accent} />
        </group>
        <group ref={rightWingRef} position={[0.03, 0.03, 0]} rotation={[0, -0.38, 0.18]} scale={[0.76, 0.76, 1]}>
          <ButterflyWing wingColor={color} accentColor={accent} />
        </group>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.026, 0.018, 0.48, 12]} />
          <meshBasicMaterial color="#241913" transparent opacity={0.74} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.26, 0]}>
          <sphereGeometry args={[0.045, 14, 14]} />
          <meshBasicMaterial color="#241913" transparent opacity={0.78} depthWrite={false} />
        </mesh>
        <Line points={[[-0.02, 0.27, 0], [-0.16, 0.45, 0.02], [-0.28, 0.48, 0.03]]} color="#241913" lineWidth={0.42} transparent opacity={0.5} />
        <Line points={[[0.02, 0.27, 0], [0.16, 0.45, 0.02], [0.28, 0.48, 0.03]]} color="#241913" lineWidth={0.42} transparent opacity={0.5} />
      </group>
    </Float>
  );
}

function PlantLeaves({ animate }) {
  const groupRef = useRef(null);
  const leaves = useMemo(
    () => [
      { position: [-2.15, -1.18, -0.25], rotation: [0.15, 0.2, -0.72], scale: [0.22, 0.58, 1] },
      { position: [-1.72, -0.98, -0.15], rotation: [0.18, 0.25, -0.32], scale: [0.18, 0.48, 1] },
      { position: [-2.38, -0.62, -0.4], rotation: [0.12, 0.12, -1.06], scale: [0.16, 0.42, 1] },
      { position: [2.12, -1.12, -0.2], rotation: [0.12, -0.2, 0.7], scale: [0.22, 0.58, 1] },
      { position: [1.7, -0.9, -0.1], rotation: [0.16, -0.25, 0.34], scale: [0.18, 0.48, 1] },
      { position: [2.38, -0.58, -0.38], rotation: [0.12, -0.12, 1.04], scale: [0.16, 0.42, 1] },
      { position: [-1.82, 1.18, -0.55], rotation: [0.1, 0.18, -0.24], scale: [0.14, 0.36, 1] },
      { position: [1.86, 1.16, -0.52], rotation: [0.1, -0.18, 0.24], scale: [0.14, 0.36, 1] },
    ],
    [],
  );

  useFrame(({ clock }) => {
    if (!groupRef.current || !animate) return;

    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.22) * 0.025;
  });

  return (
    <group ref={groupRef}>
      {leaves.map((leaf) => (
        <mesh key={leaf.position.join('-')} position={leaf.position} rotation={leaf.rotation} scale={leaf.scale}>
          <circleGeometry args={[0.42, 36]} />
          <meshBasicMaterial color="#43513A" transparent opacity={0.42} depthWrite={false} side={2} />
        </mesh>
      ))}
      <Line points={[[-2.28, -1.42, -0.3], [-1.54, -0.62, -0.16], [-1.74, 0.92, -0.5]]} color="#43513A" lineWidth={0.7} transparent opacity={0.38} />
      <Line points={[[2.28, -1.42, -0.3], [1.54, -0.62, -0.16], [1.74, 0.92, -0.5]]} color="#43513A" lineWidth={0.7} transparent opacity={0.38} />
    </group>
  );
}

function HeroScene({ isMobile, animate }) {
  const particleCount = isMobile ? 160 : 360;
  const butterflyScale = isMobile ? 0.72 : 1;
  const butterflies = isMobile
    ? [
        { position: [-1.25, 0.66, -0.35], scale: 0.82, color: '#43513A', accent: '#C59A62', delay: 0.2 },
        { position: [1.18, -0.2, -0.15], scale: 0.72, color: '#8F4A2F', accent: '#E8D3B6', delay: 1.1 },
        { position: [0.78, 0.98, -0.6], scale: 0.54, color: '#C59A62', accent: '#43513A', delay: 2 },
      ]
    : [
        { position: [-2.18, 0.86, -0.55], scale: 0.88, color: '#43513A', accent: '#C59A62', delay: 0.2 },
        { position: [2.08, 0.5, -0.3], scale: 0.82, color: '#8F4A2F', accent: '#E8D3B6', delay: 1.15 },
        { position: [-1.48, -0.78, 0.05], scale: 0.64, color: '#C59A62', accent: '#43513A', delay: 2.1 },
        { position: [1.5, -0.9, -0.2], scale: 0.72, color: '#43513A', accent: '#8F4A2F', delay: 3 },
        { position: [0.12, 1.22, -0.7], scale: 0.58, color: '#8F4A2F', accent: '#C59A62', delay: 3.8 },
      ];

  return (
    <>
      <PlantLeaves animate={animate} />
      <HairStrands animate={animate} />
      <MagicDust count={particleCount} animate={animate} />
      {butterflies.map((butterfly) => (
        <FlyingButterfly
          key={butterfly.position.join('-')}
          position={butterfly.position}
          scale={butterfly.scale * butterflyScale}
          color={butterfly.color}
          accent={butterfly.accent}
          delay={butterfly.delay}
          animate={animate}
        />
      ))}
    </>
  );
}

export default function Hero({ onGalleryClick }) {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const animateParticles = !shouldReduceMotion;

  return (
    <section id="hero" className="hero-section section-shell relative flex items-center justify-center overflow-hidden bg-ink px-5 pt-24">
      <div className="decor-butterfly -left-10 top-28 hidden md:block" />
      <div className="decor-flower -right-12 bottom-16" />

      <div className="absolute inset-0 opacity-80">
        <Canvas
          camera={{ position: [0, 0, isMobile ? 6.2 : 5.2], fov: isMobile ? 54 : 48 }}
          dpr={isMobile ? [1, 1.35] : [1, 1.8]}
        >
          <HeroScene isMobile={isMobile} animate={animateParticles} />
        </Canvas>
      </div>

      <div className="hero-vignette" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <h1 className="font-serif text-5xl font-semibold leading-none text-cream md:text-8xl lg:text-9xl">
          Sanamos tu cabello.
          <span className="mt-3 block accent-text">Elevamos tu imagen.</span>
        </h1>
        <div className="mx-auto mt-9 flex w-full max-w-sm flex-col items-stretch justify-center gap-4 sm:max-w-none sm:flex-row sm:items-center">
          <a
            href="#servicios"
            className="rounded-full bg-accent px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-white shadow-glow transition hover:-translate-y-0.5"
          >
            Reservar turno
          </a>
          <button
            type="button"
            onClick={onGalleryClick}
            className="rounded-full border border-cream/74 px-8 py-4 text-sm font-bold uppercase tracking-widest text-cream transition hover:border-cream hover:bg-cream hover:text-ink"
          >
            Ver galería
          </button>
        </div>
      </motion.div>

      <motion.a
        href="#servicios"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/52"
        aria-label="Ir a servicios"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="h-2 w-2 rounded-full bg-cream/40" />
        <span className="h-10 w-px bg-accent" />
      </motion.a>
    </section>
  );
}
