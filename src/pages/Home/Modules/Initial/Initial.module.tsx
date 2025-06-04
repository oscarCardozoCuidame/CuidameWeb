import React from "react";
import { useResponsiveStyles } from '../../../../utils/useResponsiveStyles';

import mobileStyles  from "./Initial.mobile.module.css";
import desktopStyles  from "./Initial.desktop.module.css";

const Initial: React.FC = () => {
  const styles = useResponsiveStyles(mobileStyles, desktopStyles);

  return (
    <section className={styles.initial}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.background__video}
      >
        <source src="/Home/initial-carrucel.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      <div className={styles.info__container}>
        <img src="/logo/Cuidame.svg" alt="logo" className={styles.logo} />

        <div className={styles.stores__container}>
          <img src="/SocialMedia/PlayStore.svg" alt="playstore" />
          <img src="/SocialMedia/AppleStore.svg" alt="applestore" />
          <h3>
            descarga nuestra app
            <br />
            <strong>ANDROID</strong> e <strong>iOS</strong>
          </h3>
        </div>

        <h2>Somos un servicio integral dedicado al cuidado</h2>

        {/* 
        <Boton className={styles.btn} color="orange" texto=" DESCARGA GRATIS " />
        */}
      </div>
    </section>
  );
};

export default Initial;
