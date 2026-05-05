import { createServer } from "http";
import { readFile } from "fs/promises";
import { extname, join } from "path";
import { fileURLToPath } from "url";

const PORT = 8080;
const ROOT = fileURLToPath(new URL(".", import.meta.url));

const MIME = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".json": "application/json",
  ".ico":  "image/x-icon",
};

createServer(async (req, res) => {
  const url = req.url === "/" ? "/index.html" : req.url;
  const filePath = join(ROOT, url);
  const ext = extname(filePath);

  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] ?? "text/plain" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
