import { useTodos } from "../../store/todos-context.tsx";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import TodoItem from "./TodoItem";
import classes from "./TodosList.module.css";

const TodosList: React.FC<{ finishedTodos: boolean }> = ({ finishedTodos }) => {
  const todosCTX = useTodos();
  const { todos, completedTodos } = todosCTX;
  const listOfContent = !finishedTodos ? todos : completedTodos;

  return (
    <TransitionGroup component="ul">
      {listOfContent.length > 0 ? (
        listOfContent.map((task) => (
          <CSSTransition
            key={task.id}
            classNames={{
              enter: classes.fadeEnter,
              enterActive: classes.fadeEnterActive,
              exit: classes.fadeExit,
              exitActive: classes.fadeExitActive,
            }}
            timeout={500}
          >
            <TodoItem {...task} />
          </CSSTransition>
        ))
      ) : (
        <CSSTransition
          classNames={{
            enter: classes.fadeEnter,
            enterActive: classes.fadeEnterActive,
            exit: classes.fadeExit,
            exitActive: classes.fadeExitActive,
          }}
          timeout={500}
        >
          <li className={classes["msg-container"]}>
            <p>No Todos Found yet</p>
          </li>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export default TodosList;
