import productosData from '../data/productos.json';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';


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
  
      for (const product of products) {
        
        const q = query(productsCollection, where("id", "==", product.id));
        const querySnapshot = await getDocs(q);
  
        
        if (querySnapshot.empty) {
          await addDoc(productsCollection, {
            ...product,
            createdAt: new Date(),
          });
          
        } else {
          console.log(`Product with id ${product.id} already exists in the collection.`);
        }
      }
  
    } catch (err) {
      console.error('Error al almacenar productos:', err);
    }
  };
