import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Servicios from './components/Servicios.jsx';
import Resenas from './components/Resenas.jsx';
import Galeria from './components/Galeria.jsx';
import Productos from './components/Productos.jsx';
import Footer from './components/Footer.jsx';
import GaleriaExperiencia from './components/GaleriaExperiencia.jsx';
import AdminTurnos from './components/AdminTurnos.jsx';
import ShopPreview from './components/ShopPreview.jsx';

export default function App() {
  const normalizedPath = window.location.pathname.replace(/\/$/, '') || '/';
  const isGalleryPage = normalizedPath === '/galeria';
  const isAdminPage = normalizedPath === '/admin-turnos';
  const isShopPage = normalizedPath === '/shop';

  const handleHeroGalleryClick = () => {
    document.getElementById('galeria-puente')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isGalleryPage) {
    return <GaleriaExperiencia />;
  }

  if (isAdminPage) {
    return <AdminTurnos />;
  }

  if (isShopPage) {
    return <ShopPreview />;
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
