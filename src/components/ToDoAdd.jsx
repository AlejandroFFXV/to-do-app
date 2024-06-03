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
          placeholder="Task name"
          type="text"
          name="task"
          required=""
          className=" text-black rounded-md"
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          className="text-black rounded-md"
          placeholder="Task description"
          rows="4"
          name="description"
          required=""
          onChange={handleChange}
        ></textarea>
        <button className="mt-4 text-white bg-cyan-500 shadow-lg shadow-cyan-500/50">
          Send
        </button>
      </div>
    </form>
  );
}

export default ToDoAddPage;
