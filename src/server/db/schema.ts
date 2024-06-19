import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  foreignKey,
} from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});

// Images Table
export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  url: text("url"),
  description: text("description"),
  userId: integer("user_id").references(() => users.id),
});

// Likes Table
export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  imageId: integer("image_id").references(() => images.id),
});
