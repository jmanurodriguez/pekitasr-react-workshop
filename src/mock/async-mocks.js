// src/mock/async-mocks.js

import productosData from '../data/productos.json';

// Simula una solicitud para obtener todos los productos
export const getProductos = (simulateError = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) {
        reject('Error en la solicitud de productos');
      } else {
        resolve(productosData);
      }
    }, 1000);
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
        reject({ error: true, message: 'Producto no encontrado' });
      }
    }, 1000);
  });
};
