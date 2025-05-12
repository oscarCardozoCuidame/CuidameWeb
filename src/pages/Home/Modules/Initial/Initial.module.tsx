import React from 'react';
import './Initial.styles.css';
import Boton from '../../../../components/ui/Button';

const Initial: React.FC = () => {

  return (
<section className="initial">
  <video autoPlay muted loop playsInline className="background-video">
    <source src="/Home/initial-carrucel.mp4" type="video/mp4" />
    Tu navegador no soporta el video.
  </video>

    <div className="info__container">
        <img src="/logo/Cuidame.svg" alt="logo" className="logo" />

        <div className="stores__container">
            <img src="/SocialMedia/PlayStore.svg" alt="playstore"/>
            <img src="/SocialMedia/AppleStore.svg" alt="applestore"/>
            <h3>descarga nuestra app<br/><strong>ANDROID</strong> e <strong>iOS</strong></h3>
        </div>

        <h2>Somos un servicio integral dedicado al cuidado</h2>

        {/* 
        <Boton className="btn" color="orange" texto=" DESCARGA GRATIS " />
        */}
    </div>

</section>
  );
};

export default Initial;