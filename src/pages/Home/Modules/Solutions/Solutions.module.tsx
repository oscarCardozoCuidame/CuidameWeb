import React from 'react';
import { NavLink } from "react-router-dom";
import { useResponsiveStyles } from '../../../../utils/useResponsiveStyles';

import mobileStyles from './Solutions.mobile.module.css';
import desktopStyles from './Solutions.desktop.module.css';
import Boton from '../../../../components/ui/Button';

const Solutions: React.FC = () => {
      const styles = useResponsiveStyles(mobileStyles, desktopStyles);

  return (
    <section className={styles.solutions}>
      <h1>SOLUCIONES</h1>

      <div className={styles.solutions__container}>
        <div className={`${styles.solutions__initial__card} ${styles.health}`}>
            <div className={styles.img__background}>
                <img src="/Home/solutions-bg-1.webp" alt="background" />
            </div>

            <div className={styles.info__container}>
                <h2>CUIDAME HEALTH</h2>

                <p>
                    No solo te ofrecemos una aplicación, sino un ecosistema integral 
                    de soluciones diseñadas para brindarte una visión completa de tu bienestar. 
                    Con un enfoque 360°, ponemos a tu disposición herramientas 
                    que garantizan tu seguridad
                </p>

                <NavLink to="/solutions/health">
                    <Boton className={styles.btn} color="orange" texto=" Más información " />
                </NavLink>
            </div>
        </div>

        <div className={`${styles.solutions__initial__card} ${styles.pets}`}>
            <div className={styles.img__background}>
                <img src="/Home/solutions-bg-2.webp" alt="background" />
            </div>

            <div className={styles.info__container}>
                <h2>CUIDAME PETS</h2>

                <p>
                    Las mascotas son más que compañeros, son parte de la familia. 
                    Entendemos la importancia de su bienestar tanto como tú, 
                    por eso hemos creado un servicio único e innovador que 
                    garantiza su seguridad y cuidado en todo momento. 
                    Descubre cómo podemos ayudarte a proteger a tu mejor amigo
                </p>

                <NavLink to="/solutions/pets">
                    <Boton className={styles.btn} color="orange" texto=" Más información " />
                </NavLink>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;