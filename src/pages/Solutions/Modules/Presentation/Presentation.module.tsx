import React from "react";
import { useResponsiveStyles } from "../../../../utils/useResponsiveStyles";

import mobileStyles from "./Presentation.mobile.module.css";
import desktopStyles from "./Presentation.desktop.module.css";

interface HeroProps {
  imageSrc: string;
}

const Presentation: React.FC<HeroProps> = ({ imageSrc }) => {
  const styles = useResponsiveStyles(mobileStyles, desktopStyles);

  return (
    <section className={styles.presentation}>
      <img
        className={styles.img_presentation}
        src={imageSrc}
        alt="Presentación Imagen"
      />
    </section>
  );
};

export default Presentation;
