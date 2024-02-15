import { useEffect, useState } from "react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const url = process.env.NEXT_PUBLIC_BASEURL;
  // console.log(url)

  const handleUpdate = async (id, description, complete) => {
    const data = {
      task_id: id,
      description: description,
      complete: !complete,
    };
    const response = await fetch(`${url}/api/task-update/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res) {
      fetchTasks();
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${url}/api/task-delete/${id}`, {
      method: "DELETE",
    });
    const res = await response.json();
    if (res) {
      fetchTasks();
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = {
      description: description,
    };

    const response = await fetch(`${url}/api/task-create/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res) {
      fetchTasks();
    }
    setDescription("");
  };

  const fetchTasks = async () => {
    const response = await fetch(`${url}/api/task-list/`, {
      method: "GET",
    });
    const res = await response.json();
    if (res) {
      setTodos(res);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-cyan-400 h-[100vh]">
      <div className="font-bold text-2xl text-white">Todos</div>
      <form onSubmit={handleAdd}>
        <div className="flex flex-row ">
          <div className="mt-10 col-auto">
            <div className="flex flex-row mb-2">
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
            <div className="p-3 bg-gray-400">
              {todos.length > 0 &&
                todos.map((t) => {
                  return (
                    <div
                      className="flex flex-row items-center text-white"
                      key={t.task_id}
                    >
                      <div>
                        <input
                          type="checkbox"
                          name="complete"
                          checked={t.complete}
                          onChange={(e) =>
                            handleUpdate(t.task_id, t.description, t.complete)
                          }
                          placeholder="enter todo"
                          className={
                            !t.complete
                              ? "outline-none col-span-4 mr-4"
                              : "line-through col-span-4 mr-4"
                          }
                        />
                      </div>
                      <div
                        className={
                          !t.complete
                            ? "col-span-4"
                            : "line-through font-semibold text-green-400 col-span-4"
                        }
                      >
                        {t.description}
                      </div>
                      <div>
                        <button
                          className="col-span-4 text-red-500 ml-28 font-semibold text-xl"
                          onClick={(e) => handleDelete(t.task_id)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
