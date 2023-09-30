export default function Form() {
  return (
    <form
      hx-post="/todos"
      hx-target="closest form"
      hx-swap="beforebegin"
      class="bg-zinc-700 p-4 rounded-lg shadow-md"
    >
      <label for="content" class="block text-gray-50 font-semibold mb-2">
        Nova Tarefa:
      </label>
      <div class="flex">
        <input
          type="text"
          id="content"
          name="content"
          class="w-full py-2 px-3 bg-gray-400 text-gray-50 placeholder-gray-50 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
          placeholder="Adicione sua tarefa"
        />
        <button
          type="submit"
          class="ml-2 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
        >
          Adicionar
        </button>
      </div>
    </form>
  );
}
