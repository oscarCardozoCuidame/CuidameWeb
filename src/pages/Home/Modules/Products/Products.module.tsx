import React from "react";
import { useResponsiveStyles } from "../../../../utils/useResponsiveStyles";

import mobileStyles from "./Products.mobile.module.css";
import desktopStyles from "./Products.desktop.module.css";
import Boton from "../../../../components/ui/Button";

const Products: React.FC = () => {
  const styles = useResponsiveStyles(mobileStyles, desktopStyles);

  return (
    <section className={styles.products}>
      <h1>PRODUCTOS</h1>

      <div className={styles.container}>
        <div className={styles.product__card}>
          <div className={styles.product__info}>
            <h3>Cuidamos de ti con tecnología confiable y accesible.</h3>

            <Boton
              className={styles.btn}
              color="orange"
              texto="IR A LA TIENDA"
            />
          </div>

          <div className={styles.product__img}>
            <img src="/Home/product.webp" alt="background" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
