import { useState, useEffect } from 'react';

/**
 * Hook personalizado para cargar estilos de manera responsiva
 * @param mobileStyles Estilos para móvil
 * @param desktopStyles Estilos para escritorio
 * @param breakpoint Punto de quiebre en píxeles (por defecto: 1020px)
 * @returns El objeto de estilos apropiado según el ancho de pantalla
 */
export function useResponsiveStyles<T>(
  mobileStyles: T,
  desktopStyles: T,
  breakpoint: number = 1020
): T {
  // Por defecto, usar estilos de escritorio en SSR o renderizado inicial
  const [styles, setStyles] = useState<T>(
    typeof window !== 'undefined' && window.innerWidth < breakpoint
      ? mobileStyles
      : desktopStyles
  );

  useEffect(() => {
    // Función para actualizar los estilos basados en el ancho de la ventana
    const handleResize = () => {
      if (window.innerWidth < breakpoint) {
        setStyles(mobileStyles);
      } else {
        setStyles(desktopStyles);
      }
    };

    // Configurar el listener
    window.addEventListener('resize', handleResize);
    
    // Llamar a handleResize inicialmente para establecer el valor correcto
    handleResize();

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileStyles, desktopStyles, breakpoint]);

  return styles;
}


/**
 * Hook personalizado para determinar si la pantalla es móvil
 * @param breakpoint Punto de quiebre en píxeles (por defecto: 768px)
 * @returns Boolean indicando si es vista móvil
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' && window.innerWidth < breakpoint
  );

  useEffect(() => {
    // Función para actualizar el estado basado en el ancho de la ventana
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Configurar el listener
    window.addEventListener('resize', handleResize);
    
    // Llamar a handleResize inicialmente para establecer el valor correcto
    handleResize();

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}