CREATE TABLE `config` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_DATE) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `config_key_unique` ON `config` (`key`);--> statement-breakpoint
CREATE TABLE `new_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_DATE) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `new_events_id_unique` ON `new_events` (`id`);--> statement-breakpoint
CREATE INDEX `username_idx` ON `new_events` (`username`);