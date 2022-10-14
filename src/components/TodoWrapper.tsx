import { useDispatch } from "react-redux";
import Todo from "./Todo"
import TodoList from "./TodoList";
import "./css/TodoWrapper.css"

const TodoWrapper = () => {
    const dispatch = useDispatch();

    const addNote = (note: string) => {
      dispatch({ type: "ADD_NOTE", payload: note });
    };
  
    const deleteNote = (note: string) => {
      dispatch({ type: "DELETE_NOTE", payload: note });
    };
 
  return (
    <div className="todo-wrapper-parent">
      <Todo addNote={addNote}  />
      <TodoList deleteNote={deleteNote}/>
    </div>
  );
};

export default TodoWrapper;
