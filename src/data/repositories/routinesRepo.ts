import { db } from '../db';
import { routines, routineTasks } from '../schema';
import { eq } from 'drizzle-orm';

export type RoutineTaskRow = { id: number; routineId: number; text: string; position: number | null; completed: number };
export type RoutineRow = { id: number; title: string; position: number | null };

export type RoutineWithTasks = {
  id: number;
  title: string;
  tasks: Array<{ id: number; text: string; completed: boolean; position: number | null }>;
};

export async function listRoutines(): Promise<RoutineWithTasks[]> {
  const routineRows = (await db.select().from(routines)) as any as RoutineRow[];
  const taskRows = (await db.select().from(routineTasks)) as any as RoutineTaskRow[];

  return routineRows
    .sort((a, b) => (a.position ?? a.id) - (b.position ?? b.id))
    .map((r) => ({
      id: r.id,
      title: r.title,
      tasks: taskRows
        .filter((t) => t.routineId === r.id)
        .sort((a, b) => (a.position ?? a.id) - (b.position ?? b.id))
        .map((t) => ({ id: t.id, text: t.text, completed: !!t.completed, position: t.position })),
    }));
}

export async function createRoutine(initialTitle: string, withPlaceholderTask: boolean): Promise<number> {
  const res = await db.insert(routines).values({ title: initialTitle, createdAt: new Date() });
  // expo-sqlite doesn't return inserted id; fetch last row id by selecting max(id)
  const rows = (await db.select().from(routines)) as any as RoutineRow[];
  const newId = Math.max(...rows.map((r) => r.id));
  if (withPlaceholderTask) {
    await db.insert(routineTasks).values({ routineId: newId, text: '', createdAt: new Date() });
  }
  return newId;
}

export async function saveRoutine(id: number, title: string, taskTexts: string[]) {
  await db.update(routines).set({ title }).where(eq(routines.id, id));
  // Replace tasks: delete old, insert new
  await db.delete(routineTasks).where(eq(routineTasks.routineId, id));
  if (taskTexts.length) {
    const values = taskTexts.map((text, i) => ({ routineId: id, text, position: i, createdAt: new Date() }));
    await db.insert(routineTasks).values(values);
  }
}

export async function toggleTask(taskId: number, completed: boolean) {
  await db.update(routineTasks).set({ completed }).where(eq(routineTasks.id, taskId));
}

export async function ensureUniqueRoutineTitle(base: string, excludeId?: number): Promise<string> {
  const rows = (await db.select().from(routines)) as any as RoutineRow[];
  const existing = rows.filter((r) => (excludeId ? r.id !== excludeId : true)).map((r) => r.title);
  if (!existing.includes(base)) return base;
  let i = 1;
  let candidate = `${base} (${i})`;
  while (existing.includes(candidate)) {
    i += 1;
    candidate = `${base} (${i})`;
  }
  return candidate;
}
