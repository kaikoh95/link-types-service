import NodeCache from 'node-cache';
import logger from '../logger';

export default class LocalCache {
  private static client = new NodeCache();

  keys(): string[] {
    if (LocalCache.client) {
      return LocalCache.client.keys();
    }
    logger.warn('NO-CACHE: (save) No cache client available.');
    return [];
  }

  set(key: string, data: string, ttl: number = 300) {
    if (LocalCache.client) {
      LocalCache.client.set(key, `${data}`, ttl < 0 ? 300 : ttl);
      logger.info(`LOCAL-CACHE: (saved) key: ${key} ttl: ${ttl}`);
    } else {
      logger.warn('NO-CACHE: (save) No cache client available.');
    }
  }

  del(key: string) {
    if (LocalCache.client) {
      LocalCache.client.del(key);
      logger.info(`LOCAL-CACHE: (removed) key: ${key}`);
    } else {
      logger.warn('NO-CACHE: (removed) No cache client available.');
    }
  }

  async get(key: string, log: boolean = true): Promise<string> {
    if (key && LocalCache.client) {
      if (log) logger.info(`LOCAL-CACHE: (get) key: ${key}`);
      let data: string;
      try {
        data = await LocalCache.client.get(key);
      } catch (e) {
        logger.warn(`LOCAL-CACHE: ERR (get) ${key} : ${e.message}`);
      }
      return data;
    }
    logger.warn('NO-CACHE: (get) No cache client available.');
    return null;
  }
}
