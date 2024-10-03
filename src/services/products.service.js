import productosData from '../data/productos.json';
import { db } from '../firebase';
import { collection, doc, setDoc, getDoc, writeBatch } from 'firebase/firestore';

export const getAllProducts = async () => {
  try {
    return productosData;
  } catch (error) {
    throw error;
  }
};

export const createProductsFirestore = async (collectionName, products) => {
  try {
    const productsCollection = collection(db, collectionName);
    const batch = writeBatch(db);
    let addedCount = 0;
    let existingCount = 0;

    for (const product of products) {
      if (!product.id || !product.nombre || product.precio === undefined) {
        continue;
      }

      const productId = product.id.toString();
      const productDocRef = doc(productsCollection, productId);
      const docSnapshot = await getDoc(productDocRef);

      if (!docSnapshot.exists()) {
        batch.set(productDocRef, {
          ...product,
          createdAt: new Date(),
        });
        addedCount++;
      } else {
        existingCount++;
      }
    }

    await batch.commit();
  } catch (err) {
    throw err;
  }
};
