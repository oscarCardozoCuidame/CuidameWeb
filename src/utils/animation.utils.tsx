import React from 'react';
import { motion, Variants, Variant } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Definición de tipos de animaciones disponibles
export type AnimationType = 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'zoomIn' | 'bounceIn';

// Configuraciones de las variantes de animación
export const animationVariants: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.8 } 
    }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8 } 
    }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8 } 
    }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8 } 
    }
  },
  bounceIn: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.8,
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      } 
    }
  }
};

// Opciones por defecto para el IntersectionObserver
const defaultInViewOptions = {
  triggerOnce: true,
  threshold: 0.2,
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation: AnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

// Función para crear una variante con delay
const createVariantWithDelay = (animation: AnimationType, delay: number): Variants => {
  // Crear copias para no mutar el original
  const hiddenVariant = { ...animationVariants[animation].hidden };
  const visibleVariant = { ...animationVariants[animation].visible } as Variant;
  
  // Agregar el delay a la transición
  return {
    hidden: hiddenVariant,
    visible: {
      ...visibleVariant,
      transition: {
        ...(visibleVariant || { duration: 0.8 }),
        delay
      }
    }
  };
};

// Componente de animación reutilizable
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  animation, 
  delay = 0,
  className = "",
  threshold,
  triggerOnce
}) => {
  const [ref, inView] = useInView({
    ...defaultInViewOptions,
    ...(threshold !== undefined ? { threshold } : {}),
    ...(triggerOnce !== undefined ? { triggerOnce } : {})
  });

  // Usar la función para crear variantes con delay si es necesario
  const variants = delay > 0 
    ? createVariantWithDelay(animation, delay) 
    : animationVariants[animation];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Hook personalizado para usar animaciones en cualquier componente
export const useAnimatedElement = (
  animation: AnimationType, 
  options?: { threshold?: number; triggerOnce?: boolean; delay?: number }
) => {
  const [ref, inView] = useInView({
    ...defaultInViewOptions,
    ...(options?.threshold !== undefined ? { threshold: options.threshold } : {}),
    ...(options?.triggerOnce !== undefined ? { triggerOnce: options.triggerOnce } : {})
  });

  // Usar la función para crear variantes con delay si es necesario
  const variants = options?.delay && options.delay > 0
    ? createVariantWithDelay(animation, options.delay)
    : animationVariants[animation];

  return { ref, inView, variants };
};