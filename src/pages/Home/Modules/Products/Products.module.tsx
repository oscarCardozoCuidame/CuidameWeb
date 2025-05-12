import React from 'react';
import './Products.styles.css';
import Boton from '../../../../components/ui/Button';

const Products: React.FC = () => {

  return (
<section className="products">
    <h1>PRODUCTOS</h1>

    <div className="container">
        <div className="product__card">
            <div className="product__info">
                <h3>Cuidamos de ti con tecnología confiable y accesible.</h3>

                <Boton className="btn" color="orange" texto="IR A LA TIENDA" />
            </div>

            <div className="product__img">
                <img src="/Home/product.webp" alt="background" />
            </div>
        </div>
    </div>

</section>
  );
};

export default Products;