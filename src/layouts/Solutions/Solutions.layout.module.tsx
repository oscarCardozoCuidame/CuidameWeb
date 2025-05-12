import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './Solutions.layout.module.css';

// Importamos los componentes comunes
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';

// Importamos las páginas del mercado
import SolutionsHealth from '../../pages/Solutions/Health/Solutions.health';

const SolutionsLayout: React.FC = () => {
  return (
    <div className={styles.market_layout}>
      <Header className={styles.header} />
      
      <Routes>
        <Route path="/health" element={<SolutionsHealth solution="health" />} />
        <Route path="/pets" element={<SolutionsHealth solution="pets" />} />
      </Routes>
      
      <Footer className={styles.footer} />
    </div>
  );
};

export default SolutionsLayout;