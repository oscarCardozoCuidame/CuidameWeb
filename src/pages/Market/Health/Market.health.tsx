import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Market.health.module.css";

// Utilidad para enviar mensajes de WhatsApp
const sendWhatsAppMessage = (
  phoneNumber: string, 
  productInfo: { 
    name: string, 
    color: string, 
    plateColor?: string, 
    quantity: number, 
    price: string 
  }
) => {
  // Formatear el mensaje
  const message = `Hola, estoy interesado en adquirir el siguiente producto:\n\n*${productInfo.name}*\nColor: ${productInfo.color}${productInfo.plateColor ? `\nColor de placa: ${productInfo.plateColor}` : ""}\nCantidad: ${productInfo.quantity}\nPrecio: ${productInfo.price}\n\n¿Podrían darme más información?`;
  
  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);
  
  // Crear el enlace de WhatsApp
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Abrir en una nueva pestaña
  window.open(whatsappLink, '_blank');
};

interface SectionConfig {
  id: string;
  min: number;
  max: number;
}

// Interfaces para los datos de productos
interface SelectedColors {
  bracelet: string;
  plate: string;
  bicolor?: string;
  kids?: string;
}

const MarketHealth: React.FC = () => {
  // Estado para la imagen del brazalete actual
  const [currentBraceletImage, setCurrentBraceletImage] = useState(
    "/Market/Health/Bracelet/yellow-bracelet.webp"
  );
  const [quantities, setQuantities] = useState({
    bracelets: 1,
    tags: 1,
    kids: 1,
  });
  // Estado para los colores seleccionados
  const [selectedColors, setSelectedColors] = useState<SelectedColors>({
    bracelet: "Amarillo",
    plate: "Placa Menta",
    bicolor: "",
    kids: "Rojo",
  });

  // Referencias a elementos DOM
  const braceletsRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const kidsRef = useRef<HTMLDivElement>(null);

  // Mapeo de colores a imágenes
  const colorToImage = {
    yellow: "/Market/Health/Bracelet/yellow-bracelet.webp",
    grey: "/Market/Health/Bracelet/grey-bracelet.webp",
    black: "/Market/Health/Bracelet/black-bracelet.webp",
    pink: "/Market/Health/Bracelet/pink-bracelet.webp",
    red: "/Market/Health/Bracelet/red-bracelet.webp",
    lilac: "/Market/Health/Bracelet/lilac-bracelet.webp",
    green: "/Market/Health/Bracelet/green-bracelet.webp",
    blue: "/Market/Health/Bracelet/blue-bracelet.webp",

    // Bicolores
    "black-blue": "/Market/Health/Bracelet/blue-line-bracelet.webp",
    "pink-white": "/Market/Health/Bracelet/pink-line-bracelet.webp",
    "black-green": "/Market/Health/Bracelet/green-line-bracelet.webp",
    "black-yellow": "/Market/Health/Bracelet/yellow-line-bracelet.webp",
    "black-lilac": "/Market/Health/Bracelet/lilac-line-bracelet.webp",
    "black-red": "/Market/Health/Bracelet/red-line-bracelet.webp",
  };

  // Función para actualizar la imagen según el color seleccionado
  const handleColorButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    containerClassName: string
  ) => {
    const button = event.currentTarget;
    // Necesitamos adaptar esto para CSS Modules
    const parentContainer = button.closest(`[data-container="${containerClassName}"]`);

    if (parentContainer) {
      // Eliminar active de todos los botones en el contenedor
      parentContainer.querySelectorAll(`.${styles.color__btn}`).forEach((btn) => {
        btn.classList.remove("active");
      });

      // Añadir active al botón seleccionado
      button.classList.add("active");
      
      // Guardar el color seleccionado
      const colorName = button.getAttribute('aria-label') || "";
      
      // Actualizar el estado según el contenedor
      if (containerClassName === "bracelet__colors") {
        setSelectedColors(prev => ({ ...prev, bracelet: colorName }));
        localStorage.setItem("selectedBraceletColor", colorName);
      } else if (containerClassName === "bicolor") {
        setSelectedColors(prev => ({ ...prev, bicolor: colorName }));
        localStorage.setItem("selectedBicolorBracelet", colorName);
      } else if (containerClassName === "plate__colors") {
        setSelectedColors(prev => ({ ...prev, plate: colorName }));
        localStorage.setItem("selectedPlateColor", colorName);
      } else if (containerClassName === "bracelet__kids__colors") {
        setSelectedColors(prev => ({ ...prev, kids: colorName }));
        localStorage.setItem("selectedKidsColor", colorName);
      }

      // Actualizar imagen si estamos en bracelet__colors o bicolor
      if (
        containerClassName === "bracelet__colors" ||
        containerClassName === "bicolor"
      ) {
        // Convertir el aria-label a una clave compatible con nuestro objeto colorToImage
        let colorKey = colorName.toLowerCase();
        
        // Para colores compuestos como "Negro y Azul", convertirlos a formato "black-blue"
        if (colorName && colorName.includes(" y ")) {
          const parts = colorName.split(" y ");
          const firstColor = mapSpanishToEnglish(parts[0]);
          const secondColor = mapSpanishToEnglish(parts[1]);
          colorKey = `${firstColor}-${secondColor}`;
        } else {
          colorKey = mapSpanishToEnglish(colorName);
        }
        
        // Buscar la imagen correspondiente
        if (colorKey && colorToImage[colorKey as keyof typeof colorToImage]) {
          setCurrentBraceletImage(
            colorToImage[colorKey as keyof typeof colorToImage]
          );
          localStorage.setItem("currentBraceletImage", colorToImage[colorKey as keyof typeof colorToImage]);
        }
      }
    }
  };

  // Función auxiliar para mapear nombres en español a las claves en inglés
  function mapSpanishToEnglish(spanishColor: string): string {
    const colorMap: {[key: string]: string} = {
      'amarillo': 'yellow',
      'gris': 'grey',
      'negro': 'black',
      'rosa': 'pink',
      'rojo': 'red',
      'lila': 'lilac',
      'verde': 'green',
      'azul': 'blue',
      'blanco': 'white'
    };
    
    return colorMap[spanishColor.toLowerCase()] || spanishColor.toLowerCase();
  }

  // Función para actualizar cantidad
  const updateQuantity = (sectionId: string, change: number) => {
    setQuantities((prev) => {
      const sectionKey = sectionId as keyof typeof prev;
      const currentValue = prev[sectionKey];
      const sections: SectionConfig[] = [
        { id: "bracelets", min: 1, max: 99 },
        { id: "tags", min: 1, max: 99 },
        { id: "kids", min: 1, max: 99 },
      ];

      const section = sections.find((s) => s.id === sectionId);
      if (!section) return prev;

      let newValue = currentValue + change;
      if (newValue < section.min) newValue = section.min;
      if (newValue > section.max) newValue = section.max;

      // Guardar en localStorage para persistencia
      localStorage.setItem(`quantity_${sectionId}`, newValue.toString());

      return {
        ...prev,
        [sectionKey]: newValue,
      };
    });
  };

  // Cargar valores guardados del localStorage al iniciar
  useEffect(() => {
    const sections = ["bracelets", "tags", "kids"];

    sections.forEach((section) => {
      const savedValue = localStorage.getItem(`quantity_${section}`);
      if (savedValue) {
        setQuantities((prev) => ({
          ...prev,
          [section]: parseInt(savedValue, 10),
        }));
      }
    });
    
    // Cargar colores seleccionados guardados
    const savedBraceletColor = localStorage.getItem("selectedBraceletColor");
    const savedBicolorBracelet = localStorage.getItem("selectedBicolorBracelet");
    const savedPlateColor = localStorage.getItem("selectedPlateColor");
    const savedKidsColor = localStorage.getItem("selectedKidsColor");
    const savedBraceletImage = localStorage.getItem("currentBraceletImage");
    
    // Actualizar estado con colores guardados
    setSelectedColors(prev => ({
      bracelet: savedBraceletColor || prev.bracelet,
      bicolor: savedBicolorBracelet || prev.bicolor,
      plate: savedPlateColor || prev.plate,
      kids: savedKidsColor || prev.kids
    }));
    
    // Restaurar imagen del brazalete guardada
    if (savedBraceletImage) {
      setCurrentBraceletImage(savedBraceletImage);
    }
    
    // Aplicar "active" class a los botones correspondientes (después de que el DOM esté listo)
    setTimeout(() => {
      // Para brazaletes unicolor
      if (savedBraceletColor) {
        const braceletContainer = document.querySelector('[data-container="bracelet__colors"]');
        if (braceletContainer) {
          braceletContainer.querySelectorAll(`.${styles.color__btn}`).forEach(btn => {
            if (btn.getAttribute('aria-label') === savedBraceletColor) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        }
      }
      
      // Para brazaletes bicolor
      if (savedBicolorBracelet) {
        const bicolorContainer = document.querySelector('[data-container="bicolor"]');
        if (bicolorContainer) {
          bicolorContainer.querySelectorAll(`.${styles.color__btn}`).forEach(btn => {
            if (btn.getAttribute('aria-label') === savedBicolorBracelet) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        }
      }
      
      // Para color de placas
      if (savedPlateColor) {
        const plateContainers = document.querySelectorAll('[data-container="plate__colors"]');
        plateContainers.forEach(container => {
          container.querySelectorAll(`.${styles.color__btn}`).forEach(btn => {
            if (btn.getAttribute('aria-label') === savedPlateColor) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        });
      }
      
      // Para colores de niños
      if (savedKidsColor) {
        const kidsContainer = document.querySelector('[data-container="bracelet__kids__colors"]');
        if (kidsContainer) {
          kidsContainer.querySelectorAll(`.${styles.color__btn}`).forEach(btn => {
            if (btn.getAttribute('aria-label') === savedKidsColor) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        }
      }
    }, 100); // Pequeño retraso para asegurar que el DOM esté listo
  }, []);

  return (
    <main className={styles.market__health}>
      <h1 className={styles.initial__title}>PRODUCTOS</h1>
      <h3 className={styles.initial__subtitle}>
        Nuestra plataforma le permite tomar el control de su salud con
        soluciones innovadoras y personalizadas.
      </h3>

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

      <section className={styles.products__health}>
        <div className={styles.qr__info}>
          <div className={styles.qr__img__container}>
            <img src="/Market/Health/qr-black.webp" alt="qr" />
            <img src="/Market/Health/qr-white.webp" alt="qr" />
          </div>
          <div className={styles.qr__info__container}>
            <p>
              Nuestros productos están potenciados por un Código QR único para
              cada usuario grabado en laser sobre placas de acero inoxidable.
            </p>
            <ul>
              <p style={{ marginLeft: "-2.5rem", marginBottom: "1rem" }}>
                Disponibles en colores:
              </p>
              <li>Acero natural.</li>
              <li>Negro.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sección que muestra los brazaletes */}
      <section
        id="bracelets"
        className={`${styles.bracelet__container} ${styles.img__right}`}
        ref={braceletsRef}
      >
        <div className={styles.bracelet__info}>
          <h2>Brazaletes en silicona</h2>
          <h3>Placa en acero grabado con láser</h3>

          <div className={styles.color__selector}>
            <h3>Selecciona tu color favorito:</h3>
            <div 
              className={styles.bracelet__colors}
              data-container="bracelet__colors"
            >
              <button
                className={`${styles.color__btn} ${styles.yellow} active`}
                aria-label="Amarillo"
                onClick={(e) => handleColorButtonClick(e, "bracelet__colors")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles.grey}`}
                aria-label="Gris"
                onClick={(e) => handleColorButtonClick(e, "bracelet__colors")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles.black}`}
                aria-label="Negro"
                onClick={(e) => handleColorButtonClick(e, "bracelet__colors")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles.pink}`}
                aria-label="Rosa"
                onClick={(e) => handleColorButtonClick(e, "bracelet__colors")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles.red}`}
                aria-label="Rojo"
                onClick={(e) => handleColorButtonClick(e, "bracelet__colors")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles.lilac}`}
                aria-label="Lila"
                onClick={(e) => handleColorButtonClick(e, "bracelet__colors")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles.green}`}
                aria-label="Verde"
                onClick={(e) => handleColorButtonClick(e, "bracelet__colors")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles.blue}`}
                aria-label="Azul"
                onClick={(e) => handleColorButtonClick(e, "bracelet__colors")}
              ></button>
            </div>

            <div 
              className={`${styles.bracelet__colors} ${styles.bicolor}`}
              data-container="bicolor"
            >
              <button
                className={`${styles.color__btn} ${styles["black-blue"]}`}
                aria-label="Negro y Azul"
                onClick={(e) => handleColorButtonClick(e, "bicolor")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles["pink-white"]}`}
                aria-label="Rosa y Blanco"
                onClick={(e) => handleColorButtonClick(e, "bicolor")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles["black-green"]}`}
                aria-label="Negro y Verde"
                onClick={(e) => handleColorButtonClick(e, "bicolor")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles["black-yellow"]}`}
                aria-label="Negro y Amarillo"
                onClick={(e) => handleColorButtonClick(e, "bicolor")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles["black-lilac"]}`}
                aria-label="Negro y Lila"
                onClick={(e) => handleColorButtonClick(e, "bicolor")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles["black-red"]}`}
                aria-label="Negro y Rojo"
                onClick={(e) => handleColorButtonClick(e, "bicolor")}
              ></button>
            </div>
          </div>

          <div className={styles.plate__selector}>
            <h3>Selecciona color de la placa:</h3>
            <div 
              className={styles.plate__colors}
              data-container="plate__colors"
            >
              <button
                className={`${styles.color__btn} ${styles.grey} active`}
                aria-label="Placa Menta"
                onClick={(e) => handleColorButtonClick(e, "plate__colors")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles.black}`}
                aria-label="Placa Negra"
                onClick={(e) => handleColorButtonClick(e, "plate__colors")}
              ></button>
            </div>
          </div>

          <div className={styles.bracelet__price}>
            <p>$65.000 cop</p>
          </div>

          <div className={styles.bracelet__actions}>
            <button 
              className={styles.add__cart}
              onClick={() => 
                sendWhatsAppMessage(
                  "+573007306645",
                  {
                    name: "Brazalete en silicona",
                    color: selectedColors.bicolor || selectedColors.bracelet,
                    plateColor: selectedColors.plate,
                    quantity: quantities.bracelets,
                    price: "$65.000 cop"
                  }
                )
              }
            >
              Comprar
            </button>
            <div className={styles.quantity__selector}>
              <button
                className={styles.minus}
                onClick={() => updateQuantity("bracelets", -1)}
                disabled={quantities.bracelets <= 1}
              >
                -
              </button>
              <span className={styles.quantity}>{quantities.bracelets}</span>
              <button
                className={styles.plus}
                onClick={() => updateQuantity("bracelets", 1)}
                disabled={quantities.bracelets >= 99}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className={styles.bracelet__image}>
          <img src={currentBraceletImage} alt="Brazalete de silicona con QR" />
          <div className={styles.brand__logo}>
            <img src="/logo/CuidamePurple.svg" alt="Logo Cuidame Health" />
          </div>
        </div>
      </section>

      {/* Sección que muestra los Tags */}
      <section
        id="tags"
        className={`${styles.bracelet__container} ${styles.img__left}`}
        ref={tagsRef}
      >
        <div className={styles.bracelet__info}>
          <h2>Tags en silicona</h2>
          <h3>Placa en acero grabado con láser</h3>

          <div className={styles.plate__selector}>
            <h3>Selecciona color de la placa:</h3>
            <div 
              className={styles.plate__colors}
              data-container="plate__colors"
            >
              <button
                className={`${styles.color__btn} ${styles.red} active`}
                aria-label="Rojo"
                onClick={(e) => handleColorButtonClick(e, "plate__colors")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles.black}`}
                aria-label="Negro"
                onClick={(e) => handleColorButtonClick(e, "plate__colors")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles.white}`}
                aria-label="Blanco"
                onClick={(e) => handleColorButtonClick(e, "plate__colors")}
              ></button>
              <button
                className={`${styles.color__btn} ${styles.pink}`}
                aria-label="Rosa"
                onClick={(e) => handleColorButtonClick(e, "plate__colors")}
              ></button>
            </div>
          </div>

          <div className={styles.bracelet__price}>
            <p>$45.000 cop</p>
          </div>

          <div className={styles.bracelet__actions}>
            <button 
              className={styles.add__cart}
              onClick={() => 
                sendWhatsAppMessage(
                  "+573007306645",
                  {
                    name: "Tag en silicona",
                    color: "Tag",
                    plateColor: selectedColors.plate,
                    quantity: quantities.tags,
                    price: "$45.000 cop"
                  }
                )
              }
            >
              Comprar
            </button>
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
          <img src="/Market/Health/qr-tag.webp" alt="Tag con QR" />
        </div>
      </section>

      {/* Sección que muestra los brazaletes para niños */}
      <section
        id="kids"
        className={`${styles.bracelet__container} ${styles.img__right}`}
        ref={kidsRef}
      >
        <div className={styles.bracelet__info}>
          <h2>Brazaletes en silicona niños</h2>
          <h3>Tiernos diseños para los más pequeños</h3>

          <div className={styles.color__selector}>
            <h3>Colores disponibles:</h3>
            <div 
              className={styles.bracelet__kids__colors}
              data-container="bracelet__kids__colors"
            >
              <button
                style={{
                  background: "url(/Market/Health/Kids/red-color.webp)",
                }}
                className={`${styles.color__btn} ${styles.red} active`}
                aria-label="Rojo"
                onClick={(e) =>
                  handleColorButtonClick(e, "bracelet__kids__colors")
                }
              ></button>
              <button
                style={{
                  background: "url(/Market/Health/Kids/blue-color.webp)",
                }}
                className={`${styles.color__btn} ${styles.blue}`}
                aria-label="Azul"
                onClick={(e) =>
                  handleColorButtonClick(e, "bracelet__kids__colors")
                }
              ></button>
              <br />
              <button
                style={{
                  background: "url(/Market/Health/Kids/pink-color.webp)",
                }}
                className={`${styles.color__btn} ${styles.pink}`}
                aria-label="Rosa"
                onClick={(e) =>
                  handleColorButtonClick(e, "bracelet__kids__colors")
                }
              ></button>
            </div>
          </div>

          <div className={styles.bracelet__price}>
            <p>$55.000 cop</p>
          </div>

          <div className={styles.bracelet__actions}>
            <button 
              className={styles.add__cart}
              onClick={() => 
                sendWhatsAppMessage(
                  "+573007306645",
                  {
                    name: "Brazalete en silicona para niños",
                    color: selectedColors.kids || "",
                    quantity: quantities.kids,
                    price: "$55.000 cop"
                  }
                )
              }
            >
              Comprar
            </button>
            <div className={styles.quantity__selector}>
              <button
                className={styles.minus}
                onClick={() => updateQuantity("kids", -1)}
                disabled={quantities.kids <= 1}
              >
                -
              </button>
              <span className={styles.quantity}>{quantities.kids}</span>
              <button
                className={styles.plus}
                onClick={() => updateQuantity("kids", 1)}
                disabled={quantities.kids >= 99}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className={styles.bracelet__image}>
          <img
            src="/Market/Health/qr-kids.webp"
            alt="Tag de silicona con lindos diceños para niños"
          />
          <div className={styles.brand__logo}>
            <img src="/logo/CuidamePurple.svg" alt="Logo Cuidame Health" />
          </div>
        </div>
      </section>

      <NavLink to="/market/pets">
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
      </NavLink>
    </main>
  );
};

export default MarketHealth;