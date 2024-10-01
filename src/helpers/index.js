// src/helpers/index.js
import { db } from './../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';


export async function getAllProducts() {
  try {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);

    if (snapshot.empty) {
      console.error('No se encontraron productos en Firestore.');
      return [];
    }

    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;  
  } catch (err) {
    console.error('Error al obtener productos:', err);
    throw err;
  }
}


export async function createProductsFirestore(collectionName, products) {
  try {
    if (!Array.isArray(products)) {
      throw new Error("El parámetro products no es un array.");
    }

    const productsCollection = collection(db, collectionName);

    const addPromises = products.map((product) => {
      return addDoc(productsCollection, {
        ...product,
        createdAt: new Date(),
      });
    });

    await Promise.all(addPromises);

  } catch (err) {
    console.error('Error al almacenar productos:', err);
  }
}
