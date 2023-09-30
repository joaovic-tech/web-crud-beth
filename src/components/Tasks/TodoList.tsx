import { BaseHtml } from "../BaseHtml";
import Form from "../Form";
import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

export const db: Todo[] = [
  { id: 1, content: "Ler a documentação do Bun", completed: true },
  { id: 2, content: "Ler a documentação do Elysia", completed: true },
  { id: 3, content: "Ler a documentação do Turso", completed: true },
  { id: 4, content: "Ler a documentação do Htmx", completed: true },
  {
    id: 5,
    content: "Criar um crud usando Bun, Elysia, Turso, Htmx",
    completed: false,
  },
];

export function TodoList() {
  return (
    <BaseHtml>
      <div
        hx-target="this"
        hx-swap="outerHTML"
        class="flex flex-col gap-2 w-full px-20"
      >
        <h1 class="text-6xl flex gap-2 text-zinc-600 justify-center items-center text-center">
          Tarefas
        </h1>
        <div>
          {db.map((todo) => (
            <TodoItem {...todo} />
          ))}
          <Form />
        </div>
      </div>
    </BaseHtml>
  );
}
