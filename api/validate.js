import Redis from 'ioredis';

const redis = new Redis('rediss://default:gQAAAAAAAifxAAIgcDJiMzJkZDYyYjNhZmQ0MTFkYjFlNzcwZGFmMzljYmViZA@wise-lion-141297.upstash.io:6379');

export default async function handler(req, res) {
  const { key, hwid } = req.query;
  if (!key || !hwid) return res.status(200).send('false');

  const data = await redis.get(key);
  if (!data) return res.status(200).send('false');

  const { hwid: storedHwid, expiresAt } = JSON.parse(data);
  if (storedHwid === hwid && Date.now() < expiresAt) {
    return res.status(200).send('true');
  }

  await redis.del(key);
  return res.status(200).send('false');
}
