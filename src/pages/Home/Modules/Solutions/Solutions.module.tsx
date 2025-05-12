import React from 'react';
import { NavLink } from "react-router-dom";
import './Solutions.styles.css';
import Boton from '../../../../components/ui/Button';

const Solutions: React.FC = () => {

  return (
<section className="solutions">
    <h1>SOLUCIONES</h1>

    <div className="solutions__container">
        <div className="solutions__initial__card health">
            <div className="img__background">
                <img src="/Home/solutions-bg-1.webp" alt="background" />
            </div>

            <div className="info__container">
                <h2>CUIDAME HEALTH</h2>

                <p>
                    No solo te ofrecemos una aplicación, sino un ecosistema integral 
                    de soluciones diseñadas para brindarte una visión completa de tu bienestar. 
                    Con un enfoque 360°, ponemos a tu disposición herramientas 
                    que garantizan tu seguridad...
                </p>

                <NavLink to="/solutions/health">
                    <Boton className="btn" color="orange" texto=" Más información " />
                </NavLink>
            </div>
        </div>

        <div className="solutions__initial__card pets">
            <div className="img__background">
                <img src="/Home/solutions-bg-2.webp" alt="background" />
            </div>

            <div className="info__container">
                <h2>CUIDAME PETS</h2>

                <p>
                    Las mascotas son más que compañeros, son parte de la familia. 
                    Entendemos la importancia de su bienestar tanto como tú, 
                    por eso hemos creado un servicio único e innovador que 
                    garantiza su seguridad y cuidado en todo momento. 
                    Descubre cómo podemos ayudarte a proteger a tu mejor amigo
                </p>

                <NavLink to="/solutions/pets">
                    <Boton className="btn" color="orange" texto=" Más información " />
                </NavLink>
            </div>
        </div>
    </div>

</section>
  );
};

export default Solutions;