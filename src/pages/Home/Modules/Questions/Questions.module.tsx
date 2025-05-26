import React from "react";
import { useResponsiveStyles } from '../../../../utils/useResponsiveStyles';
import { openWhatsAppChat } from "../../../../utils/whatsapp.utils";

import mobileStyles from "./Questions.mobile.module.css";
import desktopStyles from "./Questions.desktop.module.css";
import Boton from "../../../../components/ui/Button";

const Questions: React.FC = () => {
  const styles = useResponsiveStyles(mobileStyles, desktopStyles);

  const handleContactClick = () => {
    openWhatsAppChat(
      "Hola, me gustaría obtener más información sobre los servicios de Cuidame."
    );
  };

  return (
    <section className={styles.questions}>
      <div className={styles.questions__container}>
        <div className={styles.info__container}>
          <h1>¿Tienes preguntas?</h1>
          <h3>Tenemos un equipo listo para atender tus dudas</h3>
          <Boton className={styles.btn} color="blue" texto="Hablemos" onClick={handleContactClick}/>
        </div>
        <img
          src="/Home/about-us.webp"
          alt="description"
          className={styles.img__questions}
        />
      </div>
    </section>
  );
};

export default Questions;
