import React from "react";
import "./Questions.styles.css";
import Boton from "../../../../components/ui/Button";
import { openWhatsAppChat } from "../../../../utils/whatsapp.utils";

const Questions: React.FC = () => {
  const handleContactClick = () => {
    openWhatsAppChat(
      "Hola, me gustaría obtener más información sobre los servicios de Cuidame."
    );
  };

  return (
    <section className="questions">
      <div className="questions__container">
        <div className="info__container">
          <h1>¿Tienes preguntas?</h1>
          <h3>Tenemos un equipo listo para atender tus dudas</h3>
          <Boton className="btn" color="blue" texto="Hablemos" onClick={handleContactClick}/>
        </div>
        <img
          src="/Home/about-us.webp"
          alt="description"
          className="img__questions"
        />
      </div>
    </section>
  );
};

export default Questions;
