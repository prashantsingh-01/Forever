import { Redis } from "@upstash/redis";

const client = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
console.log("Connected to Upstash Redis");

export default client;
