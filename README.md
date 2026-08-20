# 📝 To-Do App

A responsive full-stack To-Do application that allows users to create, manage, search, edit, complete, and delete tasks.

Built as a full-stack development project using React, Node.js, Express, and SQLite.

## ✨ Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- View all tasks
- View upcoming tasks
- View today's tasks
- View completed tasks
- Search tasks
- Add due dates
- Responsive design for desktop, tablet, and mobile
- Data persistence using SQLite

## 🛠️ Technologies Used

### Frontend
- React
- JavaScript
- CSS
- React Icons

### Backend
- Node.js
- Express.js
- SQLite
- REST API

## 📂 Project Structure

```text
To-Do App/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── ...
│
├── server/
│   ├── database.js
│   ├── server.js
│   ├── db.sqlite
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate into the project

```bash
cd "To Do App"
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Install backend dependencies

Open another terminal and run:

```bash
cd server
npm install
```

### 5. Start the backend

Inside the `server` folder:

```bash
node server.js
```

The API runs on:

```text
http://localhost:5000
```

### 6. Start the frontend

Inside the `client` folder:

```bash
npm start
```

The frontend will run on the local development address provided by the React setup.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all tasks |
| POST | `/api/todos` | Create a new task |
| PUT | `/api/todos/:id` | Update a task |
| DELETE | `/api/todos/:id` | Delete a task |

## 📱 Responsive Design

The application is designed to work across:

- Desktop
- Tablet
- Mobile

The layout adapts to smaller screens using CSS media queries.

## 🎯 What I Learned

Through this project, I practiced:

- Building a React application
- Managing state with React hooks
- Connecting a React frontend to a backend API
- Creating REST API endpoints
- Working with SQLite databases
- Performing CRUD operations
- Handling asynchronous requests with `fetch`
- Creating responsive layouts with CSS
- Using Git and GitHub for version control

## 👩🏽‍💻 Author

**Temitayo Obasa**

Built as part of my Full Stack Development learning journey.