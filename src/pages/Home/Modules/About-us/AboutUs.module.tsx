import React from "react";
import { useResponsiveStyles } from '../../../../utils/useResponsiveStyles';

import mobileStyles from "./AboutUs.mobile.module.css";
import desktopStyles from "./AboutUs.desktop.module.css";

const AboutUs: React.FC = () => {
  const styles = useResponsiveStyles(mobileStyles, desktopStyles);

  return (
    <section className={styles.about__us}>
      <div className={styles.description__container}>
        <p className={styles.description}>
          En CUIDAME.TECH, te brindamos soluciones de cuidado y bienestar a
          través de tecnología accesible y eficiente.
          <br />
          <br />
          Contamos con una variedad de opciones que te permiten a ti y a tu
          familia sentirse más seguros en el día a día.
          <br />
          <br />
          Nos comprometemos a hacer que el cuidado de tu salud sea más práctico,
          confiable y accesible.
        </p>
        <img
          src="/Home/about-us.webp"
          alt="description"
          className={styles.img__description}
        />
      </div>

      <div className={styles.goals__container}>
        <div className={styles.goals__card}>
          <img src="/Home/downloads.svg" alt="goal__logo" />

          <h2>+ de 500 descargas en las tiendas de aplicaciones</h2>
        </div>

        <div className={styles.goals__card}>
          <img src="/Home/followers.svg" alt="goal__logo" />

          <h2>+ de 800 seguidores en redes sociales </h2>
        </div>

        <div className={styles.goals__card}>
          <img src="/Home/users.svg" alt="goal__logo" />

          <h2>+ de 200 usuarios activos </h2>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
