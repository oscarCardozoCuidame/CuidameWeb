import "./Doctor.css";
import Hero from "../Solutions/Modules/Hero/Hero.module";
import Features from "../Solutions/Modules/Features/Features.module";
import Questions from "../Solutions/Modules/Questions/Questions.module";

  const heroData = {
    title: "Gestiona con eficiencia, cuida con el corazón.",
    description: "Conecta, organiza y cuida desde un solo lugar. Cuídame doc te da el control total de tus citas, pacientes e insumos. Registra historias médicas, resultados de laboratorio, vacunas y tratamientos con facilidad. Agenda procedimientos, ofrece teleconsultas y deja que tus pacientes reserven de forma 100% digital. Recibe notificaciones inteligentes y optimiza tu tiempo mientras te enfocas en lo más importante: cuidar vidas.",
    buttonText: "Empieza a cuidarte ahora",
    imageSrc: "/Doctor/initial-img.webp",
  };
  const featuresData = {
    preventiveHealth: {
      title: "Centralizas tu gestión en un solo lugar.",
      description: "Accedes fácilmente a historias médicas, resultados, insumos y agenda, sin depender de múltiples herramientas o papeleo.",
    },
    monitoring: {
      title: "Optimiza tu tiempo y tu atención.",
      description: "Automatizas citas, recordatorios y notificaciones, mientras te enfocas en lo más importante: tus pacientes.",
    },
    curativeHealth: {
      title: "Fortaleces tu práctica profesional.",
      description: "Ofreces una experiencia moderna, con reservas 100% digitales y teleconsulta, lo que mejora la fidelización y confianza de tus usuarios.",
    },
    tryPlatformText: "Quiero probar la plataforma",
  };
  const questionsData = {
    title: "¿Tienes preguntas?",
    subtitle: "Tenemos un equipo listo para atender tus dudas",
    buttonText: "Hablemos",
    imageSrc: "/Solutions/Health/question-img.webp",
  };

const Doctor: React.FC = () => {

  return (
    <main className="doctor">
      <Hero {...heroData} />
      <Features {...featuresData} />
      <Questions {...questionsData} />
    </main>
  );
};

export default Doctor;