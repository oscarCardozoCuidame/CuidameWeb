import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Market.home.module.css";

const MarketHome: React.FC = () => {
  return (
    <main className={styles.market__home}>
      <h1 className={styles.initial__title}>PRODUCTOS</h1>
      <h3 className={styles.initial__subtitle}>Cuidamos de ti con tecnología confiable y accesible.</h3>

      <NavLink to="/market/health">
        <section className={`${styles.market__card} ${styles.health__section__card}`}>
          <div className={styles.product__info}>
            <img src="/Market/product-health.webp" alt="Producto Health" />
            <h1 className={styles.title}>
              PRODUCTOS
              <br />
              HEALTH
            </h1>
          </div>

          <div className={styles.bg__img}>
            <img src="/Market/health-home.webp" alt="Fondo Health" />
          </div>
        </section>
      </NavLink>

      <NavLink to="/market/pets">
        <section className={`${styles.market__card} ${styles.pets__section__card}`}>
          <div className={styles.product__info}>
            <img src="/Market/product-pets.webp" alt="Producto Health" />
            <h1 className={styles.title}>
              PRODUCTOS
              <br />
              PETS
            </h1>
          </div>

          <div className={styles.bg__img}>
            <img src="/Market/pets-home.webp" alt="Fondo Health" />
          </div>
        </section>
      </NavLink>
    </main>
  );
};

export default MarketHome;
