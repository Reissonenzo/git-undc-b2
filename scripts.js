let currentIndex = 0;
const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".dot");
let isDragging = false;
let startX = 0;
let moveX = 0;
let autoSlide;

/* Función para mostrar la imagen con animación */
function showSlide(index, instant = false) {
  slides.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
  slides.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;

  // Actualizar botones activos
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index % 2].classList.add("active"); // Solo 2 botones

  // Reiniciar el temporizador automático
  resetAutoSlide();
}

/* Función para pasar a la siguiente imagen con bucle */
function nextSlide() {
  if (currentIndex >= 1) {
    showSlide(0);
  } else {
    showSlide(currentIndex + 1);
  }
}

/* Habilitar arrastre con el mouse */
slides.addEventListener("mousedown", (event) => {
  isDragging = true;
  startX = event.clientX;
  slides.style.transition = "none";
  slides.style.cursor = "grabbing";
});

slides.addEventListener("mousemove", (event) => {
  if (!isDragging) return;
  moveX = event.clientX - startX;
  slides.style.transform = `translateX(${
    moveX - currentIndex * slides.clientWidth
  }px)`;
});

slides.addEventListener("mouseup", () => {
  isDragging = false;
  slides.style.transition = "transform 0.5s ease-in-out";
  slides.style.cursor = "grab";

  if (moveX < -50) nextSlide();
  else if (moveX > 50) showSlide(currentIndex === 0 ? 1 : 0);
  else showSlide(currentIndex);
});

slides.addEventListener("mouseleave", () => {
  isDragging = false;
  slides.style.cursor = "grab";
  showSlide(currentIndex);
});

/* Se desactiva el evento de clic */
slides.addEventListener("click", (event) => {
  event.preventDefault();
});

/* Configurar transición automática cada 5 segundos */
function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

/* Iniciar */
document.addEventListener("DOMContentLoaded", () => {
  showSlide(0);
  startAutoSlide();
});
/* Categorias */
const categorias = document.querySelectorAll(".categoria");
const categoriasTitle = document.getElementById("categorias-title");

categorias.forEach((categoria) => {
  categoria.addEventListener("mouseenter", () => {
    categoriasTitle.innerHTML = "CATEGORÍAS →";
  });

  categoria.addEventListener("mouseleave", () => {
    categoriasTitle.innerHTML = "CATEGORÍAS";
  });
});

function cargarPagina(pagina) {
  const contenido = document.getElementById("contenido");

  // Realizar la petición con Fetch API
  fetch(pagina)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar la página: " + response.statusText);
      }
      return response.text();
    })
    .then((html) => {
      contenido.innerHTML = html; // Reemplaza solo el contenido sin recargar
    })
    .catch((error) => console.error("Error al cargar la página:", error));
}
function cargarFormulario(accion) {
  fetch(`formularios/${accion}.php`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("formulario-container").innerHTML = html;
    });
}
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formAgregarProducto")
    .addEventListener("submit", function (e) {
      e.preventDefault(); // Evita la recarga de la página

      let formData = new FormData(this);

      fetch("../backend/procesar_agregarproducto.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          let mensaje = document.getElementById("mensaje");
          if (data.success) {
            mensaje.innerHTML =
              "<p style='color: green;'>Producto añadido correctamente.</p>";
            this.reset();
          } else {
            mensaje.innerHTML =
              "<p style='color: red;'>Error: " + data.error + "</p>";
          }
        })
        .catch((error) => console.error("Error:", error));
    });
});
document.addEventListener("DOMContentLoaded", function () {
  const activarRebaja = document.getElementById("activarRebaja");
  const precioRebajado = document.getElementById("precioRebajado");

  activarRebaja.addEventListener("change", function () {
    precioRebajado.disabled = !this.checked;
    if (!this.checked) {
      precioRebajado.value = ""; // Limpiar el campo si se desactiva
    }
  });
});
