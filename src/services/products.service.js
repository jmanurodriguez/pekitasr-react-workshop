import productosData from '../data/productos.json';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const getAllProducts = async () => {
  try {
    return productosData;
  } catch (error) {
    throw error;
  }
};

export const createProductsFirestore = async (collectionName, products) => {
  try {
    // Verificar si products es un array
    if (!Array.isArray(products)) {
      console.error('Los productos deben ser un array');
      return;
    }

    const productsCollection = collection(db, collectionName);

    // Verificar si ya existen productos
    const querySnapshot = await getDocs(productsCollection);
    if (!querySnapshot.empty) {
      console.log('Los productos de prueba ya existen en Firestore');
      return;
    }

    // Crear los productos
    const promises = products.map(product => {
      return addDoc(productsCollection, product);
    });

    await Promise.all(promises);
    console.log('Productos creados exitosamente');
  } catch (error) {
    console.error('Error al crear productos de prueba:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const querySnapshot = await getDocs(productsCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};
