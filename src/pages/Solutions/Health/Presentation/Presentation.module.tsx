import React from 'react';
import styles from './Presentation.module.css';

interface HeroProps {
  imageSrc: string;
}


const Presentation: React.FC<HeroProps> = ({ 
  imageSrc 
}) => {

  return (
<section className={styles.presentation}>

    <img className={styles.img_presentation} src={imageSrc} alt="Presentación Imagen" />

</section>
  );
};

export default Presentation;