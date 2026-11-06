// main.js · Punto de entrada: conecta los eventos y hace el primer dibujo.
// Aquí NO se calcula ni se dibuja nada: solo se coordina.

import { estado, agregar, quitar, cambiarCantidad, vaciar, registrarPedido } from "./estado.js";
import { calcularTotales, formatoDinero } from "./calculos.js";
import { render, renderCatalogo, renderResumen } from "./render.js";
import { guardar, cargar } from "./almacenamiento.js"; 

const inputBuscar = document.querySelector("#buscar");
const selectCategoria = document.querySelector("#categoria");
const contCatalogo = document.querySelector("#catalogo");
const listaCarrito = document.querySelector("#listaCarrito");
const selectEnvio = document.querySelector("#envio");
const btnVaciar = document.querySelector("#btnVaciar");
const btnConfirmar = document.querySelector("#btnConfirmar");
const mensaje = document.querySelector("#mensaje");

const estadoGuardado = cargar();
if (estadoGuardado) {
    // Si hay datos guardados, actualizamos las propiedades clave de tu objeto estado
    estado.carrito = estadoGuardado.carrito || [];
    estado.pedidos = estadoGuardado.pedidos || [];
    estado.envio = estadoGuardado.envio || estado.envio;
}

inputBuscar.addEventListener("input", () => {
  estado.busqueda = inputBuscar.value.trim();
  renderCatalogo();
});

selectCategoria.addEventListener("change", () => {
  estado.categoria = selectCategoria.value;
  renderCatalogo();
});

contCatalogo.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
  if (!boton) return;
  agregar(Number(boton.closest(".producto").dataset.id));
  mensaje.hidden = true;
  
  guardar(estado); //  Guardamos cada vez que se agrega un producto
  render();
});

listaCarrito.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
  if (!boton) return;
  const id = Number(boton.closest(".item").dataset.id);
  const accion = boton.dataset.accion;
  if (accion === "mas") cambiarCantidad(id, 1);
  if (accion === "menos") cambiarCantidad(id, -1);
  if (accion === "quitar") quitar(id);
  
  guardar(estado); //  Guardamos cada vez que se modifica el carrito
  render();
});

selectEnvio.addEventListener("change", () => {
  estado.envio = selectEnvio.value;
  guardar(estado); //  Guardamos si cambia el tipo de envío
  renderResumen();
});

btnVaciar.addEventListener("click", () => {
  vaciar();
  guardar(estado); //  Guardamos al vaciar
  render();
});

btnConfirmar.addEventListener("click", () => {
    
  const total = calcularTotales(estado.carrito, estado.envio).total;
  const numero = registrarPedido();
  mensaje.textContent = `✅ Pedido #${numero} confirmado por ${formatoDinero(total)}. ¡Gracias por tu compra!`;
  mensaje.hidden = false;
  
  guardar(estado); // Guardamos al confirmar (se limpia el carrito y se guarda el historial en el estado)
  render();
});

render(); // primer dibujo