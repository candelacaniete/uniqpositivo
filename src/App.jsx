import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Servicios from './components/Servicios.jsx';
import Turnos from './components/Turnos.jsx';
import Resenas from './components/Resenas.jsx';
import Galeria from './components/Galeria.jsx';
import Productos from './components/Productos.jsx';
import Footer from './components/Footer.jsx';

function TransitionParticles() {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const total = 520;
    const data = new Float32Array(total * 3);

    for (let index = 0; index < total; index += 1) {
      const angle = (index / total) * Math.PI * 10;
      const radius = 0.35 + (index % 41) / 41;
      data[index * 3] = Math.cos(angle) * radius;
      data[index * 3 + 1] = Math.sin(angle) * radius * 0.58;
      data[index * 3 + 2] = (Math.random() - 0.5) * 0.9;
    }

    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.z = clock.elapsedTime * 0.26;
    pointsRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.42) * 0.22;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#F5F0EB" size={0.024} transparent opacity={0.72} depthWrite={false} />
    </points>
  );
}

function GalleryTransitionOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className="absolute inset-0 opacity-75">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 52 }}>
          <TransitionParticles />
        </Canvas>
      </div>
      <motion.p
        className="relative z-10 px-6 text-center font-serif text-3xl text-cream md:text-5xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
      >
        El arte toma forma
      </motion.p>
    </motion.div>
  );
}

export default function App() {
  const galleryRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnterGallery = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    window.setTimeout(() => {
      galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 650);

    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 1850);
  };

  const handleHeroGalleryClick = () => {
    document.getElementById('galeria-puente')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-ink text-cream">
      <Navbar />
      <main>
        <Hero onGalleryClick={handleHeroGalleryClick} />
        <Servicios />
        <Turnos />
        <Resenas />
        <Galeria galleryRef={galleryRef} onEnterGallery={handleEnterGallery} />
        <Productos />
      </main>
      <Footer />
      <AnimatePresence>{isTransitioning ? <GalleryTransitionOverlay /> : null}</AnimatePresence>
    </div>
  );
}
