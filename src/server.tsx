import cors from "@elysiajs/cors";
import { html, Html } from "@elysiajs/html";
import Elysia, { t } from "elysia";
import { BaseHtml } from "./components/BaseHtml";
import { TodoList } from "./components/Tasks/TodoList";
import TodoItem from "./components/Tasks/TodoItem";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { todos } from "./db/schema/todo";

const app = new Elysia()
  .use(cors())
  .use(html())
  .onError(({ code, error }) => {
    if (code === "NOT_FOUND") {
      return new Response("Página não encontrada!");
    }

    if (code === "VALIDATION") {
      let errorMessage: string;

      if (error.message.includes("equal to 3")) {
        errorMessage = `Erro: O campo deve ter pelo menos 3 caracteres de comprimento.`;
      }

      if (error.message.includes("equal to 50")) {
        errorMessage = `Erro: O campo deve ter menos de 50 caracteres de comprimento.`;
      }

      return new Response(errorMessage);
    }

    return new Response(error.toString());
  })
  .get("/", ({ html }) =>
    html(
      <BaseHtml>
        <main hx-target="this" hx-swap="outerHTML" class="flex flex-col gap-2">
          <h1 class="text-6xl flex gap-2 text-zinc-950 justify-center items-center text-center">
            Exemplo usando
          </h1>
          <ul class="flex gap-2 text-center justify-center text-xl font-semibold">
            <li class="bg-[#F8EDDC] p-2 rounded">Bun</li>
            <li class="bg-[#A3A1BE] p-2 rounded">ElysiaJS</li>
            <li class="bg-[#4FF7D2] p-2 rounded">Turso</li>
            <li class="bg-[#3D72D7] p-2 rounded">
              <span class="flex gap-2 text-zinc-50">
                <p>
                  HTM<span class="text-blue-950">X</span>
                </p>
                <span class="flex gap-1">
                  &#60;
                  <span class="text-blue-950">/</span>
                  &gt;
                </span>
              </span>
            </li>
          </ul>
          <button
            hx-get="/todos"
            class="relative inline-block text-lg group m-auto"
          >
            <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span class="relative">Ver tarefas</span>
            </span>
            <span
              class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </button>
        </main>
      </BaseHtml>
    )
  )
  .get("/todos", async () => {
    const data = await db.select().from(todos).all();
    return <TodoList todos={data} />;
  })
  .post(
    "/todos/toggle/:id",
    async ({ params }) => {
      console.log(typeof params.id);

      const oldTodo = await db
        .select()
        .from(todos)
        .where(eq(todos.id, params.id))
        .get();
      const newTodo = await db
        .update(todos)
        .set({ completed: !oldTodo.completed })
        .where(eq(todos.id, params.id))
        .returning()
        .get();

      return <TodoItem {...newTodo} />;
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .delete(
    "/todos/:id",
    async ({ params }) => {
      await db.delete(todos).where(eq(todos.id, params.id)).run();
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .post(
    "/todos",
    async ({ body }: any) => {
      body.content = Number(body.content);

      if (typeof body.content === "number" || !body) {
        throw new Error("Conteúdo não pode ficar vazio!");
      }

      const newTodo = await db.insert(todos).values(body).returning();

      return <TodoItem {...newTodo} />;
    },
    {
      body: t.Object({
        content: t.String({
          maxLength: 50,
          minLength: 3,
        }),
      }),
    }
  )
  .listen(process.env.PORT || 3000, (app: any) => {
    console.log(`🦊 Elysia is running at ${app?.hostname}:${app?.port}`);
  });
