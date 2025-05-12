// Número de WhatsApp fijo (formato internacional sin + ni espacios)
const WHATSAPP_NUMBER = "+573007306645"; // Reemplaza con tu número real

/**
 * Abre un chat de WhatsApp con un número fijo y un mensaje personalizado
 * @param message - El mensaje a enviar (opcional)
 * @returns void
 */
export const openWhatsAppChat = (message: string = ""): void => {
  // Codifica el mensaje para URL
  const encodedMessage = encodeURIComponent(message);
  
  // Crea la URL de WhatsApp Web/App
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Abre la URL en una nueva pestaña
  window.open(whatsappUrl, "_blank");
};

export default openWhatsAppChat;