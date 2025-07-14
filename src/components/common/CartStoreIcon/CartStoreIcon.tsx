import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import styles from './CartStoreIcon.module.css';
import { subscribeToCart, getCart, CartStore } from '../../../utils/cartStore';

interface CartIconProps {
  onClick?: () => void;
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick, className = "" }) => {
  const [cart, setCart] = useState<CartStore>({ items: [], totalItems: 0, totalPrice: 0 });

  useEffect(() => {
    // Cargar el carrito inicial
    const initialCart = getCart();
    setCart(initialCart);

    // Suscribirse a cambios del carrito
    const unsubscribe = subscribeToCart((updatedCart) => {
      setCart(updatedCart);
    });

    // Limpiar suscripción al desmontar
    return () => {
      unsubscribe();
    };
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Redirigir a página de checkout por defecto
      window.location.href = '/market/checkout';
    }
  };

  return (
    <div className={`${styles.cartContainer} ${className}`} onClick={handleClick}>
      {/* Icono del carrito */}
      <div className={styles.cartIconWrapper}>
        <ShoppingCart 
          size={24} 
          className={styles.cartIcon}
        />
        
        {/* Badge con cantidad de productos */}
        {cart.totalItems > 0 && (
          <div className={styles.badge}>
            {cart.totalItems}
          </div>
        )}
      </div>
      
      {/* Tooltip opcional */}
      <div className={styles.tooltip}>
        {cart.totalItems === 0 ? '0' : `${cart.totalItems}`}
      </div>
    </div>
  );
};

export default CartIcon;