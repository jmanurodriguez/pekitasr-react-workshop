// src/mock/async-mocks.js

import productosData from '../data/productos.json';

// Simula una solicitud para obtener todos los productos
export const getProductos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productosData);
    }, 1000); // Simulación de un retraso de 1 segundo
  });
};

// Simula una solicitud para obtener los detalles de un producto por su ID
export const getProductoById = (id) => {
  return new Promise((resolve, reject) => {
    const producto = productosData.find((prod) => prod.id === id);
    setTimeout(() => {
      if (producto) {
        resolve(producto);
      } else {
        reject('Producto no encontrado');
      }
    }, 1000);
  });
};
