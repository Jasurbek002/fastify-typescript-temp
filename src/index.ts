import fastify, { FastifyInstance } from "fastify";
import { sequelize } from "./lib/postgres.js";
import router from "./modules";
import redis from "fastify-redis";
import axios from "axios";

const app: FastifyInstance = fastify({ logger: true });


app.register(redis,{ host: '127.0.0.1' });
app.register(router);
app.decorate("sequelize", sequelize);



// fastify-redis
app.get("/photos", async (req, rep) => {
  const { redis } = app;
  redis.get("images"  , async (err, images) => {
    if (err) console.log(err);
    if (images != null) {
      return rep.send(JSON.parse(images));
    } else {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      redis.set("images", JSON.stringify(data));
      return rep.send(data);
    }
  });
});


app.listen({ port: 5000 }, async (err, address) => {
  if (err) {
    app.log.error(err);
    await sequelize.close();
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});
