import React, { useState } from "react";
import Boton from "../../../../components/ui/Button";
import { useResponsiveStyles } from "../../../../utils/useResponsiveStyles";

import mobileStyles from "./TryPage.mobile.module.css";
import desktopStyles from "./TryPage.desktop.module.css";

interface TryPageProps {
  title: string;
  buttonText: string;
}

const TryPage: React.FC<TryPageProps> = ({ 
  title, 
  buttonText, 
}) => {
  const styles = useResponsiveStyles(mobileStyles, desktopStyles);
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <section className={styles.trypage}>
      <div className={`${styles['content-container']} ${showForm ? styles.expanded : ''}`}>
        {!showForm ? (
          <div className={styles['text-content']}>
            <p>{title}</p>
          </div>
        ) : (
          <div className={styles['form-wrapper']}>
            <div className={styles['form-header']}>
              <div className={styles['form-row']}>
                <div className={styles['form-field']}>
                  <label>Nombres</label>
                  <input type="text" />
                </div>
                <div className={`${styles['form-field']} ${styles['form-radio']}`}>
                  <span>Persona</span>
                  <div className={styles['radio-group']}>
                    <label>
                      <input type="radio" name="persona" value="natural" defaultChecked />
                      <span>Natural</span>
                    </label>
                    <label>
                      <input type="radio" name="persona" value="juridica" />
                      <span>Jurídica</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles['form-row']}>
                <div className={styles['form-field']}>
                  <label>Apellidos</label>
                  <input type="text" />
                </div>
                <div className={styles['form-field']}>
                  <label>Profesión <span className={styles['label-hint']}>(médico, gerente, maestro, estudiante, etc.)</span></label>
                  <input type="text" />
                </div>
              </div>

              <div className={styles['form-row']}>
                <div className={styles['form-field']}>
                  <label>Correo electrónico</label>
                  <input type="email" />
                </div>
                <div className={styles['form-field']}>
                  <label>Especialidad</label>
                  <input type="text" />
                </div>
              </div>

              <div className={styles['form-row']}>
                <div className={styles['form-field']}>
                  <label>Teléfono de contacto</label>
                  <input type="tel" />
                </div>
                <div className={`${styles['form-field']} ${styles['location-fields']}`}>
                    <label>Ciudad de residencia</label>
                    <input type="text" />
                </div>
                <div className={`${styles['form-field']} ${styles['location-fields']}`}>
                    <label>País</label>
                    <input type="text" />
                </div>
              </div>

              <div className={styles['form-row']}>
                <div className={`${styles['form-field']} ${styles['availability-field']}`}>
                  <label>Disponibilidad horaria:</label>
                  <div className={styles['time-range']}>
                    <span>De:</span>
                    <input type="time" />
                    <span>a:</span>
                    <input type="time" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Boton
        className={styles.btn}
        color="orange"
        texto={showForm ? "Guardar y enviar" : buttonText}
        onClick={handleButtonClick}
      />
    </section>
  );
};

export default TryPage;