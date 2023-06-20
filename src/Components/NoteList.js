import { Link } from "react-router-dom";
const NoteList = ({notes}) => {
  return (
    <div className="note-list">
      {notes.map(note => (
        <div className="note-preview" key={note.id}>
          <Link to={`/notes/${note.id}`}>
            <h2>{note.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default NoteList;