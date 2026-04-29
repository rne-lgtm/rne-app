import handler from "@tanstack/react-start/server-entry";
import { Hono } from "hono";

const app = new Hono();

app.get("/api", async c => c.json({ message: "Hello" }));

app.all("/*", async c => handler.fetch(c.req.raw));

export default {
  fetch: app.fetch,
};
