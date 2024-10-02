// src/services/products.service.js
import productosData from '../data/productos.json';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Obtener todos los productos desde productos.json
export const getAllProducts = async () => {
  try {
    return productosData; // Retorna los productos desde productos.json
  } catch (error) {
    console.error('Error al obtener productos', error);
    throw error;
  }
};

// Función para añadir productos a Firestore verificando duplicados por 'id'
export const createProductsFirestore = async (collectionName, products) => {
    try {
      const productsCollection = collection(db, collectionName);
  
      for (const product of products) {
        // Crear una query para verificar si el producto ya existe en Firestore por 'id'
        const q = query(productsCollection, where("id", "==", product.id));
        const querySnapshot = await getDocs(q);
  
        // Si no existe, lo agregamos a Firestore
        if (querySnapshot.empty) {
          await addDoc(productsCollection, {
            ...product,
            createdAt: new Date(),
          });
          console.log(`Producto ${product.nombre} añadido a Firestore.`);
        } else {
          console.log(`Producto ${product.nombre} ya existe en Firestore.`);
        }
      }
  
      console.log('Proceso de verificación y carga completado.');
    } catch (err) {
      console.error('Error al almacenar productos:', err);
    }
  };
  