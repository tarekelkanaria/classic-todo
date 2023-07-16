import { createContext, useContext, useState, useEffect } from "react";
import { TodoData, TodosContextType } from "../types/todo.ts";

const TodosContext = createContext<TodosContextType>({
  todos: [],
  completedTodos: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addTodo: (text: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeTodo: (id: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  completeTodo: (item: TodoData) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  editTodo: (item: TodoData) => {},
});

const TodosContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [todoState, dispatchTodoState] = useReducer(reducer, initialState);
  const [todos, setTodos] = useState<TodoData[]>(
    (JSON.parse(localStorage.getItem("todos") as string) as TodoData[]) || []
  );
  const [completedTodos, setCompletedTodos] = useState<TodoData[]>(
    (JSON.parse(
      localStorage.getItem("completed-todos") as string
    ) as TodoData[]) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completed-todos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  const addTodo = (text: string) => {
    const newTodo: TodoData = {
      id: `${Date.now()}`,
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: string) => {
    const existedItem = todos.find((item) => item.id === id);
    if (existedItem) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } else {
      setCompletedTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== id)
      );
    }
  };

  const completeTodo = (todo: TodoData) => {
    const selectedTodo = {
      ...todo,
      completed: !todo.completed,
    };
    if (selectedTodo.completed) {
      setCompletedTodos((prevTodo) => [...prevTodo, selectedTodo]);
      setTodos((prevTodos) =>
        prevTodos.filter((item) => item.id !== selectedTodo.id)
      );
    } else {
      setCompletedTodos((prevTodos) =>
        prevTodos.filter((item) => item.id !== selectedTodo.id)
      );
      setTodos((prevTodo) => [...prevTodo, selectedTodo]);
    }
  };

  const editTodo = (todo: TodoData) => {
    let updatedTodos: TodoData[] = [];
    const existedTodo = todos.find((item) => item.id === todo.id);
    if (existedTodo) {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === todo.id) {
          updatedTodos.push(todo);
        } else {
          updatedTodos.push(todos[i]);
        }
      }
      setTodos(updatedTodos);
    } else {
      for (let j = 0; j < completedTodos.length; j++) {
        if (completedTodos[j].id === todo.id) {
          updatedTodos.push(todo);
        } else {
          updatedTodos.push(completedTodos[j]);
        }
      }
      setCompletedTodos(updatedTodos);
    }
    updatedTodos = [];
  };
  const todosValue = {
    todos,
    completedTodos,
    addTodo,
    removeTodo,
    completeTodo,
    editTodo,
  };

  return (
    <TodosContext.Provider value={todosValue}>{children}</TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
export default TodosContextProvider;
