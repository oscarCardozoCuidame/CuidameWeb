import { useResponsiveStyles } from '../../../../utils/useResponsiveStyles';

import mobileStyles from "./Hero.mobile.module.css";
import desktopStyles from "./Hero.desktop.module.css";

interface HeroProps {
  title: string;
  description: string;
  imageSrc: string;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  description,  
  imageSrc 
}) => {
  const styles = useResponsiveStyles(mobileStyles, desktopStyles);

  return (
    <section className={styles.solutions_card}>
      <div className={styles.card_container}>
        <div className={styles.left_side}>
          <div className={styles.text_title}>
            <p className={styles.solutions_title}>{title}</p>
          </div>
          <div className={styles.text_description}>
            <p>{description}</p>
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

export default Hero;