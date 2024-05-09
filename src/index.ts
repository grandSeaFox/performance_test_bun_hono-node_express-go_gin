import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import StocksController from "./controllers/stocks.controller";
import connect from "./config/dbClient";

const app = new Hono();

app.use(logger());
app.use("/public", serveStatic({ root: "../public" }));

app.get("/", async (c) => {
  const htmlContent = await Bun.file("./public/index.html").text();
  return c.html(htmlContent);
});
app.route("/stocks", StocksController);

connect();

export default {
  port: 3001,
  fetch: app.fetch,
};