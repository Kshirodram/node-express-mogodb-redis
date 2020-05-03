import util from "util";
import mongoose from "mongoose";
import redis from "redis";

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

const exec = mongoose.Query.prototype.exec;

// cache handler to whether or we need to cache
mongoose.Query.prototype.cache = function () {
  this.userCache = true;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  // check if we need to cache
  if (!this.userCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name,
  });
  const cacheValue = await client.get(key);
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    console.log("## RETURNING FROM CACHE ##");
    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  client.set(key, JSON.stringify(result), "EX", 5);
  console.log("## RETURNING FROM MONGODB ##");
  return result;
};
