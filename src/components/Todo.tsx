import { useState, ChangeEvent } from "react";
import "./css/Todo.css";
import { useSelector } from "react-redux";
import { NotesState } from "../reducers/reducer";
import { capitalizeFirstLetter } from "../customHooks/StringCapitalize";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface NewNoteProps {
  addNote(note: string): void;
}

const Todo = ({ addNote }: NewNoteProps) => {
  const [note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const notes = useSelector<NotesState, NotesState["notes"]>((state) => {
    return state.notes;
  });

  const updateNote = (event: ChangeEvent<HTMLInputElement>) => {
    setNote(capitalizeFirstLetter(event.target.value));
  };

  const onAddNoteClick = () => {
    if (note === "") {
      setError(true);
      setErrorMessage("Please enter some note");
    } else if (notes.includes(capitalizeFirstLetter(note))) {
      setErrorMessage("This note alread exist in the list");
      setError(true);
    } else {
      setError(false);
      addNote(capitalizeFirstLetter(note));
      setNote("");
    }
  };

  return (
    <Container
      sx={{
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        width: {
          xl: "500px",
          lg: "500px",
          md: "500px",
          sm: "500px",
          xs: "100%",
        },
        display: "flex",
        padding: "1rem",
        top: "0",
        background: "white",
        boxShadow: "0 5px 4px -6px black",
        position: "fixed",
        zIndex: 2,
      }}
    >
      <TextField
        error={error}
        sx={{
          width: {
            xl: "300px",
            lg: "300px",
            md: "300px",
            sm: "300px",
            xs: "100%",
          },
        }}
        id="standard-input-note"
        label="Add Note"
        variant="standard"
        name={note}
        value={note}
        helperText={error ? errorMessage : ""}
        onChange={updateNote}
        onBlur={(e) => {
          if (e.target.value === "" || e.target.value) {
            setError(false);
          }
        }}
        color="success"
        onKeyPress={(e) => e.key === "Enter" && onAddNoteClick()}
      />
      <AddCircleIcon
        color="success"
        sx={{ fontSize: "1.5rem", cursor: "pointer" }}
        onClick={onAddNoteClick}
      />
    </Container>
  );
};

export default Todo;
