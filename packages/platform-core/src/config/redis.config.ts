import { createClient, type RedisClientType } from 'redis';
import { appConfig } from "./app.config";

const redisUrl = appConfig.redis_url || 'redis://localhost:6379';

const client: RedisClientType = createClient({
    url: redisUrl,
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 5) {
                console.log('Redis Max Retries Reached. Giving up...');
                return new Error('Redis Max Retries Reached');
            }
            return Math.min(retries * 50, 500);
        }
    }
});

client.on('error', (err) => {
    // Prevent crashing on connection errors
    if (err.code === 'ECONNREFUSED') {
        // console.log('Redis refused connection (is it running?)');
        return;
    }
    console.error('Redis Client Error', err)
});


async function connectRedis() {
    try {
        await client.connect();
        console.log('âœ… Connected to Redis successfully!');
    } catch (err) {
        // console.error('âŒ Failed to connect to Redis:', err);
        // Do not exit, just run without Redis
    }
}

connectRedis();

export const redisClient = client;
export { redisUrl };
export default client;
















