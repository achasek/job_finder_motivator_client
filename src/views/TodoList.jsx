import React, { useState, useEffect } from "react";
import TodoList from "./TodoListForm";

const TodoList = () => {

    const { user } = useAuth0();
    if (!user) {
    return null;}

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`/api/user/${email}/tasks`)
        .then(res => res.json())
        .then(data => setTasks(data.tasks))
        .catch(error => console.error(error));
    }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.task}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;