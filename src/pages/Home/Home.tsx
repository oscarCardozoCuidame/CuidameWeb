import React from 'react';
import './Home.styles.css';
import { AnimatedSection } from '../../utils/animation.utils';

// Importación de los módulos
import Initial from './Modules/Initial/Initial.module';
import AboutUs from './Modules/About-us/AboutUs.module';
import Solutions from './Modules/Solutions/Solutions.module';
import Products from './Modules/Products/Products.module';
import Reviews from './Modules/Reviews/Reviews.module';
import TryPage from './Modules/TryPage/TryPage.module';
import Questions from './Modules/Questions/Questions.module';

const Home: React.FC = () => {
  return (
    <main className="home">
      <Initial />
      
      <AnimatedSection animation="fadeIn">
        <AboutUs />
      </AnimatedSection>
      
      <AnimatedSection animation="slideInLeft">
        <Solutions />
      </AnimatedSection>
      
      <AnimatedSection animation="slideInRight">
        <Products />
      </AnimatedSection>
      
      <AnimatedSection animation="zoomIn">
        <Reviews />
      </AnimatedSection>
      
      <AnimatedSection animation="fadeIn" delay={0.2}>
        <TryPage />
      </AnimatedSection>
      
      <AnimatedSection animation="slideInLeft" threshold={0.3}>
        <Questions />
      </AnimatedSection>
    </main>
  );
};

export default Home;