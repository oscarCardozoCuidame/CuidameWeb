import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './Market.layout.module.css';

// Importamos los componentes comunes
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';

// Importamos las páginas del mercado
import MarketHome from '../../pages/Market/MarketHome/Market.home';
import MarketHealth from '../../pages/Market/Health/Market.health';
import MarketPets from '../../pages/Market/Pets/Market.pets';

const MarketLayout: React.FC = () => {
  return (
    <div className={styles.market_layout} >
      <Header className={styles.header} />
      
      <Routes>
        {/* Ruta principal del mercado */}
        <Route path="/" element={<MarketHome />} />
        
        {/* Rutas para secciones específicas */}
        <Route path="/health" element={<MarketHealth />} />
        <Route path="/pets" element={<MarketPets />} />
      </Routes>
      
      <Footer className={styles.footer} />
    </div>
  );
};

export default MarketLayout;