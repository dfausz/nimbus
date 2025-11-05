CREATE TABLE `routines` (
  `id` integer PRIMARY KEY NOT NULL,
  `title` text NOT NULL,
  `position` integer,
  `created_at` integer
);
--> statement-breakpoint
CREATE TABLE `routine_tasks` (
  `id` integer PRIMARY KEY NOT NULL,
  `routine_id` integer NOT NULL,
  `text` text NOT NULL,
  `position` integer,
  `completed` integer DEFAULT 0,
  `created_at` integer
);

