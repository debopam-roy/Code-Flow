import { Injectable } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';

@Injectable()
export class RedisService {
  private readonly client: RedisClientType;

  constructor() {
    this.client = createClient({ url: process.env.REDIS_URI });
    this.client
      .connect()
      .then(() => {
        console.log('Redis client connected successfully');
      })
      .catch((error) => {
        console.error('Error connecting to Redis:', error);
      });
  }

  // Get the value of a key from Redis
  async get(key: string): Promise<any | null> {
    try {
      const value = await this.client.get(key);
      if (!value) {
        console.log(`Key ${key} not found in Redis.`);
      }
      return value;
    } catch (error) {
      throw new Error(`Failed to get value for key: ${key}`);
    }
  }

  // Set a key with a TTL (expiry in seconds)
  async setWithExpiry(key: string, value: string, ttl: number): Promise<void> {
    try {
      await this.client.set(key, value, { EX: ttl });
    } catch (error) {
      console.error(`Error setting key: ${key}`, error);
      throw new Error(`Failed to set key: ${key}`);
    }
  }

  // Set a key without expiry
  async setWithoutExpiry(key: string, value: string): Promise<void> {
    try {
      await this.client.set(key, value);
    } catch (error) {
      console.error(`Error setting key: ${key}`, error);
      throw new Error(`Failed to set key: ${key}`);
    }
  }

  // Delete a key from Redis
  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error(`Error deleting key: ${key}`, error);
      throw new Error(`Failed to delete key: ${key}`);
    }
  }

  // Check if a key exists
  async exists(key: string): Promise<boolean> {
    try {
      const exists = await this.client.exists(key);
      console.log(`Key ${key} exists:`, exists > 0);
      return exists > 0;
    } catch (error) {
      console.error(`Error checking existence of key: ${key}`, error);
      throw new Error(`Failed to check key existence: ${key}`);
    }
  }

  // Set a key to a Redis Hash (e.g., for storing RoomDTO objects)
  async setHash(key: string, hash: Record<string, any>): Promise<void> {
    try {
      await this.client.hSet(key, hash);
    } catch (error) {
      console.error(`Error setting hash: ${key}`, error);
      throw new Error(`Failed to set hash: ${key}`);
    }
  }

  // Get all fields in a Redis Hash
  async getHash(key: string): Promise<Record<string, string>> {
    try {
      const hash = await this.client.hGetAll(key);
      return hash;
    } catch (error) {
      console.error(`Error retrieving hash for key: ${key}`, error);
      throw new Error(`Failed to get hash: ${key}`);
    }
  }

  // Get a single field from a Redis Hash
  async getHashField(key: string, field: string): Promise<string | null> {
    try {
      const value = await this.client.hGet(key, field);
      return value;
    } catch (error) {
      console.error(
        `Error retrieving hash field ${field} for key: ${key}`,
        error,
      );
      throw new Error(`Failed to get hash field: ${field}`);
    }
  }

  // Set a key to a Redis Set (e.g., for storing a set of RoomDTO IDs)
  async addToSet(key: string, ...values: string[]): Promise<void> {
    try {
      await this.client.sAdd(key, values);
    } catch (error) {
      console.error(`Error adding to set: ${key}`, error);
      throw new Error(`Failed to add to set: ${key}`);
    }
  }

  // Get all values in a Redis Set
  async getFromSet(key: string): Promise<string[]> {
    try {
      const members = await this.client.sMembers(key);
      return members;
    } catch (error) {
      console.error(`Error retrieving set members for key: ${key}`, error);
      throw new Error(`Failed to get set members: ${key}`);
    }
  }
}
