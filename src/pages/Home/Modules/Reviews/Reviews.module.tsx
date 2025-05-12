import React, { useState, useEffect, useRef } from 'react';
import './Reviews.styles.css';

interface Review {
  text: string;
  author: string;
}

const Reviews: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  
  const reviews: Review[] = [
    {
      text: '"Saber que mis mascotas están identificadas y que su información médica la tengo a la mano me da tranquilidad, además que para mi veterinario también es de mucha ayuda."',
      author: 'Hernando Rincón, Usuario CUIDAME.PETS',
    },
    {
      text: '"Qué servicio tan innovador, me gusta que pueda salir a montar bici, con la tranquilidad que mis objetos y yo nos pueden identificar por cualquier emergencia."',
      author: 'German Acuña, Militar (R)',
    },
    {
      text: '"Este servicio me da tranquilidad, ya que mi hermana que tiene una enfermedad neurodegenerativa sé que si alguien la encuentra va a poder contactarme."',
      author: 'Nathalia Barrios, Abogada y cuidadora',
    },
  ];

  // Función para mostrar un slide específico
  const showSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Configurar el auto-rotación del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % reviews.length;
      showSlide(nextSlide);
    }, 5000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [currentSlide, reviews.length]);

  return (
    <section className="reviews" style={{ zIndex: 5, position: 'relative' }}>
      <div className="reviews-slides" ref={slidesRef}>
        {reviews.map((review, index) => (
          <div 
            key={index} 
            className={`reviews-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="reviews-content">
              <p className="reviews-text">{review.text}</p>
              <p className="reviews-author">{review.author}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="slide-indicators" ref={indicatorsRef}>
        {reviews.map((_, index) => (
          <button 
            key={index}
            className={`slide-indicator ${index === currentSlide ? 'active' : ''}`} 
            aria-label={`Ver testimonio ${index + 1}`}
            onClick={() => showSlide(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Reviews;