import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';

export const sqlite = SQLite.openDatabaseSync('nimbus.db');
export const db = drizzle(sqlite);
