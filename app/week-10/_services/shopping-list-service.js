import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export const getItems = async (userId) => {
    try {
      const items = [];
      const itemsCollectionRef = collection(db, "users", userId, "items");
      const querySnapshot = await getDocs(itemsCollectionRef);
  
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });  // Add document ID and data to items array
      });
  
      return items;
    } catch (error) {
      console.error("Error retrieving items:", error);
      throw error;  
    }
  };
  export const addItem = async (userId, item) => {
    try {
      const itemsCollectionRef = collection(db, "users", userId, "items");
      const docRef = await addDoc(itemsCollectionRef, item);  // Adds the item to Firestore
      return docRef.id;  // Returns the id of the newly created document
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;  
    }
  };
  