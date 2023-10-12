import { db } from "@/src/db";
import { BaseHtml } from "../BaseHtml";
import Form from "../Form";
import TodoItem from "./TodoItem";

export async function TodoList() {
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
          {db.all.map((todo) => {
            <TodoItem {...todo} />;
          })}
          <Form />
        </div>
      </div>
    </BaseHtml>
  );
}
