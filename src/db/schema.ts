import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const moods = sqliteTable('moods', {
  id: integer('id').primaryKey(),
  date: text('date').notNull().unique(), // YYYY-MM-DD
  mood: text('mood').notNull(),          // validate in app
  note: text('note'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }),
});

export const habits = sqliteTable('habits', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  cadence: text('cadence').notNull(), // daily/weekly/custom JSON
  color: text('color'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }),
  archivedAt: integer('archived_at', { mode: 'timestamp_ms' }),
});

export const habitLogs = sqliteTable('habit_logs', {
  id: integer('id').primaryKey(),
  habitId: integer('habit_id').notNull(),
  date: text('date').notNull(),
  value: integer('value').default(1),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }),
});

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  dueDate: text('due_date'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }),
  completedAt: integer('completed_at', { mode: 'timestamp_ms' }),
});
