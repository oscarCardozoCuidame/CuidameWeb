// cartStore.ts - Store global persistente para el carrito de compras

export interface CartItem {
  id: string;
  category: 'pets' | 'health';
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  plateColor?: string;
  image?: string;
  addedAt: string; // Cambiar a string para serialización
}

export interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const CART_STORAGE_KEY = 'shopping_cart';

// Función para cargar el carrito desde sessionStorage
const loadCartFromStorage = (): CartStore => {
  try {
    if (typeof window === 'undefined') {
      return { items: [], totalItems: 0, totalPrice: 0 };
    }
    
    const storedCart = sessionStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      console.log('Carrito cargado desde sessionStorage:', parsedCart);
      return parsedCart;
    }
  } catch (error) {
    console.error('Error al cargar carrito desde sessionStorage:', error);
  }
  
  return { items: [], totalItems: 0, totalPrice: 0 };
};

// Función para guardar el carrito en sessionStorage
const saveCartToStorage = (cart: CartStore): void => {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      console.log('Carrito guardado en sessionStorage:', cart);
    }
  } catch (error) {
    console.error('Error al guardar carrito en sessionStorage:', error);
  }
};

// Variable global del carrito - se inicializa desde sessionStorage
let globalCart: CartStore = loadCartFromStorage();

// Sistema de suscripciones
type CartListener = (cart: CartStore) => void;
const listeners: CartListener[] = [];

// Función para suscribirse a cambios del carrito
export const subscribeToCart = (listener: CartListener): (() => void) => {
  listeners.push(listener);
  
  // Devolver función para cancelar la suscripción
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

// Función para notificar a todos los suscriptores
const notifyListeners = (): void => {
  listeners.forEach(listener => listener({ ...globalCart }));
};

// Función para calcular totales
const calculateTotals = (): void => {
  globalCart.totalItems = globalCart.items.reduce((sum, item) => sum + item.quantity, 0);
  globalCart.totalPrice = globalCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// Función para sincronizar: calcular totales, guardar y notificar
const syncCart = (): void => {
  calculateTotals();
  saveCartToStorage(globalCart);
  notifyListeners();
};

// Función para agregar item al carrito
export const addToCart = (item: Omit<CartItem, 'addedAt'>): void => {
  const existingItemIndex = globalCart.items.findIndex(
    cartItem => 
      cartItem.id === item.id && 
      cartItem.size === item.size && 
      cartItem.color === item.color &&
      cartItem.plateColor === item.plateColor
  );

  if (existingItemIndex >= 0) {
    // Si el item ya existe, actualizar cantidad
    globalCart.items[existingItemIndex].quantity += item.quantity;
  } else {
    // Si es nuevo, agregarlo
    globalCart.items.push({
      ...item,
      addedAt: new Date().toISOString()
    });
  }

  syncCart();
  console.log('Producto agregado al carrito:', item);
  console.log('Carrito actual:', globalCart);
};

// Función para obtener el carrito
export const getCart = (): CartStore => {
  // Siempre recargar desde storage para asegurar sincronización
  globalCart = loadCartFromStorage();
  return { ...globalCart };
};

// Función para limpiar el carrito
export const clearCart = (): void => {
  globalCart = {
    items: [],
    totalItems: 0,
    totalPrice: 0
  };
  syncCart();
  console.log('Carrito limpiado');
};

// Función para remover un item específico
export const removeFromCart = (itemId: string, size?: string, color?: string, plateColor?: string): void => {
  globalCart.items = globalCart.items.filter(
    item => !(
      item.id === itemId && 
      item.size === size && 
      item.color === color &&
      item.plateColor === plateColor
    )
  );
  syncCart();
  console.log('Item removido del carrito');
};

// Función para actualizar cantidad de un item
export const updateItemQuantity = (itemId: string, newQuantity: number, size?: string, color?: string, plateColor?: string): void => {
  const itemIndex = globalCart.items.findIndex(
    item => 
      item.id === itemId && 
      item.size === size && 
      item.color === color &&
      item.plateColor === plateColor
  );

  if (itemIndex >= 0) {
    if (newQuantity <= 0) {
      globalCart.items.splice(itemIndex, 1);
    } else {
      globalCart.items[itemIndex].quantity = newQuantity;
    }
    syncCart();
  }
};

// Función para obtener el carrito como JSON
export const getCartAsJSON = (): string => {
  return JSON.stringify(globalCart, null, 2);
};

// Función para exportar el carrito como texto formateado para WhatsApp
export const getCartForWhatsApp = (): string => {
  if (globalCart.items.length === 0) {
    return "El carrito está vacío.";
  }

  let message = "🛒 **MI CARRITO DE COMPRAS**\n\n";
  
  globalCart.items.forEach((item, index) => {
    message += `${index + 1}. **${item.name}**\n`;
    message += `   💰 Precio: $${item.price.toLocaleString('es-CO')} COP\n`;
    message += `   📦 Cantidad: ${item.quantity}\n`;
    
    if (item.size) {
      message += `   📏 Talla: ${item.size}\n`;
    }
    if (item.color) {
      message += `   🎨 Color: ${item.color}\n`;
    }
    if (item.plateColor) {
      message += `   🏷️ Color de placa: ${item.plateColor}\n`;
    }
    
    const subtotal = item.price * item.quantity;
    message += `   💵 Subtotal: $${subtotal.toLocaleString('es-CO')} COP\n\n`;
  });

  message += `📊 **RESUMEN:**\n`;
  message += `📦 Total de productos: ${globalCart.totalItems}\n`;
  message += `💰 Total a pagar: $${globalCart.totalPrice.toLocaleString('es-CO')} COP\n\n`;
  message += `¿Podrían brindarme más información sobre estos productos?`;

  return message;
};

// Función para debug - forzar recarga desde storage
export const reloadCartFromStorage = (): CartStore => {
  globalCart = loadCartFromStorage();
  notifyListeners();
  return { ...globalCart };
};