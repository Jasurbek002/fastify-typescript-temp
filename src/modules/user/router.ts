import { FastifyInstance } from "fastify";

import controller from "./controller";
const userRouter = (router: any, option: any, done: any) => {
  router.get("/users", controller.GET);
  router.post("/users", controller.POST);
  router.put("/users/:userId", controller.PUT);
  router.delete("/users/:userId", controller.DELETE);
  done();
};

export default userRouter;
