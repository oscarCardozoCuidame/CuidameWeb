import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Market.pets.module.css";

interface SectionConfig {
  id: string;
  min: number;
  max: number;
}

// Interfaz para los tamaños seleccionados
interface SizeSelections {
  collar: string;
  shirtfront: string;
}

// Interfaz para los precios según la selección
interface ProductPrices {
  collar: {
    "XXS-XS-S": number;
    "M-L-XL": number;
  };
  tags: number;
  medals: number;
  shirtfront: {
    "XXS-XS-S": number;
    "M-L-XL": number;
  };
}

const MarketPets: React.FC = () => {
  // Estado para las cantidades de cada sección
  const [quantities, setQuantities] = useState({
    collar: 1,
    tags: 1,
    medals: 1,
    shirtfront: 1,
  });
  
  // Estado para los tamaños seleccionados
  const [selectedSizes, setSelectedSizes] = useState<SizeSelections>({
    collar: "XXS-XS-S",
    shirtfront: "XXS-XS-S",
  });

  // Definir precios de productos
  const productPrices: ProductPrices = {
    collar: {
      "XXS-XS-S": 39000,
      "M-L-XL": 49000,
    },
    tags: 45000,
    medals: 15000,
    shirtfront: {
      "XXS-XS-S": 89000,
      "M-L-XL": 110000,
    },
  };

  // Referencias a elementos DOM
  const collarRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const medalsRef = useRef<HTMLDivElement>(null);
  const shirtfrontRef = useRef<HTMLDivElement>(null);

  // Función para actualizar cantidad
  const updateQuantity = (sectionId: string, change: number) => {
    setQuantities((prev) => {
      const sectionKey = sectionId as keyof typeof prev;
      const currentValue = prev[sectionKey];
      const sections: SectionConfig[] = [
        { id: "collar", min: 1, max: 99 },
        { id: "tags", min: 1, max: 99 },
        { id: "medals", min: 1, max: 99 },
        { id: "shirtfront", min: 1, max: 99 },
      ];

      const section = sections.find((s) => s.id === sectionId);
      if (!section) return prev;

      let newValue = currentValue + change;
      if (newValue < section.min) newValue = section.min;
      if (newValue > section.max) newValue = section.max;

      // Guardar en localStorage para persistencia
      localStorage.setItem(`quantity_${sectionId}`, newValue.toString());

      // Opcional: Registrar cambios en consola (similar al evento personalizado original)
      console.log(`Cantidad actualizada en ${sectionId}: ${newValue}`);

      return {
        ...prev,
        [sectionKey]: newValue,
      };
    });
  };

  // Función para actualizar talla seleccionada
  const updateSelectedSize = (productId: keyof SizeSelections, size: string) => {
    setSelectedSizes((prev) => {
      const newSizes = { ...prev, [productId]: size };
      // Guardar en localStorage
      localStorage.setItem(`size_${productId}`, size);
      return newSizes;
    });
  };

  // Función para enviar mensaje de WhatsApp
  const sendWhatsAppMessage = (productId: string) => {
    const productNames: { [key: string]: string } = {
      collar: "Collar letras 3D",
      tags: "Tag en Silicona",
      medals: "Medalla en Acrílico",
      shirtfront: "Pechera 3D",
    };

    let message = `Hola, estoy interesado en el producto: ${productNames[productId]}`;
    
    // Agregar información de talla si aplica
    if (productId === "collar" || productId === "shirtfront") {
      const size = selectedSizes[productId as keyof SizeSelections];
      message += `, talla: ${size}`;
      
      // Agregar precio según la talla
      const price = productId === "collar" 
        ? productPrices.collar[size as keyof typeof productPrices.collar] 
        : productPrices.shirtfront[size as keyof typeof productPrices.shirtfront];
      
      message += `, precio: $${price.toLocaleString('es-CO')} COP`;
    } else {
      // Productos sin talla
      const price = productId === "tags" ? productPrices.tags : productPrices.medals;
      message += `, precio: $${price.toLocaleString('es-CO')} COP`;
    }
    
    // Agregar cantidad
    message += `, cantidad: ${quantities[productId as keyof typeof quantities]}`;
    
    // Calcular precio total
    let totalPrice = 0;
    if (productId === "collar") {
      totalPrice = productPrices.collar[selectedSizes.collar as keyof typeof productPrices.collar] * quantities.collar;
    } else if (productId === "shirtfront") {
      totalPrice = productPrices.shirtfront[selectedSizes.shirtfront as keyof typeof productPrices.shirtfront] * quantities.shirtfront;
    } else if (productId === "tags") {
      totalPrice = productPrices.tags * quantities.tags;
    } else if (productId === "medals") {
      totalPrice = productPrices.medals * quantities.medals;
    }
    
    message += `. Total: $${totalPrice.toLocaleString('es-CO')} COP`;
    
    // Agregar texto adicional
    message += ". ¿Podrían brindarme más información?";
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Número de WhatsApp (reemplazar con el número correcto)
    const phoneNumber = "3195752651"; // Reemplaza con el número real
    
    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir en nueva pestaña
    window.open(whatsappUrl, "_blank");
  };

  // Cargar valores guardados del localStorage al iniciar
  useEffect(() => {
    // Cargar cantidades
    const sections = ["collar", "tags", "medals", "shirtfront"];
    sections.forEach((section) => {
      const savedValue = localStorage.getItem(`quantity_${section}`);
      if (savedValue) {
        setQuantities((prev) => ({
          ...prev,
          [section]: parseInt(savedValue, 10),
        }));
      }
    });
    
    // Cargar tallas seleccionadas
    const savedCollarSize = localStorage.getItem("size_collar");
    const savedShirtfrontSize = localStorage.getItem("size_shirtfront");
    
    setSelectedSizes((prev) => ({
      ...prev,
      collar: savedCollarSize || "XXS-XS-S",
      shirtfront: savedShirtfrontSize || "XXS-XS-S",
    }));
  }, []);

  return (
    <main className={styles.market__health}>
      <h1 className={styles.initial__title}>PRODUCTOS</h1>
      <h3 className={styles.initial__subtitle}>
        Nuestra plataforma le permite tomar el control de su salud con
        soluciones innovadoras y personalizadas.
      </h3>

      <section className={`${styles.market__card} ${styles.pets__card}`}>
        <div className={styles.product__info}>
          <img src="/Market/product-pets.webp" alt="Producto Health" />
          <h1 className={styles.title}>
            PRODUCTOS
            <br />
            PETS
          </h1>
        </div>

        <div className={styles.bg__img}>
          <img src="/Market/pets-home.webp" alt="Fondo Health" />
        </div>
      </section>

      {/* Sección que muestra los collares */}
      <section
        id="collar"
        className={`${styles.bracelet__container} ${styles.img__left}`}
        ref={collarRef}
      >
        <div className={styles.bracelet__info}>
          <h2>Collar letras 3d</h2>
          <h3>
            El nombre de tu mascota en 3d impresión 3d incluye placa con QR
          </h3>

          <div className={styles.bracelet__actions}>
            <div className={styles.bracelet__actions__btns}>
              <button 
                id="collar__size" 
                className={`${styles.add__cart} ${selectedSizes.collar === "XXS-XS-S" ? styles.selected_btn : ""}`}
                onClick={() => updateSelectedSize("collar", "XXS-XS-S")}
              >
                Tallas XXS-XS-S 39.000$
              </button>
              <button 
                id="collar__size" 
                className={`${styles.add__cart} ${selectedSizes.collar === "M-L-XL" ? styles.selected_btn : ""}`}
                onClick={() => updateSelectedSize("collar", "M-L-XL")}
              >
                Tallas M-L-XL 49.000$
              </button>
              <button 
                className={styles.add__cart}
                onClick={() => sendWhatsAppMessage("collar")}
              >
                Comprar
              </button>
            </div>

            <div className={styles.quantity__selector}>
              <button
                className={styles.minus}
                onClick={() => updateQuantity("collar", -1)}
                disabled={quantities.collar <= 1}
              >
                -
              </button>
              <span className={styles.quantity}>{quantities.collar}</span>
              <button
                className={styles.plus}
                onClick={() => updateQuantity("collar", 1)}
                disabled={quantities.collar >= 99}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bracelet__image} style={{ paddingBottom: "2rem" }}>
          <img
            src="/Market/Pets/collar.webp"
            alt="Collar para mascotas con QR"
          />
        </div>
      </section>

      {/* Sección que muestra los tags */}
      <section
        id="tags"
        className={`${styles.bracelet__container} ${styles.img__left}`}
        ref={tagsRef}
      >
        <div className={styles.bracelet__info}>
          <h2>Tag en Silicona</h2>
          <h3>Placa en acero grabado con láser</h3>

          <div className={styles.bracelet__actions}>
            <div className={styles.bracelet__actions__btns}>
              <button className={styles.add__cart}>$45.000 cop</button>
              <button 
                className={styles.add__cart}
                onClick={() => sendWhatsAppMessage("tags")}
              >
                Comprar
              </button>
            </div>

            <div className={styles.quantity__selector}>
              <button
                className={styles.minus}
                onClick={() => updateQuantity("tags", -1)}
                disabled={quantities.tags <= 1}
              >
                -
              </button>
              <span className={styles.quantity}>{quantities.tags}</span>
              <button
                className={styles.plus}
                onClick={() => updateQuantity("tags", 1)}
                disabled={quantities.tags >= 99}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bracelet__image}>
          <img
            src="/Market/Pets/tags.webp"
            alt="Tag con QR"
            style={{ transform: "rotateZ(45deg)" }}
          />
        </div>
      </section>

      {/* Sección que muestra las medallas */}
      <section
        id="medals"
        className={`${styles.bracelet__container} ${styles.img__left}`}
        ref={medalsRef}
      >
        <div className={styles.bracelet__info}>
          <h2>Medalla en Acrilico</h2>
          <h3>Imagen personalizada y código QR</h3>

          <div className={styles.bracelet__actions}>
            <div className={styles.bracelet__actions__btns}>
              <button className={styles.add__cart}>$15.000 cop</button>
              <button 
                className={styles.add__cart}
                onClick={() => sendWhatsAppMessage("medals")}
              >
                Comprar
              </button>
            </div>

            <div className={styles.quantity__selector}>
              <button
                className={styles.minus}
                onClick={() => updateQuantity("medals", -1)}
                disabled={quantities.medals <= 1}
              >
                -
              </button>
              <span className={styles.quantity}>{quantities.medals}</span>
              <button
                className={styles.plus}
                onClick={() => updateQuantity("medals", 1)}
                disabled={quantities.medals >= 99}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bracelet__image}>
          <img src="/Market/Pets/medals.webp" alt="Medalla con QR" />
        </div>
      </section>

      {/* Sección que muestra las pecheras */}
      <section
        id="shirtfront"
        className={`${styles.bracelet__container} ${styles.img__left}`}
        ref={shirtfrontRef}
      >
        <div className={styles.bracelet__info}>
          <h2>Pechera 3d</h2>
          <h3>
            El nombre de tu mascota en 3d impresión 3d incluye placa con QR
          </h3>

          <div className={styles.bracelet__actions}>
            <div className={styles.bracelet__actions__btns}>
              <button 
                id="collar__size" 
                className={`${styles.add__cart} ${selectedSizes.shirtfront === "XXS-XS-S" ? styles.selected_btn : ""}`}
                onClick={() => updateSelectedSize("shirtfront", "XXS-XS-S")}
              >
                Tallas XXS-XS-S 89.000$
              </button>
              <button 
                id="collar__size" 
                className={`${styles.add__cart} ${selectedSizes.shirtfront === "M-L-XL" ? styles.selected_btn : ""}`}
                onClick={() => updateSelectedSize("shirtfront", "M-L-XL")}
              >
                Tallas M-L-XL 110.000$
              </button>
              <button 
                className={styles.add__cart}
                onClick={() => sendWhatsAppMessage("shirtfront")}
              >
                Comprar
              </button>
            </div>

            <div className={styles.quantity__selector}>
              <button
                className={styles.minus}
                onClick={() => updateQuantity("shirtfront", -1)}
                disabled={quantities.shirtfront <= 1}
              >
                -
              </button>
              <span className={styles.quantity}>{quantities.shirtfront}</span>
              <button
                className={styles.plus}
                onClick={() => updateQuantity("shirtfront", 1)}
                disabled={quantities.shirtfront >= 99}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bracelet__image}>
          <img
            src="/Market/Pets/shirtfront.webp"
            alt="Pechera para perros con QR"
            style={{ transform: "scale(1.5)" }}
          />
        </div>
      </section>

      <NavLink to="/market/health">
        <section className={`${styles.market__card} ${styles.health__card}`}>
          <div className={styles.product__info}>
            <img src="/Market/product-health.webp" alt="Producto Health" />
            <h1 className={styles.title}>
              PRODUCTOS
              <br />
              HEALTH
            </h1>
          </div>

          <div className={styles.bg__img}>
            <img src="/Market/health-home.webp" alt="Fondo Health" />
          </div>
        </section>
      </NavLink>
    </main>
  );
};

export default MarketPets;