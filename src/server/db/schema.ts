import {
  pgTable,
  text,
  varchar,
  integer,
  foreignKey,
  serial,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: varchar("username", { length: 256 }).primaryKey(),
  fullName: text("full_name"),
});

// Define images table
export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  url: text("url"),
  description: text("description"),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  uploadedBy: varchar("uploadedBy", { length: 256 }),
  profileImageUrl: varchar("profileImageUrl"),
});

// Define likes table
export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  imageId: integer("image_id").references(() => images.id),
});
