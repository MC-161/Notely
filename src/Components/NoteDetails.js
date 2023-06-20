import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import useFetch from "../useFetch";
import { Button } from "react-bootstrap";
import { auth } from "../firebase";

const NoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes: note, error, isPending } = useFetch(id);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const user = auth.currentUser;
      const userId = user.uid;
      const collectionName = `UserNotes_${userId}`
      const noteRef = doc(firestore, collectionName, id);
      await deleteDoc(noteRef);

      console.log("Note deleted successfully");
      navigate("/"); // Redirect to the home page or the desired route after deleting the note
    } catch (error) {
      console.error("Error deleting note:", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="note-details">
      {isPending && <div>Loading ... </div>}
      {error && <div>{error}</div>}
      {note && (
        <article>
          <h2>{note.title}</h2>
          <p>Author: {note.author}</p>
          <div className="note_body">{note.body}</div>

          {/* Delete button */}
          {!isDeleting && (
            <Button onClick={handleDelete}>Delete Note</Button>
          )}
          {isDeleting && (
            <Button disabled>Deleting Note...</Button>
          )}
        </article>
      )}
    </div>
  );
};

export default NoteDetails;
