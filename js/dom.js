// dom.js · Ayudante reutilizable para crear elementos en una sola línea

export function crearElemento(etiqueta, { clase, texto, datos, atributos } = {}) {
  const el = document.createElement(etiqueta);
  if (clase) el.classList.add(...clase.split(" "));
  if (texto !== undefined) el.textContent = texto;
  if (datos) {
    for (const [clave, valor] of Object.entries(datos)) {
      el.dataset[clave] = valor;
    }
  }
  // NUEVO: Esto permite asignar atributos como src, alt, referrerpolicy, etc.
  if (atributos) {
    for (const [clave, valor] of Object.entries(atributos)) {
      el.setAttribute(clave, valor);
    }
  }
  if (etiqueta === "button") el.type = "button";
  return el;
}