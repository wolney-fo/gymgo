import { verifyJWT } from "../../middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { search } from "./search.controller";
import { nearby } from "./nearby.controller";
import { create } from "./create.controller";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gym/search", search);
  app.get("/gym/nearby", nearby);

  app.post("/gyms", create);
}
