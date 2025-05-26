import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './Doctor.layout.module.css';

// Importamos los componentes comunes
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';

// Importamos las páginas del mercado
import Doctor from '../../pages/Doctor/Doctor';

const DoctorLayout: React.FC = () => {
  return (
    <div className={styles.market_layout}>
      <Header className={styles.header} />
      
      <Routes>
        <Route path="/" element={<Doctor />} />
      </Routes>
      
      <Footer className={styles.footer} />
    </div>
  );
};

export default DoctorLayout;