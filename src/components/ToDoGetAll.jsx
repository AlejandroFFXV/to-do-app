"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Function to get all tasks
async function getTasks() {
  try {
    const { data } = await axios.get("/api/get-task");
    return data;
  } catch (error) {
    console.error(error);
  }
}

function ToDoGetAll() {
  const [tasks, setTasks] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleCheckChange = async (id) => {
    // Create a new array of tasks with the updated task
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );

    const taskToUpdate = updatedTasks.find((task) => task.id === id);

    try {
      await axios.put(`/api/update-task/${id}`, taskToUpdate);
      // Update the state with the new tasks array
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };
  //comentario random
  // Get all tasks when the component mounts to the DOM
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.length === 0 ? (
        <>
          <div className="loader">
            <span className="loader-text">loading</span>
            <span className="load"></span>
          </div>
          <h2>No tasks</h2>
        </>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="my-10 shadow-lg shadow-cyan-500/50 checkbox-wrapper border-4 border-black p-4"
          >
            <input
              checked={task.done}
              onChange={() => handleCheckChange(task.id)}
              type="checkbox"
              className="check mr-10"
              id={`check-${task.id}`}
            />
            <label htmlFor={`check-${task.id}`} className="label">
              <svg width="45" height="45" viewBox="0 0 95 95">
                <rect
                  x="30"
                  y="20"
                  width="50"
                  height="50"
                  stroke="black"
                  fill="none"
                ></rect>
                <g transform="translate(0,-952.36222)">
                  <path
                    d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
                    stroke="black"
                    strokeWidth="3"
                    fill="none"
                    className="path1"
                  ></path>
                </g>
              </svg>
              <h2 className=" mr-4 text-lg">Task: {task.task}</h2>
              <p className="text-sm">{task.description}</p>
              <button
                className="focus:outline-none mx-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={async () => {
                  const res = await axios.delete(`/api/delete-task/${task.id}`);
                  if (res.status === 204) {
                    setTasks(tasks.filter((t) => t.id !== task.id));
                    router.refresh();
                  }
                }}
              >
                Delete
              </button>
            </label>
          </div>
        ))
      )}
    </div>
  );
}

export default ToDoGetAll;
