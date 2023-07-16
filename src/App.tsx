import MainHeader from "./components/MainHeader";
import NewTodo from "./components/NewTodo";
import TodosList from "./components/TodosList";
import TodosContextProvider from "./store/todos-context.tsx";
import "./App.css";
function App() {
  return (
    <>
      <MainHeader />
      <main>
        <TodosContextProvider>
          <NewTodo />
          <section className="lists">
            <article className="list">
              <h2 className="list-title">In Progress</h2>
              <TodosList key="todos" finishedTodos={false} />
            </article>
            <article className="list">
              <h2 className="list-title">Completed</h2>
              <TodosList key="finished" finishedTodos={true} />
            </article>
          </section>
        </TodosContextProvider>
      </main>
    </>
  );
}

export default App;
