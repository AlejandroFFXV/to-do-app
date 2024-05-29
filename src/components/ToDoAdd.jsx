"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
function ToDoAddPage() {
  const [task, setTask] = useState({
    task: "",
    description: "",
  });
  const form = useRef(null);
  const router = useRouter();
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      console.log(task);
      const response = await axios.post("/api/add-task", task);
      form.current.reset();
      router.refresh();
      router.push("/");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="mt-10" onSubmit={handleSubmit} ref={form}>
      <div className="flex flex-col">
        <label htmlFor="task">Task</label>
        <input
          type="text"
          name="task"
          required=""
          className=" text-black"
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="text-black"
          name="description"
          required=""
          onChange={handleChange}
        ></textarea>
        <button className="mt-4 bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80">
          Enviar
        </button>
      </div>
    </form>
  );
}

export default ToDoAddPage;
