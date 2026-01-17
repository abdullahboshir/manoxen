import { createClient, type RedisClientType } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

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
    if (err.code === 'ECONNREFUSED') {
        return;
    }
    console.error('Redis Client Error', err)
});

async function connectRedis() {
    try {
        await client.connect();
        console.log('✅ Connected to Redis successfully!');
    } catch (err) {
        // Silent fail
    }
}

connectRedis();

export default client;
