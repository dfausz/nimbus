import { db } from '../db';
import { moods } from '../schema';
import { eq, and, gte, lte } from 'drizzle-orm';

export type MoodKey = 'sunny' | 'partly' | 'cloudy' | 'rain' | 'storm' | 'snow';

export async function setMoodForDate(date: string, mood: MoodKey, note?: string) {
  // Upsert by date
  await db
    .insert(moods)
    .values({ date, mood, note, createdAt: new Date() })
    .onConflictDoUpdate({
      target: moods.date,
      set: { mood, note },
    });
}

export async function getMoodForDate(date: string) {
  const rows = await db.select().from(moods).where(eq(moods.date, date)).limit(1);
  return rows[0] ?? null;
}

// Handy if you want a window for charts
export async function getMoodRange(fromYmd: string, toYmd: string) {
  // Use the typed query builder instead of a raw execute call so TypeScript
  // understands the returned shape and we avoid driver-specific methods.
  const rows = await db
    .select({ date: moods.date, mood: moods.mood })
    .from(moods)
    .where(and(gte(moods.date, fromYmd), lte(moods.date, toYmd)))
    .orderBy(moods.date);

  return rows as Array<{ date: string; mood: MoodKey }>;
}

export async function deleteMoodForDate(date: string) {
  await db.delete(moods).where(eq(moods.date, date));
}
