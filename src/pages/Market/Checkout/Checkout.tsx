// Checkout.tsx - Versión con suscripciones al cartStore
import React, { useState, useEffect } from 'react';
import {
  getCart,
  updateItemQuantity,
  removeFromCart,
  getCartForWhatsApp,
  subscribeToCart,
  type CartItem,
  type CartStore
} from '../../../utils/cartStore'; // Usar el cartStore mejorado
import desktopStyles from './Checkout.desktop.module.css';
import mobileStyles from './Checkout.mobile.module.css';

// Interfaces adaptadas
export interface PaymentSummary {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export interface CheckoutProps {
  isLoading?: boolean;
  onCartUpdate?: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  isLoading = false,
  onCartUpdate
}) => {
  const public_key = 'pub_test_cI8wkLBO42suNLMwlXnvPW10RMMpQvVM';
  const integrity_key = 'test_integrity_Hn2hDHGpHzuqndnqmyz3eYAnYrxABN6d';

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cartData, setCartData] = useState<CartStore>(() => getCart());

  // Detectar si es móvil
  const isMobile: boolean = typeof window !== 'undefined' && window.innerWidth <= 768;
  const styles = isMobile ? mobileStyles : desktopStyles;

  // Suscribirse a cambios del carrito
  useEffect(() => {
    console.log('Suscribiéndose al carrito...');
    const unsubscribe = subscribeToCart((updatedCart: CartStore) => {
      console.log('Cart actualizado vía suscripción:', updatedCart);
      setCartData(updatedCart);
      if (onCartUpdate) {
        onCartUpdate();
      }
    });

    // Obtener estado inicial
    const initialCart = getCart();
    console.log('Estado inicial del carrito:', initialCart);
    setCartData(initialCart);

    // Cleanup: desuscribirse al desmontar
    return unsubscribe;
  }, [onCartUpdate]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const updateQuantity = (item: CartItem, change: number): void => {
    const newQuantity = item.quantity + change;
    console.log('Actualizando cantidad:', { item: item.name, newQuantity });
    updateItemQuantity(
      item.id,
      newQuantity,
      item.size,
      item.color,
      item.plateColor
    );
  };

  const removeItem = (item: CartItem): void => {
    console.log('Eliminando item:', item.name);
    removeFromCart(item.id, item.size, item.color, item.plateColor);
  };

  const calculateSummary = (): PaymentSummary => {
    const subtotal: number = cartData.totalPrice;
    const shipping: number = cartData.items.length > 0 ? 15000 : 0;
    const total: number = subtotal + shipping;

    return {
      items: cartData.items,
      subtotal,
      shipping,
      total
    };
  };

  const handleWhatsAppShare = (): void => {
    const message = getCartForWhatsApp();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const getItemDisplayName = (item: CartItem): string => {
    let displayName = item.name;
    const details: string[] = [];

    if (item.size) details.push(`Talla: ${item.size}`);
    if (item.color) details.push(`Color: ${item.color}`);
    if (item.plateColor) details.push(`Placa: ${item.plateColor}`);

    if (details.length > 0) {
      displayName += ` (${details.join(', ')})`;
    }

    return displayName;
  };

  const { subtotal, shipping, total }: PaymentSummary = calculateSummary();

  // Estado de carrito vacío
  if (cartData.items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>🛒 Confirmar Pedido</h1>
          <p>Revisa tus productos y completa tu compra</p>
        </div>
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>🛒</div>
          <h3>Tu carrito está vacío</h3>
          <p>Agrega algunos productos para continuar</p>
          <button
            onClick={() => {
              console.log('Estado actual del carrito:', getCart());
              setCartData(getCart());
            }}
            style={{ marginTop: '10px', padding: '8px 16px' }}
          >
            🔄 Refrescar carrito
          </button>
        </div>
      </div>
    );
  }

  const createPaymentKey = (): string => {
    let key = '';
    for (let i = 0; i < 16; i++) {
      key += Math.floor(Math.random() * 16).toString(16);
    }
    return key;
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🛒 Confirmar Pedido</h1>
        <p>Revisa tus productos y completa tu compra</p>
      </div>

      <div className={styles.checkoutContent}>
        <div className={styles.cartItems}>
          <h2 className={styles.cartTitle}>
            🛍️ Tu Carrito de Compras ({cartData.totalItems} productos)
          </h2>

          <div className={styles.cartContainer}>
            {cartData.items.map((item: CartItem, index: number) => (
              <div key={`${item.id}-${item.size}-${item.color}-${item.plateColor}-${index}`} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    item.category === 'pets' ? '🐕' : '💊'
                  )}
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemName}>{getItemDisplayName(item)}</div>
                  <div className={styles.itemCategory}>
                    {item.category === 'pets' ? 'Mascotas' : 'Salud'}
                  </div>
                  <div className={styles.itemPrice}>{formatPrice(item.price)}</div>
                  <div className={styles.itemSubtotal}>
                    Subtotal: {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
                <div className={styles.quantityControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item, -1)}
                    disabled={item.quantity <= 1 || isLoading}
                    type="button"
                  >
                    -
                  </button>
                  <span className={styles.qtyDisplay}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item, 1)}
                    disabled={isLoading}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(item)}
                  disabled={isLoading}
                  type="button"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.paymentSection}>
          <h2 className={styles.paymentTitle}>💳 Resumen del Pedido</h2>

          <div className={styles.orderSummary}>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Envío:</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <form action="https://checkout.wompi.co/p/" method="GET">
            <input type="hidden" name="public-key" value={public_key} />
            <input type="hidden" name="currency" value="COP" />
            <input type="hidden" name="amount-in-cents" value={total * 100} />
            <input type="hidden" name="reference" value={createPaymentKey()} />
            <input type="hidden" name="signature:integrity" value={integrity_key} />
            <button type="submit" className={`${styles.payButton} ${styles.whatsappBtn}`}>Pagar con Wompi</button>
          </form>

          <button
            className={`${styles.payButton} ${styles.whatsappBtn}`}
            onClick={handleWhatsAppShare}
            disabled={isLoading}
            type="button"
            style={{ backgroundColor: '#25D366', marginTop: '10px' }}
          >
            <span className={styles.payText}>
              📱 Compartir por WhatsApp
            </span>
          </button>

          <div className={styles.securityBadge}>
            🔒 Pago 100% seguro con Wompi
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;