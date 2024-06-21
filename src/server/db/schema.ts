import {
  pgTable,
  text,
  varchar,
  integer,
  foreignKey,
  serial,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  username: varchar("username", { length: 256 }).primaryKey(),
  fullName: text("full_name"),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  url: text("url"),
  description: text("description"),
  userId: varchar("user_id", { length: 256 }),
  uploadedBy: varchar("uploadedBy", { length: 256 }),
  profileImageUrl: varchar("profileImageUrl"),
});

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).references(() => users.username),
  imageId: integer("image_id").references(() => images.id),
});
