CREATE TABLE `habit_logs` (
	`id` integer PRIMARY KEY NOT NULL,
	`habit_id` integer NOT NULL,
	`date` text NOT NULL,
	`value` integer DEFAULT 1,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `habits` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`cadence` text NOT NULL,
	`color` text,
	`created_at` integer,
	`archived_at` integer
);
--> statement-breakpoint
CREATE TABLE `moods` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`mood` text NOT NULL,
	`note` text,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `moods_date_unique` ON `moods` (`date`);--> statement-breakpoint
CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`due_date` text,
	`created_at` integer,
	`completed_at` integer
);
