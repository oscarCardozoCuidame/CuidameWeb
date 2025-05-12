import React from "react";
import "./TryPage.styles.css";
import Boton from "../../../../components/ui/Button";
import { openWhatsAppChat } from "../../../../utils/whatsapp.utils";

const TryPage: React.FC = () => {
  const handleContactClick = () => {
    // Llamar a la utilidad de WhatsApp con el mensaje deseado
    openWhatsAppChat(
      "Hola, me gustaría obtener más información sobre los servicios de Cuidame."
    );
  };

  return (
    <section className="trypage">
      <h1>"Cuidar a los tuyos es proteger tu propia esencia."</h1>

      <Boton
        className="btn"
        color="orange"
        texto="Quiero probar la plataforma"
        onClick={handleContactClick}
      />
    </section>
  );
};

export default TryPage;
