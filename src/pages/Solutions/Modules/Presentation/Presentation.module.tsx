import React, { useEffect, useState } from "react";
import { useResponsiveStyles } from "../../../../utils/useResponsiveStyles";

import mobileStyles from "./Presentation.mobile.module.css";
import desktopStyles from "./Presentation.desktop.module.css";

interface HeroProps {
  imageSrcDesktop: string;
  imageSrcMobile: string;
}

const Presentation: React.FC<HeroProps> = ({ imageSrcDesktop, imageSrcMobile }) => {
  const styles = useResponsiveStyles(mobileStyles, desktopStyles);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Ejecutar una vez al montar
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.presentation}>
      <img
        className={styles.img_presentation}
        src={isMobile ? imageSrcMobile : imageSrcDesktop}
        alt="Presentación Imagen"
      />
    </section>
  );
};

export default Presentation;
