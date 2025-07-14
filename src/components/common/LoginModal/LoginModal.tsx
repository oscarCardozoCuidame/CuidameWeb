import React, { useState, useEffect, useRef } from "react";
import styles from "./LoginModal.module.css";

interface ModalUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<ModalUsuarioProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      setIsAnimating(false);
      // Esperar a que termine la animación antes de desmontar
      setTimeout(() => {
        setShouldRender(false);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleOptionClick = (option: string): void => {
    window.open(option, "_blank");
    onClose();
  };

  if (!shouldRender) return null;

  return (
    <div className={styles.overlay}>
      <div
        ref={modalRef}
        className={`${styles.modal} ${
          isAnimating ? styles.modalEnter : styles.modalExit
        }`}
      >
        {/* Contenido principal */}
        <div className={styles.modalContent}>
          <div className={styles.content}>
            <h3 className={styles.title}>Antes de continuar...</h3>
            <p className={styles.subtitle}>Dinos tu eres usuario de:</p>

            {/* Opciones circulares */}
            <div className={styles.optionsContainer}>
              <button
                onClick={() => handleOptionClick(
                    "https://play.google.com/store/apps/details?id=com.esmarttek.cuidame&hl=es_CO"
                )}
                className={styles.optionButton}
              >
                <div className={styles.optionIcon}>
                  <img
                    src="/logo/CuidamePurple.svg"
                    className={styles.optionImage}
                    alt="Logo Health"
                  />
                </div>
              </button>

              <button
                onClick={() => handleOptionClick(
                    "https://play.google.com/store/apps/details?id=com.esmarttek.cuidame&hl=es_CO"
                )}
                className={styles.optionButton}
              >
                <div className={styles.optionIcon}>
                  <img
                    src="/logo/CuidamePets.svg"
                    className={styles.optionImage}
                    alt="Logo Health"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
