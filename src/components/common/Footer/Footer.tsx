import React from "react";
import { useResponsiveStyles } from '../../../utils/useResponsiveStyles';

import desktopStyles from "./Footer.desktop.module.css";
import mobileStyles from "./Footer.mobile.module.css";

interface HeaderProps {
  className?: string;
}

const Footer: React.FC<HeaderProps> = ({ className }) => {
  const styles = useResponsiveStyles(mobileStyles, desktopStyles);

  return (
    <footer className={`${styles.footer} ${className || ""}`}>
      <div className={styles.footer__content}>
        <div className={styles.footer__logo}>
          <img src="/logo/CuidameWhite.svg" alt="Cuidame Tech" />
        </div>
        <div className={styles.footer__sections}>
          <div className={styles.footer__section}>
            <h4>Síguenos</h4>
            <br />
            <div className={styles.footer__social}>
              <label htmlFor=""></label>
              <a
                href="https://www.instagram.com/cuidamehealth?igsh=MWZ2Nnl1ZnI4dXljag=="
                id="health"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  style={{ width: "1.5rem" }}
                  src="/SocialMedia/instagram.svg"
                  alt="Instagram"
                />
              </a>
              <a
                href="https://www.instagram.com/cuidamepets?igsh=OG5pdGoxbW1pOXRr"
                id="pets"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  style={{ width: "0.9rem" }}
                  src="/SocialMedia/facebook.svg"
                  alt="Facebook"
                />
              </a>
            </div>
            {/*
            <div className={styles.footer__social">
              <a href="#"><img style={{ width: '1.5rem' }} src="/SocialMedia/instagram.svg" alt="Instagram" /></a>
              <a href="#"><img style={{ width: '0.9rem' }} src="/SocialMedia/facebook.svg" alt="Facebook" /></a>
              <a href="#"><img style={{ width: '1.5rem' }} src="/SocialMedia/linkedin.svg" alt="LinkedIn" /></a>
            </div>
            */}
          </div>
          <div className={styles.footer__section}>
            <h4>Contacto</h4>
            <p>contacto@cuidame.tech</p>
            <p>Tunja</p>
            <p>Boyacá, Colombia</p>
          </div>
          {/*
          <div className={styles.footer__section">
            <h4>Accesos rápidos</h4>
            <a href="/">Inicio</a>
            <a href="/tienda">Tienda</a>
            <a href="/soluciones">Soluciones</a>
            <a href="/trabaja">Trabaja con nosotros</a>
          </div>
          */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
