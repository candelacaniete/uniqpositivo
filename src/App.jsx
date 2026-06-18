import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Servicios from './components/Servicios.jsx';
import Resenas from './components/Resenas.jsx';
import Galeria from './components/Galeria.jsx';
import Productos from './components/Productos.jsx';
import Footer from './components/Footer.jsx';
import GaleriaExperiencia from './components/GaleriaExperiencia.jsx';

export default function App() {
  const isGalleryPage = window.location.pathname === '/galeria';

  const handleHeroGalleryClick = () => {
    document.getElementById('galeria-puente')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isGalleryPage) {
    return <GaleriaExperiencia />;
  }

  return (
    <div className="min-h-screen bg-ink text-cream">
      <Navbar />
      <main>
        <Hero onGalleryClick={handleHeroGalleryClick} />
        <Servicios />
        <Resenas />
        <Galeria />
        <Productos />
      </main>
      <Footer />
    </div>
  );
}
