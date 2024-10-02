import productosData from '../data/productos.json';
import { db } from '../firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';


export const getAllProducts = async () => {
  try {
    return productosData; 
  } catch (error) {
    console.error('Error al obtener productos', error);
    throw error;
  }
};


export const createProductsFirestore = async (collectionName, products) => {
  try {
    const productsCollection = collection(db, collectionName);
    let addedCount = 0; 

    for (const product of products) {
      if (!product.id) {
        console.warn(`Producto sin ID: ${JSON.stringify(product)}`);
        continue;
      }

     
      const productId = product.id.toString();


      const productDocRef = doc(productsCollection, productId);
      const docSnapshot = await getDoc(productDocRef);

     
      if (!docSnapshot.exists()) {
        await setDoc(productDocRef, {
          ...product,
          createdAt: new Date(),
        });
        console.log(`Producto ${product.nombre} añadido a Firestore con ID ${productId}.`);
        addedCount++;
      } else {
        console.log(`Producto ${product.nombre} ya existe en Firestore con ID ${productId}.`);
      }
    }

    console.log(`Proceso de verificación y carga completado. Productos añadidos: ${addedCount}`);
  } catch (err) {
    console.error('Error al almacenar productos:', err);
  }
};
