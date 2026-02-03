import fs from "fs";
import crypto from "crypto";

const DB_PATH = "/tmp/todoDB.json";

const readDB = () => {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
};

const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

export const todos = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod;
  const todoDB = readDB();

  switch (method) {

    case "GET":
      return {
        statusCode: 200,
        body: JSON.stringify(todoDB),
      };

    case "POST": {
      const { name, description } = JSON.parse(event.body || "{}");

      if (!name || !description) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Name & description required" }),
        };
      }

      const newTodo = {
        todoId: crypto.randomUUID(),
        name,
        description,
        completed: false,
      };

      writeDB([...todoDB, newTodo]);

      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "Todo created",
          data: newTodo,
        }),
      };
    }

    case "DELETE": {
      const { todoId } = JSON.parse(event.body || "{}");

      if (!todoId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "todoId required" }),
        };
      }

      const todo = todoDB.find(t => t.todoId === todoId);
      if (!todo) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Todo not found" }),
        };
      }

      if (!todo.completed) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Cannot delete incomplete todo" }),
        };
      }

      writeDB(todoDB.filter(t => t.todoId !== todoId));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Todo deleted" }),
      };
    }

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method not allowed" }),
      };
  }
};
