"use client";

import { orpcTanstackClient } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";

const TodosPage = () => {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery(orpcTanstackClient.todo.getAll.queryOptions());

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>TodosPage</h1>
      <ul>
        {todos?.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodosPage;
