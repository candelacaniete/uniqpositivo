import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import { motion, useReducedMotion } from 'framer-motion';
import { AdditiveBlending } from 'three';
import UniqLogo from './UniqLogo.jsx';

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
      [1, 0.42, 0],
      [0.91, 0.12, 0.55],
      [0.48, 0.18, 0.75],
      [0.96, 0.94, 0.92],
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
          size={0.019}
          vertexColors
          transparent
          opacity={0.72}
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

function OrganicButterfly({ position, scale = 1, color = '#7C6658', animate }) {
  const groupRef = useRef(null);
  const leftWingRef = useRef(null);
  const rightWingRef = useRef(null);

  useFrame(({ clock }) => {
    if (!animate) return;

    const flap = Math.sin(clock.elapsedTime * 1.8 + position[0]) * 0.18;

    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.55 + position[2]) * 0.08;
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.35 + position[0]) * 0.12;
    }

    if (leftWingRef.current && rightWingRef.current) {
      leftWingRef.current.rotation.y = 0.38 + flap;
      rightWingRef.current.rotation.y = -0.38 - flap;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.16} floatIntensity={0.28}>
      <group ref={groupRef} position={position} scale={scale}>
        <mesh ref={leftWingRef} position={[-0.13, 0.04, 0]} rotation={[0, 0.38, -0.42]} scale={[0.75, 1.15, 1]}>
          <circleGeometry args={[0.28, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.28} depthWrite={false} side={2} />
        </mesh>
        <mesh ref={rightWingRef} position={[0.13, 0.04, 0]} rotation={[0, -0.38, 0.42]} scale={[0.75, 1.15, 1]}>
          <circleGeometry args={[0.28, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.28} depthWrite={false} side={2} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.36, 10]} />
          <meshBasicMaterial color="#7C6658" transparent opacity={0.42} depthWrite={false} />
        </mesh>
      </group>
    </Float>
  );
}

function HeroScene({ isMobile, animate }) {
  const particleCount = isMobile ? 420 : 900;
  const butterflyScale = isMobile ? 0.72 : 1;
  const butterflies = isMobile
    ? [
        { position: [-1.3, 0.62, -0.35], scale: 0.8, color: '#7C6658' },
        { position: [1.25, -0.18, -0.15], scale: 0.72, color: '#C98763' },
        { position: [0.82, 0.96, -0.6], scale: 0.52, color: '#D8B98C' },
      ]
    : [
        { position: [-2.15, 0.82, -0.55], scale: 0.88, color: '#7C6658' },
        { position: [2.05, 0.48, -0.3], scale: 0.82, color: '#C98763' },
        { position: [-1.45, -0.78, 0.05], scale: 0.64, color: '#9B4F35' },
        { position: [1.48, -0.92, -0.2], scale: 0.72, color: '#7C6658' },
        { position: [0.12, 1.22, -0.7], scale: 0.58, color: '#D8B98C' },
      ];

  return (
    <>
      <HairStrands animate={animate} />
      <MagicDust count={particleCount} animate={animate} />
      {butterflies.map((butterfly) => (
        <OrganicButterfly
          key={butterfly.position.join('-')}
          position={butterfly.position}
          scale={butterfly.scale * butterflyScale}
          color={butterfly.color}
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
        <UniqLogo className="brand-logo-hero mx-auto mb-8 w-full max-w-xs md:max-w-sm" />
        <h1 className="font-serif text-4xl font-bold leading-tight text-cream md:text-7xl lg:text-8xl">
          Sanamos tu cabello.
          <span className="mt-2 block accent-text">Elevamos tu imagen.</span>
        </h1>
        <div className="mx-auto mt-9 flex w-full max-w-sm flex-col items-stretch justify-center gap-4 sm:max-w-none sm:flex-row sm:items-center">
          <a
            href="#turnos"
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
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-widest text-cream/52"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll
        <span className="h-10 w-px bg-accent" />
      </motion.a>
    </section>
  );
}
