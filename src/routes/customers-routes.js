import mongoose from "mongoose";
import redis from "redis";
import { promisify } from "util";

const Customers = mongoose.model("Customers");
const redisURL = "redis://127.0.0.1:6379";

export default app => {
  app.get("/users", async (req, res) => {
    const customers = await Customers.find();
    res.send(customers);
  });

  app.get("/user", async (req, res) => {
    const searchName = req.query.username || "";
    const redisClient = redis.createClient(redisURL);

    // promisify the redisClient.get because redis lib doesnt support the native
    // promise it uses callback hell
    redisClient.get = promisify(redisClient.get);

    // do we have any data cache in redis related to this query
    const cachedUser = await redisClient.get(searchName);
    if (cachedUser) {
      console.log("SERVING FROM REDIS CACHED.", cachedUser)
      return res.send(JSON.parse(cachedUser));
    }

    // else fetch the result form mongoDB and set the query and result
    const customer = await Customers.find({ username: searchName });
    console.log("SERVING FROM MONGODB.")
    res.send(customer);
    redisClient.set(searchName, JSON.stringify(customer));
  });
};
