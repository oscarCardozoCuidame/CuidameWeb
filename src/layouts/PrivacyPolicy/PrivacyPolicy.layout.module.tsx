import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './PrivacyPolicy.layout.module.css';

// Importamos los componentes comunes
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';

// Importamos las páginas del mercado
import PrivacyPolicyComponent from '../../pages/PrivacyPolicy/Policy';

const PrivacyPolicyLayout
: React.FC = () => {
  return (
    <div className={styles.market_layout}>
      <Header className={styles.header} />
      
      <Routes>
        <Route path="/health" element={<PrivacyPolicyComponent policy="health" />}/>
        <Route path="/pets" element={<PrivacyPolicyComponent policy="pets" />} />
      </Routes>
      
      <Footer className={styles.footer} />
    </div>
  );
};

export default PrivacyPolicyLayout;