import { useState, useRef, useEffect } from "react";
import { TodoData } from "../../../types/todo.ts";
import { useTodos } from "../../../store/todos-context.tsx";
import MessageModal from "../../MessageModal";
import classes from "./TodoItem.module.css";

const TodoItem: React.FC<TodoData> = ({ id, text, completed }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(text);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const todoRef = useRef<HTMLInputElement>(null);

  const todoCTX = useTodos();
  const { removeTodo, completeTodo, editTodo } = todoCTX;

  const handleRemove: typeof removeTodo = (id: string) => {
    removeTodo(id);
  };

  const handleComplete = () => {
    completeTodo({ id, text, completed });
  };

  const handleEditing = () => {
    setIsEditing((prevState) => !prevState);
    if (newText.trim().length === 0) {
      setNewText(text);
      setModalIsOpen(true);
    } else {
      editTodo({ id, text: newText, completed });
    }
  };

  useEffect(() => {
    isEditing ? todoRef.current!.focus() : todoRef.current!.blur();
  }, [isEditing]);

  return (
    <>
      {modalIsOpen && (
        <MessageModal
          text="Please Enter a Valid Task"
          close={() => setModalIsOpen(false)}
        />
      )}
      <li className={`${classes.item} ${completed ? classes.completed : ""}`}>
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          readOnly={!isEditing}
          className={`${completed ? classes["todo-complete"] : ""}`}
          ref={todoRef}
        />
        <div className={classes.actions}>
          <button className="btn" onClick={() => handleRemove(id)}>
            Remove
          </button>
          <button className="btn" onClick={handleComplete}>
            {!completed ? "Mark as Completed" : "Mark as In Progress"}
          </button>
          <button className="btn" onClick={handleEditing}>
            {!isEditing ? "Edit" : "Save"}
          </button>
        </div>
      </li>
    </>
  );
};

export default TodoItem;
