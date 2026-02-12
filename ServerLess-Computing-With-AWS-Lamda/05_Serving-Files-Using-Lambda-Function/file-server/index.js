import fs from "fs";
import mime from "mime-types";

export async function handler(event) {
  const reqPath = `.${event.rawPath}`;
  if (!fs.existsSync(reqPath)) {
    return { statusCode: 404, body: "Not Found" };
  }

  const content = fs.readFileSync(reqPath, "utf8");

  return {
    statusCode: 200,
    headers: {
      "content-type": mime.lookup(reqPath),
    },
    body: content,
  };
}
