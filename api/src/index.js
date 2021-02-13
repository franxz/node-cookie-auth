import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import pg from 'pg'; 
import { APP_PORT, REDIS_OPTIONS, PG_OPTIONS } from './config/index.js';
import { createApp } from './app.js';
import { catchAsync } from './middleware/index.js';

const { Client } = pg;
export const pgClient = new Client(PG_OPTIONS); // ok?

(catchAsync(async () => {
  await pgClient.connect()

  const RedisStore = connectRedis(session)
  const redisClient = new Redis(REDIS_OPTIONS);
  const store = new RedisStore({ client: redisClient });

  const app = createApp(store);

  app.listen(APP_PORT, () => console.log(`listening on http://localhost:${APP_PORT}`));
}))();