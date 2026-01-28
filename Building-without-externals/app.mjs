import express from "express";
import crypto from "crypto";
import todoDB from "./todosDB.json" with { type: "json" };
import sessionsDB from "./sessionsDB.json" with { type: "json" };
import usersDB from "./usersDB.json" with { type: "json" };
import { writeFile } from "fs/promises";

const app = express();
const PORT = 3000;
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "missing fields" });
  }

  // user already exists
  const exists = usersDB.find((user) => user.email === email);

  if (exists) {
    return res
      .status(409)
      .json({ message: "User has already been registered" });
  }

  const userId = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const userData = {
    userId: userId,
    username: name,
    email: email,
    password: hashedPassword,
  };

  try {
    await writeFile(
      "usersDB.json",
      JSON.stringify([...usersDB, userData], null, 2),
    );

    const { password, ...safeUser } = userData;
    return res.status(201).json({
      message: "User has been registered successfully",
      user: safeUser,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong", details: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Fields are missing" });
  }

  const user = usersDB.find((usr) => usr.email === email);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (hashedPassword !== user.password) {
    return res.status(401).json({ error: "Wrong password try again" });
  }

  const sessionID = crypto.randomBytes(32).toString("hex");

  const now = Date.now();
  const expiresIn = 1000 * 60 * 60;
  const expiryTime = now + expiresIn;

  const sessionData = {
    sessionID: sessionID,
    userId: user.userId,
    expiresAt: expiryTime,
  };

  try {
    await writeFile(
      "sessionsDB.json",
      JSON.stringify([...sessionsDB, sessionData], null, 2),
    );

    const { password, ...safeUser } = user;
    return res.status(200).json({
      message: "User LoggedIn Successfully",
      userData: safeUser,
      sessionData: sessionData,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Something went wrong", details: error.message });
  }
});

// Check Authenticated
const checkAuth = async function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No Authorized token" });
  }

  // Find in SessionDB and extract userId from that

  const session = sessionsDB.find((session) => session.sessionID === token);

  // if not found or its expired then delete first from collection and returned
  if (!session || Date.now() > session.expiresAt) {
    try {
      const sessionIndex = sessionsDB.findIndex(
        (session) => session.sessionID === token,
      );

      if (sessionIndex !== -1) {
        sessionsDB.splice(sessionIndex, 1);
        await writeFile("sessionsDB.json", JSON.stringify(sessionsDB, null, 2));
      }
      
    } catch (err) {
      next(err);
    }

    return res.status(401).json({
      error: "Session is not found or its expired, please login first",
    });
  }

  const user = usersDB.find((user) => user.userId === session.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  req.user = user;
  next();
};

app.use(checkAuth);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Authorized User", userData: req.user });
});

// Get All todos
app.get("/api/todos", (req, res) => {
  const todos = todoDB.filter((todo) => todo.userID === req.user.userId);

  res.status(200).json({
    success: true,
    data: todos,
  });
});

// Add an Todo
app.post("/api/todo", async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required." });
  }

  const todoID = crypto.randomBytes(16).toString("hex");

  const newTodo = {
    id: todoID,
    userID: req.user.userId,
    title,
    description,
    completed: false,
  };

  // Check is id already exists
  const idExists = todoDB.some((todo) => todo.id === todoID);
  if (idExists) {
    return res
      .status(500)
      .json({ error: "ID collision occurred. Please try again." });
  }

  try {
    // Append new todo
    await writeFile(
      "todosDB.json",
      JSON.stringify([...todoDB, newTodo], null, 2),
    );

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create todo." });
  }
});

// Get todo by ID

app.get("/api/todos/:id", (req, res) => {
  const { id } = req.params;

  const todo = todoDB.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found." });
  }

  if (todo.userID !== req.user.userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  res.status(200).json({
    success: true,
    data: todo,
  });
});

// Update a TODO (Full Update)

app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID is required." });
  }

  if (!title || !description || completed === undefined) {
    return res
      .status(400)
      .json({ error: "Title, description and completed status are required." });
  }

  const todoIndex = todoDB.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found." });
  }

  if (todoDB[todoIndex].userID !== req.user.userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const updatedTodo = {
    ...todoDB[todoIndex],
    title,
    description,
    completed,
  };

  todoDB[todoIndex] = updatedTodo;

  try {
    await writeFile("todosDB.json", JSON.stringify(todoDB, null, 2));

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update todo." });
  }
});

// Update TODO Status Only

app.patch("/api/todo/:id/status", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required." });
  }

  const todoIndex = todoDB.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found." });
  }

  if (todoDB[todoIndex].userID !== req.user.userId) {
    return res.status(403).json({ error: "Forbidden" });
  }
  const todoData = todoDB[todoIndex];

  if (todoData.completed === true) {
    return res.status(400).json({ error: "Todo is already completed." });
  }

  try {
    todoDB[todoIndex].completed = true;
    await writeFile("todosDB.json", JSON.stringify(todoDB, null, 2));

    return res.status(200).json({
      success: true,
      message: "Todo status updated successfully",
      data: todoDB[todoIndex],
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update todo status." });
  }
});

// Delete a Todo

app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required." });
  }

  const todoIndex = todoDB.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found." });
  }

   if (todoDB[todoIndex].userID !== req.user.userId) {
     return res.status(403).json({ error: "Forbidden" });
   }
  console.log(todoIndex);
  // return;

  todoDB.splice(todoIndex, 1);

  try {
    await writeFile("todosDB.json", JSON.stringify(todoDB, null, 2));

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete todo." });
  }
});

// Delete All Completed TODOS

app.delete("/api/todos", async (req, res) => {
  const { completed } = req.query;

  if (completed !== "true") {
    return res.status(400).json({ error: "Invalid query parameter." });
  }

  const AllTodos = todoDB.filter((todo) => !(todo.completed === true && todo.userID === req.user.userId));

  if (AllTodos.length === 0) {
    return res.status(404).json({ error: "No completed todos found." });
  }

  try {
    await writeFile("todosDB.json", JSON.stringify(AllTodos, null, 2));

    res.status(200).json({
      success: true,
      message: "All completed todos deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete completed todos." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
