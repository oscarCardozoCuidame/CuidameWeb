import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.desktop.css";
import "./Header.mobile.css";
import CartStore from "../CartStoreIcon/CartStoreIcon"
import Button from "../../ui/Button";
import LoginModal from "../../common/LoginModal/LoginModal";
import { openWhatsAppChat } from "../../../utils/whatsapp.utils";
import { useIsMobile } from "../../../utils/useResponsiveStyles";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // Utilizamos nuestro hook para determinar si es móvil
  const isMobile = useIsMobile(1020);
 
  // Estados para el manejo del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para manejar el clic en el botón de contacto
  const handleContactClick = () => {
    // Llamar a la utilidad de WhatsApp con el mensaje deseado
    openWhatsAppChat("Hola, me gustaría obtener más información sobre los servicios de Cuidame.");
  };

  // Renderiza el header para móviles
  const renderMobileHeader = () => {
    return (
      <>
        <header className="header-mobile">
          <div className="header-mobile__logo">
            <img src="/logo/CuidameOrange.svg" alt="Cuidame Tech" />
          </div>
          <button 
            className="header-mobile__menu-button" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="header-mobile__menu-text">Menu</span>
            <div className="header-mobile__menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </header>

        {/* Menú móvil desplegable */}
        <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" className="mobile-nav__link" onClick={() => setIsMenuOpen(false)}>
            Inicio
          </NavLink>
          
          <NavLink to="/market" className="mobile-nav__link" onClick={() => setIsMenuOpen(false)}>
            Tienda
          </NavLink>
          
          {/* Soluciones con submenú */}
          <div className="mobile-nav__link" onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}>
            Soluciones
            <svg 
              className={`arrow-icon ${isSolutionsOpen ? 'up' : 'down'}`}
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M6 9L12 15L18 9" 
                stroke="#214192" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <div className={`mobile-nav__solutions-dropdown ${isSolutionsOpen ? 'open' : ''}`}>
            <NavLink 
              to="/solutions/health" 
              className="mobile-nav__solutions-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Cuidame Health
            </NavLink>
            <NavLink 
              to="/solutions/pets" 
              className="mobile-nav__solutions-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Cuidame Pets
            </NavLink>
            <NavLink 
              to="/doc" 
              className="mobile-nav__solutions-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Cuidame Docs
            </NavLink>
          </div>
          
          <NavLink to="/start-with-us" className="mobile-nav__link" onClick={() => setIsMenuOpen(false)}>
            Sé parte de nuestra misión
          </NavLink>
          
          {/* Botones */}
          <div className="mobile-nav__buttons">
            <button 
              className="mobile-nav__button mobile-nav__button--secondary"
              onClick={() => {
                // Acción para ingresar
                setIsMenuOpen(false);
              }}
            >
              Ingresar
            </button>
            <button 
              className="mobile-nav__button mobile-nav__button--primary"
              onClick={() => {
                handleContactClick();
                setIsMenuOpen(false);
              }}
            >
              Contáctanos
            </button>
          </div>
        </nav>
      </>
    );
  };

  // Renderiza el header para desktop
  const renderDesktopHeader = () => {
    return (
      <header className={`header ${className || ""}`}>
        <div className="header__content">
          <div className="header__logo">
            <img src="/logo/CuidameOrange.svg" alt="Cuidame Tech" />
          </div>
          <nav className="header__nav">
            <NavLink to="/" end>
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
                  <NavLink 
                    className="header__dropdown-item"
                    to="/doc"
                  >
                    Docs
                  </NavLink>
                </div>
              )}
            </div>
            
            <NavLink to="/start-with-us">
              Sé parte de nuestra misión
            </NavLink>
          </nav>
          <div className="header__buttons">
            <CartStore></CartStore>
            <Button texto="Contáctanos" onClick={handleContactClick} />
            <Button color={"blue"} texto="Ingresar" onClick={() => isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true) }/>
          </div>
        </div>

        <LoginModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </header>
    );
  };

  // Retorna el header apropiado según el dispositivo
  return isMobile ? renderMobileHeader() : renderDesktopHeader();
};

export default Header;