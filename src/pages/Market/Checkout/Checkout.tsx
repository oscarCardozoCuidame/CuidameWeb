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
  tax: number;
  total: number;
}

export interface CheckoutProps {
  onPayment?: (paymentData: PaymentSummary) => Promise<void>;
  isLoading?: boolean;
  onCartUpdate?: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ 
  onPayment,
  isLoading = false,
  onCartUpdate
}) => {
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
    const tax: number = subtotal * 0.19;
    const total: number = subtotal + shipping + tax;

    return { 
      items: cartData.items,
      subtotal, 
      shipping, 
      tax, 
      total 
    };
  };

  const handlePayment = async (): Promise<void> => {
    if (cartData.items.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    if (!onPayment) {
      console.error('onPayment callback no está definido');
      return;
    }

    setIsProcessing(true);
    
    try {
      const summary: PaymentSummary = calculateSummary();
      await onPayment(summary);
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Error al procesar el pago. Intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
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

  /*
  let checkoutWompi = new WidgetCheckout({
  currency: 'COP',
  amountInCents: 2490000,
  reference: 'AD002901221',
  publicKey: 'pub_fENJ3hdTJxdzs3hd35PxDBSMB4f85VrgiY3b6s1',
  signature: {integrity : '3a4bd1f3e3edb5e88284c8e1e9a191fdf091ef0dfca9f057cb8f408667f054d0'}
  redirectUrl: 'https://transaction-redirect.wompi.co/check', // Opcional
  expirationTime: '2023-06-09T20:28:50.000Z', // Opcional
  taxInCents: { // Opcional
    vat: 1900,
    consumption: 800
  }
  customerData: { // Opcional
    email:'lola@gmail.com',
    fullName: 'Lola Flores',
    phoneNumber: '3040777777',
    phoneNumberPrefix: '+57',
    legalId: '123456789',
    legalIdType: 'CC'
  }
  shippingAddress: { // Opcional
    addressLine1: "Calle 123 # 4-5",
    city: "Bogota",
    phoneNumber: '3019444444',
    region: "Cundinamarca",
    country: "CO"
  }
})
  */

  const { subtotal, shipping, total }: PaymentSummary = calculateSummary();

  // Debug: mostrar estado actual
  console.log('Renderizando Checkout con cartData:', cartData);

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

          <button 
            className={styles.payButton} 
            onClick={handlePayment}
            disabled={isProcessing || isLoading || !onPayment}
            type="button"
          >
            <span className={styles.payText}>
              {isProcessing ? 'Procesando...' : 'Pagar con Wompi'}
            </span>
            {isProcessing && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
              </div>
            )}
          </button>

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