import { useState } from "react";
import { useTodos } from "../../store/todos-context.tsx";
import MessageModal from "../MessageModal";
import classes from "./NewTodo.module.css";

const NewTodo: React.FC = () => {
  const [enteredText, setEnteredText] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const todoCTX = useTodos();
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (enteredText.trim().length === 0) {
      setModalIsOpen(true);
      return;
    }
    todoCTX.addTodo(enteredText);
    setEnteredText("");
  };
  return (
    <>
      {modalIsOpen && (
        <MessageModal
          text="Please Enter a Valid Task"
          close={() => setModalIsOpen(false)}
        />
      )}
      <form onSubmit={handleSubmit} className={classes["form-container"]}>
        <div className={classes["label-feild"]}>
          <label htmlFor="todo-text">Enter today's task: </label>
        </div>
        <div className={classes["input-feild"]}>
          <input
            type="text"
            id="todo-text"
            name="task"
            value={enteredText}
            onChange={handleUserInput}
          />
        </div>
        <div>
          <button type="submit" className="btn">
            Add Task
          </button>
        </div>
      </form>
    </>
  );
};

export default NewTodo;
