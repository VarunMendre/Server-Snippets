import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
const db = client.db();
const col = db.collection("todos");

const json = (statusCode, data) => ({
  statusCode,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(data),
});

const isValidId = (id) =>
  ObjectId.isValid(id) && String(new ObjectId(id)) === id;

export async function handler(event) {
  const method = event.requestContext.http.method;
  const path = event.rawPath;

  // GET /todos
  if (method === "GET" && path === "/todos") {
    const todos = await col.find({}).toArray();
    return json(200, todos);
  }

  // GET /todos/{id}
  else if (method === "GET" && path.startsWith("/todos/")) {
    const id = path.split("/")[2];
    if (!isValidId(id)) return json(400, { message: "Invalid id" });

    const t = await col.findOne({ _id: new ObjectId(id) });
    return json(
      200,
      t ? { id: String(t._id), title: t.title, done: !!t.done } : null // keep same behavior style
    );
  }

  // POST /todos
  else if (method === "POST" && path === "/todos") {
    const body = JSON.parse(event.body || "{}");

    const doc = {
      title: body.title,
      done: false,
    };

    const res = await col.insertOne(doc);

    return json(201, {
      id: String(res.insertedId),
      title: doc.title,
      done: doc.done,
    });
  }

  // PUT /todos/{id}
  else if (method === "PUT" && path.startsWith("/todos/")) {
    const id = path.split("/")[2];
    if (!isValidId(id)) return json(400, { message: "Invalid id" });

    const body = JSON.parse(event.body || "{}");

    const $set = {};
    if (body.title !== undefined) $set.title = body.title;
    if (body.done !== undefined) $set.done = body.done;

    await col.updateOne({ _id: new ObjectId(id) }, { $set });

    const t = await col.findOne({ _id: new ObjectId(id) });
    return json(
      200,
      t ? { id: String(t._id), title: t.title, done: !!t.done } : null
    );
  }

  // DELETE /todos/{id}
  else if (method === "DELETE" && path.startsWith("/todos/")) {
    const id = path.split("/")[2];
    if (!isValidId(id)) return json(400, { message: "Invalid id" });

    const res = await col.findOneAndDelete({ _id: new ObjectId(id) });
    const t = res.value;

    return json(
      200,
      t ? { id: String(t._id), title: t.title, done: !!t.done } : null
    );
  }

  return { statusCode: 404 };
}
