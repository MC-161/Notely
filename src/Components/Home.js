import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import useFetch from "../useFetch";
import NoteList from "./NoteList";

const Home = () => {
  const { error, isPending, notes: notes } = useFetch()
  const {currentUser} = useAuth()
  return (
    <div className="home">
      {!currentUser && <Alert className="text-center" variant='primary'>SIGN UP / LOGIN</Alert>}
      { error && <div> {error} </div>}
      { currentUser && isPending && <div> loading ...</div>}
      { notes && <NoteList notes= {notes} />}
    </div>
  );
}
 
export default Home;