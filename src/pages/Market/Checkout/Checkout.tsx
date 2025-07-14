// Checkout.tsx - Versión integrada con formulario WhatsApp
import React, { useState, useEffect } from "react";
import {
  getCart,
  updateItemQuantity,
  removeFromCart,
  getCartForWhatsApp,
  subscribeToCart,
  type CartItem,
  type CartStore,
} from "../../../utils/cartStore";
import desktopStyles from "./Checkout.desktop.module.css";
import mobileStyles from "./Checkout.mobile.module.css";

// Interfaces
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

interface FormData {
  nombre: string;
  correo: string;
  celular: string;
  direccion: string;
}

const Checkout: React.FC<CheckoutProps> = ({
  isLoading = false,
  onCartUpdate,
}) => {
  const public_key = "pub_test_cI8wkLBO42suNLMwlXnvPW10RMMpQvVM";
  const integrity_key = "test_integrity_Hn2hDHGpHzuqndnqmyz3eYAnYrxABN6d";
  const WHATSAPP_ACCESS_TOKEN = "EAA9bV5eduqUBO8ZBSlwCr68h4cTshJZBDNuwvZBMTpPZCfLeUD24awJr4g8lvAkjiI5jxQvhvgnQMjOyEZBBVDUiKdYZBi57jIeuQ1YAWfwo3LDwRTrJnGqfRfmyU1tCk7jlzt3ukOYTSriHiqoOBEtuOQoELESiQaUKRNG2pmYNfXGCk0MZAjaVE5px15PZBUbfnwZDZD";
  const WHATSAPP_PHONE_NUMBER_ID = "688942737640399"
  const phoneNumber = "3195752651";
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cartData, setCartData] = useState<CartStore>(() => getCart());
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    correo: "",
    celular: "",
    direccion: "",
  });

  // Detectar si es móvil
  const isMobile: boolean =
    typeof window !== "undefined" && window.innerWidth <= 768;
  const styles = isMobile ? mobileStyles : desktopStyles;

  // Suscribirse a cambios del carrito
  useEffect(() => {
    console.log("Suscribiéndose al carrito...");
    const unsubscribe = subscribeToCart((updatedCart: CartStore) => {
      console.log("Cart actualizado vía suscripción:", updatedCart);
      setCartData(updatedCart);
      if (onCartUpdate) {
        onCartUpdate();
      }
    });

    const initialCart = getCart();
    console.log("Estado inicial del carrito:", initialCart);
    setCartData(initialCart);

    return unsubscribe;
  }, [onCartUpdate]);

  const createPaymentKey = (): string => {
    let key = "";
    for (let i = 0; i < 16; i++) {
      key += Math.floor(Math.random() * 16).toString(16);
    }
    return key;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (item: CartItem, change: number): void => {
    const newQuantity = item.quantity + change;
    console.log("Actualizando cantidad:", { item: item.name, newQuantity });
    updateItemQuantity(
      item.id,
      newQuantity,
      item.size,
      item.color,
      item.plateColor
    );
  };

  const removeItem = (item: CartItem): void => {
    console.log("Eliminando item:", item.name);
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
      total,
    };
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (): void => {
    setIsProcessing(true);

    // Validar que todos los campos estén llenos
    if (
      !formData.nombre ||
      !formData.correo ||
      !formData.celular ||
      !formData.direccion
    ) {
      alert("Por favor completa todos los campos");
      setIsProcessing(false);
      return;
    }

    // Crear mensaje para WhatsApp con datos del pedido y del cliente
    const orderMessage = getCartForWhatsApp();
    const customerInfo = `\n\n👤 *Datos del Cliente*\n\nNombre: ${formData.nombre}\nCorreo: ${formData.correo}\nCelular: ${formData.celular}\nDirección: ${formData.direccion}`;
    const fullMessage = orderMessage + customerInfo;

    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsProcessing(false);
      // Resetear formulario después de enviar
      setFormData({
        nombre: "",
        correo: "",
        celular: "",
        direccion: "",
      });
      setShowForm(false);
    }, 1000);
  };

  const handleFormWompi = (): void => {
    setIsProcessing(true);

    // Validar que todos los campos estén llenos
    if (
      !formData.nombre ||
      !formData.correo ||
      !formData.celular ||
      !formData.direccion
    ) {
      alert("Por favor completa todos los campos");
      setIsProcessing(false);
      return;
    }

    // Después de un breve delay, redirigir a Wompi
    setTimeout(() => {
      // Crear la URL de Wompi con los parámetros
      const wompiUrl = new URL("https://checkout.wompi.co/p/");
      wompiUrl.searchParams.append("public-key", public_key);
      wompiUrl.searchParams.append("currency", "COP");
      wompiUrl.searchParams.append("amount-in-cents", (total * 100).toString());
      wompiUrl.searchParams.append("reference", createPaymentKey());
      wompiUrl.searchParams.append("signature:integrity", integrity_key);

      // Redirigir a Wompi
      window.location.href = wompiUrl.toString();

      setIsProcessing(false);
    }, 1500);

    const customerInfo = `\n\n👤 *Datos del Cliente*\n\nNombre: ${formData.nombre}\nCorreo: ${formData.correo}\nCelular: ${formData.celular}\nDirección: ${formData.direccion}`;
    const fullMessage = customerInfo;

    const encodedMessage = encodeURIComponent(fullMessage);
    sendWhatsAppBusinessMessageBill(phoneNumber, encodedMessage);

    // Resetear formulario después de enviar
    setFormData({
      nombre: "",
      correo: "",
      celular: "",
      direccion: "",
    });
    setShowForm(false);
  };

  const sendWhatsAppBusinessMessageBill = async (
    phoneNumber: String,
    message: String
  ) => {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phoneNumber,
          type: "text",
          text: { body: message },
        }),
      }
    );
    return response.json();
  };

  const getItemDisplayName = (item: CartItem): string => {
    let displayName = item.name;
    const details: string[] = [];

    if (item.size) details.push(`Talla: ${item.size}`);
    if (item.color) details.push(`Color: ${item.color}`);
    if (item.plateColor) details.push(`Placa: ${item.plateColor}`);

    if (details.length > 0) {
      displayName += ` (${details.join(", ")})`;
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
              console.log("Estado actual del carrito:", getCart());
              setCartData(getCart());
            }}
            style={{ marginTop: "10px", padding: "8px 16px" }}
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
              <div
                key={`${item.id}-${item.size}-${item.color}-${item.plateColor}-${index}`}
                className={styles.cartItem}
              >
                <div className={styles.itemImage}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : item.category === "pets" ? (
                    "🐕"
                  ) : (
                    "💊"
                  )}
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemName}>
                    {getItemDisplayName(item)}
                  </div>
                  <div className={styles.itemCategory}>
                    {item.category === "pets"
                      ? "Cuidame Pets"
                      : "Cuidame Health"}
                  </div>
                  <div className={styles.itemPrice}>
                    {formatPrice(item.price)}
                  </div>
                  <div className={styles.itemSubtotal}>
                    Subtotal: {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
                <div className={styles.quantityControls}>
                  <button
                    className={`${styles.qtyBtn} ${styles.qtyBtnLeft}`}
                    onClick={() => updateQuantity(item, -1)}
                    disabled={item.quantity <= 1 || isLoading}
                    type="button"
                  >
                    -
                  </button>
                  <span className={styles.qtyDisplay}>{item.quantity}</span>
                  <button
                    className={`${styles.qtyBtn} ${styles.qtyBtnRight}`}
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

          {!showForm ? (
            <div className={styles.buttonContainer}>
              <button
                className={`${styles.payButton} ${styles.orderBtn}`}
                onClick={() => setShowForm(true)}
                disabled={isLoading}
                type="button"
                style={{ backgroundColor: "#667eea", marginTop: "10px" }}
              >
                <span className={styles.payText}>📋 Realizar Pedido</span>
              </button>
            </div>
          ) : (
            <div className={styles.formContainer}>
              <h3 className={styles.formTitle}>📝 Datos de Entrega</h3>
              <div className={styles.customerForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="nombre" className={styles.formLabel}>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="correo" className={styles.formLabel}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="celular" className={styles.formLabel}>
                    Número de celular
                  </label>
                  <input
                    type="tel"
                    id="celular"
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="3001234567"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="direccion" className={styles.formLabel}>
                    Dirección de entrega
                  </label>
                  <textarea
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className={`${styles.formInput} ${styles.formTextarea}`}
                    placeholder="Calle 123 #45-67, Barrio, Ciudad"
                    rows={3}
                    required
                  />
                </div>

                <div className={styles.formButtons}>
                  <button
                    type="button"
                    className={`${styles.payButton} ${styles.backBtn}`}
                    onClick={() => setShowForm(false)}
                    style={{ backgroundColor: "#6c757d", marginRight: "10px" }}
                  >
                    ← Volver
                  </button>

                  <button
                    type="button"
                    onClick={handleFormWompi}
                    disabled={isProcessing}
                    className={`${styles.payButton} ${styles.whatsappBtn}`}
                  >
                    {isProcessing ? "Procesando..." : "Pagar con Wompi"}
                  </button>

                  <button
                    type="button"
                    className={`${styles.payButton} ${styles.submitBtn}`}
                    disabled={isProcessing}
                    style={{ backgroundColor: "#25D366" }}
                    onClick={handleFormSubmit}
                  >
                    {isProcessing ? (
                      <span className={styles.payText}>Enviando...</span>
                    ) : (
                      <span className={styles.payText}>
                        📱 Enviar por WhatsApp
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={styles.securityBadge}>🔒 Pedido 100% seguro</div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
