import { Client } from "@notionhq/client";
import { Request, Response, Router, NextFunction } from "express";

const authHeaderMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Missing API token");
  }
  next();
};

const getClient = (request: Request) =>
  new Client({ auth: request.headers.authorization });

const databasesRouter = Router()
  .get("/retrieve", async (req, res) => {
    const client = getClient(req);
    const databaseId = req.query.databaseId;
    if (!databaseId) {
      return res.status(400).send("Missing databaseId query parameter");
    }
    try {
      const databases = await client.databases.retrieve({
        database_id: databaseId as string,
      });
      return res.json(databases);
    } catch (error: any) {
      console.error(error);
      return res.status(404).send(error.message);
    }
  })
  .get("/query", async (req, res) => {
    const client = getClient(req);
    const databaseId = req.query.databaseId;
    if (!databaseId) {
      return res.status(400).send("Missing databaseId query parameter");
    }
    try {
      const databases = await client.databases.query({
        database_id: databaseId as string,
      });
      return res.json(databases);
    } catch (error: any) {
      console.error(error);
      return res.status(404).send(error.message);
    }
  });

const searchRouter = Router().get("/", async (req, res) => {
  const client = getClient(req);
  try {
    const search = await client.search({});
    return res.json(search);
  } catch (error: any) {
    console.error(error);
    return res.status(404).send(error.message);
  }
});

export const appRouter = Router()
  .use(authHeaderMiddleware)
  .use("/databases", databasesRouter)
  .use("/search", searchRouter);
