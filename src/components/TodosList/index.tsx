import { useTodos } from "../../store/todos-context.tsx";
import TodoItem from "./TodoItem";
import classes from "./TodosList.module.css";

const TodosList: React.FC<{ finishedTodos: boolean }> = ({ finishedTodos }) => {
  const todosCTX = useTodos();
  const { todos, completedTodos } = todosCTX;
  const listOfContent = !finishedTodos ? todos : completedTodos;

  return (
    <>
      {listOfContent.length > 0 ? (
        <ul>
          {listOfContent.map((task) => (
            <TodoItem key={task.id} {...task} />
          ))}
        </ul>
      ) : (
        <article className={classes["msg-container"]}>
          <p>No Todos Found yet</p>
        </article>
      )}
    </>
  );
};

export default TodosList;
