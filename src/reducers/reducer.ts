export interface NotesState {
  notes: string[];
}
export interface StrikeState {
  notes: string[];
}

const initialState = {
  notes: [],
};
interface AddNote {
  type: "ADD_NOTE";
  payload: string;
}

interface DeleteNote {
  type: "DELETE_NOTE";
  payload: string;
}

interface StrikeNote {
  type: "STRIKE_NOTE";
  payload: string;
}

type Actions = AddNote | DeleteNote | StrikeNote;

export const noteReducers = (
  state: NotesState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case "ADD_NOTE": {
      return { ...state, notes: [...state.notes, action.payload] };
    }
    case "DELETE_NOTE": {
      let newArray = state.notes.slice();
      let noteIndex = newArray.indexOf(action.payload);
      if (noteIndex !== -1) {
        newArray.splice(noteIndex, 1);
      }
      return { ...state, notes: newArray };
    }

    default:
      return state;
  }
};

export const strikeReducer = (
  strikeState: StrikeState = initialState,
  action: StrikeNote
) => {
  switch (action.type) {
    case "STRIKE_NOTE": {
      return { ...strikeState, notes: [...strikeState.notes, action.payload] };
    }
    default:
      return strikeState;
  }
};
