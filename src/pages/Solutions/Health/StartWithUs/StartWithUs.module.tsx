import styles from './StartWithUs.module.css';

interface StartWithUsProps {
  description: string;
  buttonText: string;
  imageSrc: string;
}

const StartWithUs: React.FC<StartWithUsProps> = ({
  description,
  buttonText,
  imageSrc
}) => {
  return (
    <section className={`${styles.solutions_card} ${styles.start_with_us}`}>
      <div className={styles.card_container}>
        <div className={styles.left_side}>
          <div className={styles.text_description}>
            <p>{description}</p>
            <br />
            <button className={styles.accept_btn}>{buttonText}</button>
          </div>
        </div>

        <div className={styles.right_side}>
          <img
            src={imageSrc}
            alt="about solutions"
            className={styles.initial_img}
          />
        </div>
      </div>
    </section>
  );
};

export default StartWithUs;