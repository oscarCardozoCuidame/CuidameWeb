import "./StartWithUs.css";
import Hero from "./Modules/Hero/Hero.module";
import TryPage from "./Modules/TryPage/TryPage.module";
import Questions from "./Modules/Questions/Questions.module";

  const heroData = {
    title:
      "¿Eres profesional de la salud?",
    description: 
    `
      Tu experiencia puede marcar la diferencia.

      Únete a nuestra red y potencia tu impacto a través de una plataforma diseñada para conectar personas con soluciones médicas innovadoras.
      Desde atención inmediata hasta seguimiento con inteligencia artificial, te ofrecemos herramientas para brindar un servicio más ágil, accesible y seguro.

      Beneficios para profesionales: 

      - Accede a pacientes que buscan atención confiable y personalizada.
      - Usa IA para optimizar diagnósticos, agendas y recomendaciones.
      - Ofrece tus servicios en tiempo real, estés donde estés.
      - Mejora la experiencia de tus pacientes con monitoreo y recordatorios inteligentes.

      Forma parte de la evolución en salud digital.
      Haz que tu conocimiento llegue más lejos, con el respaldo de nuestra tecnología.
    `,
    imageSrc:"/StartWithUs/Initial.webp"
  };
  const tryPageData = {
    title: "Únete a nuestra red de profesionales médicos y veterinarios: envía tus datos y te contactaremos para trabajar juntos por el bienestar de más vidas.",
    buttonText: "Empieza a cuidarte ahora",
  };
  const questionsData = {
    title: "¿Tienes preguntas?",
    subtitle: "Tenemos un equipo listo para atender tus dudas",
    buttonText: "Hablemos",
    imageSrc: "/Solutions/Health/question-img.webp",
  };

const StartWithUs: React.FC = () => {
  return (
    <main className="solutions__health">
      <Hero {...heroData} />
      <TryPage {...tryPageData} />
      <Questions {...questionsData} />
    </main>
  );
};

export default StartWithUs;