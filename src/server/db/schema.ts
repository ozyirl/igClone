import {
  pgTable,
  text,
  varchar,
  integer,
  foreignKey,
  serial,
} from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  username: varchar("username", { length: 256 }).primaryKey(),
  fullName: text("full_name"),
});

// Images Table
export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  url: text("url"),
  description: text("description"),
  userId: varchar("user_id", { length: 256 }),
  username: varchar("username", { length: 256 }),
});

// Likes Table
export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).references(() => users.username),
  imageId: integer("image_id").references(() => images.id),
});
