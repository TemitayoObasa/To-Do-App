import { useEffect, useState } from "react";
import "./App.css";

import {
  FiSearch,
  FiClipboard,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiCheckSquare,
  FiEdit,
  FiTrash2
} from "react-icons/fi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [view, setView] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const addTask = () => {
    if (!newTask.trim()) {
      return;
    }

    fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: newTask,
        due_date: dueDate
      })
  })
  .then((response) => response.json())
  .then((task) => {
    setTasks([...tasks, task]);
    setNewTask("");
    setDueDate("");
    setShowForm(false);
  })
  .catch((error) => {
    console.error("Error adding task:", error);
  });
  };

  const toggleComplete = (task) => {
    fetch(`http://localhost:5000/api/todos/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: task.title,
        completed: task.completed ? 0 : 1,
        due_date: task.due_date
      })
  })
    .then((response) => response.json())
    .then((updatedTask) => {
        setTasks(
          tasks.map((item) =>
            item.id === updatedTask.id ? updatedTask : item
          )
        );
    })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const editTask = (task) => {
    setEditingTask(task);
    setNewTask(task.title);
    setDueDate(task.due_date || "");
    setShowEditForm(true);
  };

  const updateTask = () => {
  if (!newTask.trim()) {
    return;
  }

  fetch(`http://localhost:5000/api/todos/${editingTask.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: newTask,
      completed: editingTask.completed,
      due_date: dueDate
    })
  })
    .then((response) => response.json())
    .then((updatedTask) => {
      setTasks(
        tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      setNewTask("");
      setDueDate("");
      setEditingTask(null);
      setShowEditForm(false);
    })
    .catch((error) => {
      console.error("Error updating task:", error);
    });
};

const filteredTasks = tasks.filter((task) => {
  if (view === "search") {
    return task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  }

  if (view === "all") {
    return true;
  }

  if (view === "completed") {
    return task.completed === 1;
  }

  if (view === "upcoming") {
    return task.completed === 0;
  }

  if (view === "today") {
    const today = new Date().toISOString().split("T")[0];
    return task.due_date === today;
  }

  return true;
});

const emptyStateMessages = {
  all: {
    icon: "📋",
    title: "No tasks yet",
    message: "Add a task to get started."
  },
  today: {
    icon: "🕐",
    title: "Nothing due today",
    message: "Enjoy your day or plan something ahead."
  },
  upcoming: {
    icon: "📅",
    title: "No upcoming tasks",
    message: "Add a task to start planning."
  },
  completed: {
    icon: "✓",
    title: "No completed tasks",
    message: "Completed tasks will appear here."
  },
  search: {
    icon: "🔎",
    title: "No tasks found",
    message: "Try searching for something else."
  }
};

const formatDate = (date) => {
  if (!date) {
    return "No due date";
  }

  const [year, month, day] = date.split("-");

  const formattedDate = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  return formattedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

  return (
    <div className="app">

      <aside className="sidebar">

        <button
          className="add-task"
          onClick={() => setShowForm(true)}
        >
          + Add Task
        </button>

        <nav>
          <p
            className={view === "search" ? "active" : ""}
            onClick={() => setView("search")}
          >
            <FiSearch /> Search
          </p>

          <p
            className={view === "all" ? "active" : ""}
            onClick={() => setView("all")}
          >
            <FiClipboard /> All Tasks
          </p>

          <p
            className={view === "today" ? "active" : ""}
            onClick={() => setView("today")}
          >
            <FiClock /> Today
          </p>

          <p
            className={view === "upcoming" ? "active" : ""}
            onClick={() => setView("upcoming")}
          >
            <FiCalendar /> Upcoming
          </p>

          <p
            className={view === "completed" ? "active" : ""}
            onClick={() => setView("completed")}
          >
            <FiCheckCircle /> Completed
          </p>
        </nav>

      </aside>

      {showForm && (
        <div className="modal-overlay">

          <div className="task-modal">

            <div className="modal-header">
              <h2>Add New Task</h2>

              <button
                className="close-modal"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <label>Task title</label>

            <input
              type="text"
              placeholder="What do you need to do?"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
            />

            <label>Due date</label>

            <input
              type="date"
               value={dueDate}
               onChange={(event) => setDueDate(event.target.value)}
            />

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                className="save-task-btn"
                onClick={addTask}
              >
                Add Task
              </button>

            </div>

          </div>

        </div>
      )}

      {showEditForm && (
  <div className="modal-overlay">

    <div className="task-modal">

      <div className="modal-header">
        <h2>Edit Task</h2>

        <button
          className="close-modal"
          onClick={() => setShowEditForm(false)}
        >
          ×
        </button>
      </div>

      <label>Task title</label>

      <input
        type="text"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />

      <label>Due date</label>

      <input
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <div className="modal-actions">

        <button
          className="cancel-btn"
          onClick={() => setShowEditForm(false)}
        >
          Cancel
        </button>

        <button
          className="save-task-btn"
          onClick={updateTask}
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}

      <main className="main-content">

        <h1>
          {view === "all" && "All Tasks"}
          {view === "today" && "Today"}
          {view === "upcoming" && "Upcoming"}
          {view === "completed" && "Completed"}
          {view === "search" && "Search Tasks"}

        </h1>
        <h2>August 2026</h2>

        {view === "search" && (
          <div className="search-box">
            <FiSearch />

            <input
              type="text"
              placeholder="Search your tasks..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              autoFocus
            />
          </div>
        )}

        <div className="tasks">

          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                className={`sticky-note ${task.completed ? "completed" : ""}`}
                key={task.id}
              >

                <h3>{task.title}</h3>

                <p>
                  📅 {formatDate(task.due_date)}
                </p>

                <div className="actions">

                  <button onClick={() => toggleComplete(task)}>
                    <FiCheckSquare />
                  </button>

                  <button onClick={() => editTask(task)}>
                    <FiEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    <FiTrash2 />
                  </button>

                </div>

              </div>
            ))
          ) : (
            <div className="empty-state">

              <div className="empty-icon">
                {emptyStateMessages[view].icon}
              </div>

              <h3>
                {emptyStateMessages[view].title}
              </h3>

              <p>
                {emptyStateMessages[view].message}
              </p>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default App;