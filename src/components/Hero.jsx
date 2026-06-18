import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, useReducedMotion } from 'framer-motion';

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

function ButterflyParticles({ count, animate }) {
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
      const wing = index % 2 === 0 ? -1 : 1;
      const t = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.42);
      const wingShape = Math.sin(t) * Math.sin(t) + 0.22;
      const x = wing * (0.22 + Math.cos(t) * r * 1.45 * wingShape);
      const y = Math.sin(t) * r * 1.08 - Math.abs(x) * 0.1;
      const z = (Math.random() - 0.5) * 0.36;

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

    pointsRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.28) * 0.08;
    pointsRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.16;
    pointsRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.06;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.32}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.018} vertexColors transparent opacity={0.74} depthWrite={false} />
      </points>
    </Float>
  );
}

export default function Hero({ onGalleryClick }) {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const particleCount = isMobile ? 520 : 1250;
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
          <ButterflyParticles count={particleCount} animate={animateParticles} />
        </Canvas>
      </div>

      <div className="hero-vignette" />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <h1 className="font-serif text-5xl font-bold leading-tight text-cream md:text-7xl lg:text-8xl">
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
