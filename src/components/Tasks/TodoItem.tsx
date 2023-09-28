import { Todo } from "@/src/db/schema/todo";
import * as elements from "typed-html";

// icon trash

const IconTrash = ({ children }: elements.Children) => `
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"
    />
  </svg>
`;

// icon check

const IconCheck = ({ children }: elements.Children) => `
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    class="bi bi-check"
    viewBox="0 0 16 16">
    {" "}
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />{" "}
  </svg>
`;

export default function TodoItem({ content, completed, id }: Todo) {
  return (
    <div
      class={`flex items-center justify-between p-4 ${
        completed ? "bg-zinc-100" : "bg-white"
      } rounded shadow-md hover:shadow-none transition duration-300 ease-in-out border-b hover:bg-zinc-100`}
    >
      <p
        class={`text-lg ${
          completed ? "line-through text-gray-400" : "text-black"
        }`}
      >
        {content}
      </p>
      <div class="flex space-x-3 items-center">
        <button
          class={`form-checkbox text-green-500 ${
            completed ? "bg-green-500" : "bg-white border border-gray-300"
          } text-zinc-50 p-2 rounded`}
          hx-post={`/todos/toggle/${id}`}
          hx-swap="outerHTML"
          hx-target="closest div"
        >
          <IconCheck />
        </button>
        <button
          class="bg-red-500 hover:bg-red-700 text-zinc-50 p-2 rounded"
          hx-delete={`/todos/${id}`}
          hx-swap="outerHTML"
          hx-target="closest div"
        >
          <IconTrash />
        </button>
      </div>
    </div>
  );
}
