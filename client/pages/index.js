import { useState } from "react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [complete, setComplete] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(description);
    setDescription("");
  };
  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 h-[100vh]">
      <div className="font-bold text-2xl">Todos</div>
      <div className="flex flex-row ">
        <div className="mt-10 col-auto">
          <div className="flex flex-row">
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="enter todo"
              className="col-span-4 p-2 outline-none w-[400px]"
            />
            <button
              onClick={handleAdd}
              className="col-span-2 ml-2 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
          <div className="pt-2">
            {todos.length > 0 &&
              todos.map((t) => {
                <>
                  <div>
                    <input
                      type="checkbox"
                      name="description"
                      value={complete}
                      onChange={(e) => setComplete(!complete)}
                      placeholder="enter todo"
                      className="p-2 outline-none"
                    />
                  </div>
                  <div key={t.description}>{t.description}</div>
                  <div>
                    <button className="font-red-100">del</button>
                  </div>
                </>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
