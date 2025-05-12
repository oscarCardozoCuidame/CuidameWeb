import "./Solutions.health.css";
import Hero from "./Hero/Hero.module";
import Features from "./Features/Features.module";
import StartWithUs from "./StartWithUs/StartWithUs.module";
import Presentation from "./Presentation/Presentation.module";
import Questions from "./Questions/Questions.module";

// Health solution data
const health: Record<string, any> = {
  heroData: {
    title: "Tu salud es lo más valioso, y esta plataforma está diseñada para cuidarte cuando más lo necesitas.",
    description: "Te acompaña en cada paso, permitiéndote gestionar tu información médica, recibir ayuda en emergencias, y conectar con profesionales que velan por ti. Porque sentirte seguro, apoyado y en control también es parte de sanar.",
    buttonText: "Empieza a cuidarte ahora",
    imageSrc: "/Solutions/Health/initial-img.webp",
  },
  featuresData: {
    preventiveHealth: {
      title: "Salud Preventiva",
      description: "Con el apoyo de inteligencia artificial, puedes organizar tus citas, controlar tus medicamentos, recibir recordatorios y obtener recomendaciones basadas en tus riesgos personales. Es como tener un asistente de salud que te conoce y te cuida.",
    },
    monitoring: {
      title: "Monitoreo y seguimiento en Salud",
      description: "Te acompañamos día a día con recordatorios, control de tus medicamentos, y seguimiento de tus signos vitales en tiempo real. Para que no tengas que recordarlo todo, estamos aquí para ayudarte a vivir con tranquilidad, sabiendo que alguien más también cuida de ti.",
    },
    curativeHealth: {
      title: "Salud Resolutiva o curativa",
      description: "Te permite llevar contigo tu información vital y médica a través de un código QR, accesible incluso si no puedes comunicarte. En situaciones críticas, cada segundo cuenta, y esta herramienta puede marcar la diferencia.",
    },
    tryPlatformText: "Quiero probar la plataforma",
  },
  startWithUsData: {
    description: "Te acompaña en cada paso, permitiéndote gestionar tu información médica, recibir ayuda en emergencias, y conectar con profesionales que velan por ti. Porque sentirte seguro, apoyado y en control también es parte de sanar.",
    buttonText: "Empieza a cuidarte ahora",
    imageSrc: "/Solutions/Health/start-with-us-img.webp",
  },
  presentationData: {
    imageSrc: "/Solutions/Health/presentation.svg",
  },
  questionsData: {
    title: "¿Tienes preguntas?",
    subtitle: "Tenemos un equipo listo para atender tus dudas",
    buttonText: "Hablemos",
    imageSrc: "/Solutions/Health/question-img.webp",
  },
};

// Pets solution data
const pets: Record<string, any> = {
  heroData: {
    title: "Cuidar a tu mascota es proteger lo que más amas.",
    description: "Sabemos que tu mascota no es solo un animal, es familia. Por eso creamos Cuídame Pets: una forma de estar siempre presente, incluso cuando no estás cerca. Te ayudamos a que esté identificada, segura, con su salud al día y conectada con quienes pueden cuidarla. Porque amarla también es anticiparte, acompañarla y asegurarte de que nunca esté sola.",
    buttonText: "Dale un plus al cuidado de tu mascota",
    imageSrc: "/Solutions/Pets/initial-img.webp",
  },
  featuresData: {
    preventiveHealth: {
      title: "Identificación inmediata",
      description: "Con Cuídame Pets, tu mascota lleva una identificación digital que cualquier persona puede escanear para contactarte al instante si se pierde. Esto reduce el riesgo de que termine en la calle o en un refugio.",
    },
    monitoring: {
      title: "Salud siempre al día y accesible",
      description: "Mantén el historial veterinario, vacunas y citas importantes en un solo lugar. Así, si ocurre una emergencia o alguien más debe cuidarla, toda la información estará a la mano.",
    },
    curativeHealth: {
      title: "Red de apoyo",
      description: "Puedes compartir el perfil de tu mascota con familiares, vecinos o cuidadores. Todos sabrán cómo actuar ante cualquier situación. ¡Tu mascota siempre estará acompañada y protegida!",
    },
    tryPlatformText: "Quiero probar la plataforma",
  },
  presentationData: {
    imageSrc: "/Solutions/Pets/presentation.svg",
  },
  questionsData: {
    title: "¿Tienes preguntas?",
    subtitle: "Tenemos un equipo listo para atender tus dudas",
    buttonText: "Hablemos",
    imageSrc: "/Solutions/Health/question-img.webp",
  },
};

// Updated component to accept solution type
interface SolutionsHealthProps {
  solution: 'health' | 'pets';
}

const SolutionsHealth: React.FC<SolutionsHealthProps> = ({ solution }) => {
  // Select the appropriate data based on the solution prop
  const selectedSolution = solution === 'health' ? health : pets;
  const paddingBottom = solution === 'pets' ? '20vh' : undefined;

  return (
    <main className="solutions__health">
      <Hero {...selectedSolution.heroData} />
      <Features padding_bottom={paddingBottom} {...selectedSolution.featuresData} />
      
      {solution === 'health' && health.startWithUsData && (
        <StartWithUs {...health.startWithUsData} />
      )}
      
      <Presentation {...selectedSolution.presentationData} />
      <Questions {...selectedSolution.questionsData} />
    </main>
  );
};

export default SolutionsHealth;
export { health, pets };