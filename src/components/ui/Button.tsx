import React from 'react';
import './Button.styles.css'; // Asegúrate de tener este archivo CSS

interface ButtonProps {
  className?: string;
  texto: string;
  color?: 'blue' | 'orange'; // Asumiendo que estos son los colores disponibles
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ className, texto, color = 'orange', onClick }) => {
  return (
    <button 
      className={`button ${color} ${className || ""}`} 
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default Button;