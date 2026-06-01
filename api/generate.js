import Redis from 'ioredis';

const redis = new Redis('rediss://default:gQAAAAAAAifxAAIgcDJiMzJkZDYyYjNhZmQ0MTFkYjFlNzcwZGFmMzljYmViZA@wise-lion-141297.upstash.io:6379');

export default async function handler(req, res) {
  const { hwid } = req.query;
  if (!hwid) return res.status(400).send('Missing hwid');

  const key = 'axis_' + Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join('');
  const expiresAt = Date.now() + 86400000;

  await redis.set(key, JSON.stringify({ hwid, expiresAt }));
  res.status(200).send(key);
}
