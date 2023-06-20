import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const {currentUser} = useAuth()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const user = auth.currentUser;
      const userId = user.uid;
      const collectionName = `UserNotes_${userId}`
      const newDocRef = doc(collection(firestore, collectionName));
      setAuthor(currentUser)
      
      await setDoc(newDocRef, {
        id: newDocRef.id, // Document ID as a field
        title,
        body,
        author
      });

      console.log('Document added with ID:', newDocRef.id);
      setIsPending(false);
      navigate('/'); // Redirect to the home page or the desired route after adding the note
    } catch (error) {
      console.error('Error adding document:', error);
      setIsPending(false);
    }
  };

  return (
    <div className="create">
      <h2>Add a new note</h2>
      <form onSubmit={handleSubmit}>
        <label>Note Title:</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Note Body:</label>
        <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        {!isPending && <button>Add NOTE</button>}
        {isPending && <button disabled>Adding NOTE...</button>}
      </form>
    </div>
  );
};

export default Create;