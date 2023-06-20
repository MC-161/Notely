import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { firestore, auth } from './firebase';

const useFetch = (id = 'default value') => {
  const [notes, setNotes] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const user = auth.currentUser;
        const userId = user.uid;
        const collectionName = `UserNotes_${userId}`; // Get the user-specific collection name

        if (id !== 'default value') {
          const documentRef = doc(firestore, collectionName, id);
          const docSnapshot = await getDoc(documentRef);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setNotes(data);
          } else {
            console.log('Document not found!');
            setNotes([]);
          }
        } else {
          const notesSnapshot = await getDocs(collection(firestore, collectionName));
          const fetchedNotes = notesSnapshot.docs.map((doc) => doc.data());
          setNotes(fetchedNotes);
          console.log(fetchedNotes)
        }

        setIsPending(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching notes: ', error);
        setIsPending(false);
        setError(error.message);
      }
    };

    if (auth.currentUser) {
      fetchNotes();
    }
  }, [id]);

  return { notes, isPending, error };
};

export default useFetch;
