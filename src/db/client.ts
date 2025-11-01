import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';

export const sqlite = SQLite.openDatabaseSync('nimbus.db'); // iOS/Android
export const db = drizzle(sqlite);
