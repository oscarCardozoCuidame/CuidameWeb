import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.styles.css";
import Button from "../../ui/Button";
import { openWhatsAppChat } from "../../../utils/whatsapp.utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  // Función para manejar el clic en el botón de contacto
  const handleContactClick = () => {
    // Llamar a la utilidad de WhatsApp con el mensaje deseado
    openWhatsAppChat("Hola, me gustaría obtener más información sobre los servicios de Cuidame.");
  };

  return (
    <header className={`header ${className || ""}`}>
      <div className="header__content">
        <div className="header__logo">
          <img src="/logo/CuidameOrange.svg" alt="Cuidame Tech" />
        </div>
        <nav className="header__nav">
          <NavLink to="/inicio" end>
            Inicio
          </NavLink>
          <NavLink to="/market">
            Tienda
          </NavLink>
          
          {/* Solutions Dropdown */}
          <div 
            className="header__dropdown"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <span className="header__dropdown-trigger">
              Soluciones
            </span>
            {isSolutionsOpen && (
              <div className="header__dropdown-menu">
                <NavLink 
                  className="header__dropdown-item"
                  to="/solutions/health"
                >
                  Health
                </NavLink>
                <NavLink 
                  className="header__dropdown-item"
                  to="/solutions/pets"
                >
                  Pets
                </NavLink>
              </div>
            )}
          </div>
          {/*
          <NavLink to="/mision">
            Sé parte de nuestra misión
          </NavLink>
          */}
        </nav>
        <div className="header__buttons">
          <Button texto="Contáctanos" onClick={handleContactClick} />
          {/* <Button color={"blue"} texto="Ingresar" />*/}
        </div>
      </div>
    </header>
  );
};

export default Header;