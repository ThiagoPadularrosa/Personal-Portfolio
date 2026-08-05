import TokenBucket from '../services/tokenBucket.js';
import config from '../config/config.js';

const buckets = new Map();

// I set a task: Every 10m clean the inactives IPs to protect the RAM and prevent 
setInterval(() => {
  const now = Date.now();
  for (const [ip, bucket] of buckets.entries()) {
    // Force a passive recharge to know his real state
    bucket.refill();

    // If the bucket was full and spent more than his interval without use, it deletes 
    if (bucket.tokens >= bucket.capacity && (now - bucket.lastRefill) > bucket.refillIntervalMs) {
      buckets.delete(ip);
    }
  }
}, 10 * 60 * 1000); // 10 minutes in miliseconds

function rateLimiterMiddleware(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;

  if (!buckets.has(ip)) {
    buckets.set(ip, new TokenBucket(10, 2, 5000)); // 10 tokens capacity, 2 tokens refill, every 5seconds
  }

  const bucket = buckets.get(ip);
  // Here i try to consume a token first
  const allowed = bucket.consume(1);

  // Add standard rate limit headers 
  res.set('X-RateLimit-Limit', String(bucket.capacity));
  res.set('X-RateLimit-Remaining', String(Math.floor(bucket.tokens)));
  
  // Calculating how much time exactly to the next recharge of tokens
  const msSinceLastRefill = Date.now() - bucket.lastRefill;
  const msUntilNextRefill = Math.max(0, bucket.refillIntervalMs - msSinceLastRefill);
  const resetTimestamp = Math.floor((Date.now() + msUntilNextRefill) / 1000);
  res.set('X-RateLimit-Reset', String(resetTimestamp));

  if (allowed) {
    console.log(`The request was allowed. ${bucket.tokens} tokens remaining.`);
    // Process the request
    next(); // Call the next middleware or the application logic 
  } else {
    res.set('Retry-After', String(Math.ceil(bucket.refillIntervalMs / 1000)));
    res.status(429).json({ error: 'Too many requests' });
    return; // To stop processing the request 
  }
};
  
// This applies per-IP user rate limiting.
export default rateLimiterMiddleware;