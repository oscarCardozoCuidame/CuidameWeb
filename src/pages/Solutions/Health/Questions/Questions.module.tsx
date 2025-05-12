import styles from './Questions.module.css';
import Boton from "../../../../components/ui/Button";
import { openWhatsAppChat } from "../../../../utils/whatsapp.utils";

interface QuestionsProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageSrc: string;
}

const Questions: React.FC<QuestionsProps> = ({
  title,
  subtitle,
  buttonText,
  imageSrc
}) => {

  const handleContactClick = () => {
  // Llamar a la utilidad de WhatsApp con el mensaje deseado
  openWhatsAppChat(
    "Hola, me gustaría obtener más información sobre los servicios de Cuidame."
  );
};

  return (
    <section className={styles.questions}>
      <div className={styles.questions_container}>
        <div className={styles.info_container}>
          <h1>{title}</h1>
          <h3>{subtitle}</h3>
          <Boton className={styles.btn} color="blue" texto={buttonText}  onClick={handleContactClick}/>
        </div>
        <img
          src={imageSrc}
          alt="description"
          className={styles.img_questions}
        />
      </div>
    </section>
  );
};

export default Questions;