import express from "express";
import crypto from "crypto";
import todoDB from "./todosDB.json" with { type: "json" };
import { writeFile } from "fs/promises";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/api/todos", (req, res) => {
  const todos = todoDB;
  res.status(200).json({
    success: true,
    data: todos,
  });
});

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

  const updatedTodo = {
    id,
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

  const AllTodos = todoDB.filter((todo) => todo.completed !== true);

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
