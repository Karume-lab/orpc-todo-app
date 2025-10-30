"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { ORPCTanstackClient } from "@/utils/orpc";

const TodosPage = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery(ORPCTanstackClient.todo.getAll.queryOptions());

  const addTodo = useMutation(
    ORPCTanstackClient.todo.add.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ORPCTanstackClient.todo.getAll.queryKey(),
        });
        setText("");
      },
    })
  );

  const toggleTodo = useMutation(
    ORPCTanstackClient.todo.toggle.mutationOptions({
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ORPCTanstackClient.todo.getAll.queryKey(),
        }),
    })
  );

  const deleteTodo = useMutation(
    ORPCTanstackClient.todo.remove.mutationOptions({
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ORPCTanstackClient.todo.getAll.queryKey(),
        }),
    })
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading todos...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {(error as Error).message}
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
            🧩 <span>Todo Manager</span>
          </h1>

          <Link
            href="/send-email"
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition"
          >
            Go to Send Email
          </Link>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            addTodo.mutate({ text });
          }}
          className="flex gap-2 mb-6"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          />
          <button
            type="submit"
            disabled={addTodo.isPending}
            className="bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition disabled:opacity-60"
          >
            {addTodo.isPending ? "Adding..." : "Add"}
          </button>
        </form>

        <div className="rounded-xl border border-gray-100 shadow-inner bg-gray-50">
          {todos?.length ? (
            <ul className="divide-y divide-gray-200">
              {todos.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between p-3 hover:bg-white transition rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() =>
                        toggleTodo.mutate({ id: t.id, done: !t.done })
                      }
                      className="w-4 h-4 accent-indigo-600 cursor-pointer"
                    />
                    <span
                      className={`text-base ${
                        t.done
                          ? "line-through text-gray-400"
                          : "text-gray-800 font-medium"
                      }`}
                    >
                      {t.text}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTodo.mutate({ id: t.id })}
                    className="text-sm text-red-500 hover:text-red-600 px-2 py-1 rounded-lg transition"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-6">
              No tasks yet. Add one above 👆
            </p>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Built with <span className="text-indigo-500 font-semibold">oRPC</span>
          , <span className="text-pink-500 font-semibold">Drizzle</span> &{" "}
          <span className="text-amber-500 font-semibold">TanStack Query</span>
        </p>
      </div>
    </div>
  );
};

export default TodosPage;
