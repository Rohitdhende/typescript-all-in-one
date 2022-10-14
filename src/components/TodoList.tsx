import { useState } from "react";
import { useSelector } from "react-redux";
import { NotesState } from "../reducers/reducer";
import "./css/TodoList.css";
import { capitalizeFirstLetter } from "../customHooks/StringCapitalize";
import Tooltip from '@mui/material/Tooltip';
import {
  Delete as DeleteIcon,
  StrikethroughS as StrikethroughSIcon,
} from "@mui/icons-material";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Container,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grow,
} from "@mui/material";

interface NewNoteProps {
  deleteNote: Function;
}

const TodoList = ({ deleteNote }: NewNoteProps) => {
  const notes = useSelector<NotesState, NotesState["notes"]>((state) => {
    return state.notes;
  });

  const [strikedNotes, setStrikedNotes] = useState<string[]>([]);

  const onDeleteNote = (note: string) => {
    if (notes.includes(note)) {
      deleteNote(note);
    } else {
      alert("The entered note doesn't exist to delete");
    }
  };
  const onStrikeNode = (note: string) => {
    if (strikedNotes.length >= 0) {
      if (!strikedNotes.includes(capitalizeFirstLetter(note))) {
        setStrikedNotes([...strikedNotes, note]);
      } else {
        if (notes.includes(capitalizeFirstLetter(note))) {
          setStrikedNotes((notes) =>
            notes.filter((noteData) => {
              return noteData !== note;
            })
          );
        }
      }
    }
  };
  const [selectedNote, setSelectedNote] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = (note: string) => {
    setOpen(true);
    setSelectedNote(note);
  };
  const handleAgree = () => {
    onDeleteNote(selectedNote);
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="todo-list-parent">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>
            {"Are you sure you want to delete this note"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Container>
        {notes?.map((note, index) => {
          return (
            <Grow
              key={index}
              in
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: 500 }}
            >
              <Card
                className="note-parent"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: `${
                    strikedNotes.includes(note) ? "#f5f5f5" : ""
                  }`,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    className={`${
                      strikedNotes.includes(note) ? "strike" : ""
                    }`}
                  >
                    {note}
                  </Typography>
                </CardContent>
                <CardActions>
                <Tooltip title="Delete">
                  <DeleteIcon
                    onClick={() => {
                      handleClickOpen(note);
                    }}
                    sx={{
                      cursor: "pointer",
                      color: "#313639",
                      "&:hover": {
                        color: "red",
                      },
                    }}
                  />
                  </Tooltip>
                  <Tooltip title="Strike Note">
                  <StrikethroughSIcon
                    sx={{
                      color: strikedNotes.includes(note) ? "pink" : "#313639",
                      cursor: "pointer",
                      "&:hover": {
                        color: strikedNotes.includes(note) ? "#313639" : "pink",
                      },
                    }}
                    onClick={() => {
                      onStrikeNode(note);
                    }}
                  />
                             </Tooltip>
                </CardActions>
              </Card>
            </Grow>
          );
        })}
      </Container>
    </div>
  );
};

export default TodoList;
