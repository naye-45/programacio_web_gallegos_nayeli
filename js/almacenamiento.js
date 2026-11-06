// almacenamiento.js
const CLAVE_ESTADO = 'app_pedidos_estado';

export function guardar(estado) {
    try {
        localStorage.setItem(CLAVE_ESTADO, JSON.stringify(estado));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

export function cargar() {
    try {
        const datos = localStorage.getItem(CLAVE_ESTADO);
        return datos ? JSON.parse(datos) : null;
    } catch (error) {
        console.error('Error al cargar de localStorage:', error);
        return null;
    }
}