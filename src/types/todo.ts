export interface TodoData {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodosContextType {
  todos: TodoData[];
  completedTodos: TodoData[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  completeTodo: (item: TodoData) => void;
  editTodo: (item: TodoData) => void;
}
