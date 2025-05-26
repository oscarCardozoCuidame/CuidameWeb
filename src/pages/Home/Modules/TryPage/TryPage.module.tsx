import React from "react";
import { useResponsiveStyles } from '../../../../utils/useResponsiveStyles';
import { openWhatsAppChat } from "../../../../utils/whatsapp.utils";

import mobileStyles from "./TryPage.mobile.module.css";
import desktopStyles from "./TryPage.desktop.module.css";
import Boton from "../../../../components/ui/Button";

const TryPage: React.FC = () => {
  const styles = useResponsiveStyles(mobileStyles, desktopStyles);

  const handleContactClick = () => {
    // Llamar a la utilidad de WhatsApp con el mensaje deseado
    openWhatsAppChat(
      "Hola, me gustaría obtener más información sobre los servicios de Cuidame."
    );
  };

  return (
    <section className={styles.trypage}>
      <h1>"Cuidar a los tuyos es proteger tu propia esencia."</h1>

      <Boton
        className={styles.btn}
        color="orange"
        texto="Quiero probar la plataforma"
        onClick={handleContactClick}
      />
    </section>
  );
};

export default TryPage;
