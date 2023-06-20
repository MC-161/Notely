import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';

const createCollectionForUser = async () => {
  try {
    const user = auth.currentUser;
    const userId = user.uid;
    const collectionName = `UserNotes_${userId}`; // Create a unique collection name for each user

    const newCollectionRef = collection(firestore, collectionName);
    const newDocRef = doc(collection(firestore, collectionName));
    
    await setDoc(newDocRef, {
      id: newDocRef.id, // Document ID as a field
      title: 'WELCOME NOTE'
    });

    console.log('Collection created for user:', userId);
  } catch (error) {
    console.error('Error creating collection for user:', error);
  }
};

export default createCollectionForUser;