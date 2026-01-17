import client from "../config/redis";
const DEFAULT_TTL_SECONDS = 600;

export const CacheManager = {
    /**
     * Gets data from Redis, parsing the JSON string back to an object.
     */
    get: async <T>(key: string): Promise<T | undefined> => {
        const value = await client.get(key);
        if (value) {
            console.log(`✅ Redis HIT for key: ${key}`);
            try {
                return JSON.parse(value) as T;
            } catch (e) {
                return value as T;
            }
        }
        console.log(`❌ Redis MISS for key: ${key}`);
        return undefined;
    },

    /**
     * Sets data in Redis as a JSON string with an expiration time (TTL).
     */
    set: async (key: string, value: any, ttlSeconds?: number): Promise<boolean> => {
        const finalTTL = ttlSeconds || DEFAULT_TTL_SECONDS;
        const jsonValue = JSON.stringify(value);

        const result = await client.set(key, jsonValue, {
            EX: finalTTL,
        });

        return result === 'OK';
    },

    /**
     * Deletes one or more keys from Redis.
     */
    del: async (keys: string | string[]): Promise<number> => {
        const count = await client.del(keys);
        return count;
    },

    /**
     * Flushes all data from the current Redis database.
     */
    flush: async (): Promise<void> => {
        await client.flushAll();
        console.log('Redis Cache flushed successfully!');
    },

    /**
     * Centralized "Get or Set" pattern.
     */
    wrap: async <T>(key: string, fetcher: () => Promise<T>, ttlSeconds?: number): Promise<T> => {
        const cached = await CacheManager.get<T>(key);
        if (cached) {
            return cached;
        }

        console.log(`⚡ Fetching fresh data for: ${key}`);
        const freshData = await fetcher();

        if (freshData) {
            await CacheManager.set(key, freshData, ttlSeconds);
        }

        return freshData;
    }
};
