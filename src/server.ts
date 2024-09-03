import express, { Request } from "express";
import next, { NextApiRequest, NextApiResponse } from "next";
import bodyParser from "body-parser";
// import { IncomingMessage } from 'http';
import { parse } from "url";
import * as trpcExpress from "@trpc/server/adapters/express";
import { connectToDB } from "./lib/database";
import { inferAsyncReturnType } from "@trpc/server";
import { appRouter } from "./trpc";
import cookieParser from "cookie-parser";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = Number(process.env.PORT) || 3000;
export type ExpressContext = inferAsyncReturnType<typeof createContext>;


const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

const startServer = async () => {
  await app.prepare();

  const server = express();

  server.use(bodyParser.json());

  // Example API Route
  server.get("/api/example", (req, res) => {
    res.json({ message: "Hello from the API" });
  });

  // Custom Route Example
  server.get("/custom-route", (req, res) => {
    const parsedUrl = parse(req.url, true);
    app.render(req, res, "/custom", parsedUrl.query);
  });

  server.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  server.use(cookieParser());

  server.get("/api/go", (req, res) => {
    res.json({ message: "this should work" });
    return;
  });

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};

startServer();
connectToDB();
