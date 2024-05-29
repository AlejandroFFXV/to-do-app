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
          <div key={task.id} className="checkbox-wrapper">
            <input
              checked={task.done}
              onChange={() => handleCheckChange(task.id)}
              type="checkbox"
              className="check"
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
              <h2>{task.task}</h2>
              <p>{task.description}</p>
              <button
                class="button"
                onClick={async () => {
                  const res = await axios.delete(`/api/delete-task/${task.id}`);
                  if (res.status === 204) {
                    setTasks(tasks.filter((t) => t.id !== task.id));
                    router.refresh();
                  }
                }}
              >
                <svg viewBox="0 0 448 512" class="svgIcon">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
              </button>
            </label>
          </div>
        ))
      )}
    </div>
  );
}

export default ToDoGetAll;
