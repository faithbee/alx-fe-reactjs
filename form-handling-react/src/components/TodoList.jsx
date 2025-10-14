import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

const addTodo = async (newTodo) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
};

const TodoList = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  // Fetch Todos
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Add Todo Mutation
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setTitle("");
    },
  });

  if (isLoading) return <p>Loading todos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutation.mutate({ title, completed: false });
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Adding..." : "Add Todo"}
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
