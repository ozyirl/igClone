import {
  pgTable,
  text,
  varchar,
  integer,
  foreignKey,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  userId: varchar("username", { length: 256 }).primaryKey(),
  fullName: text("full_name"),
  profileImageUrl: varchar("profileImageUrl"),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  url: text("url"),
  description: text("description"),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  uploadedBy: varchar("uploadedBy", { length: 256 }),
  profileImageUrl: varchar("profileImageUrl"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  imageId: integer("image_id").references(() => images.id),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  imageId: integer("image_id").references(() => images.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const userRelationships = pgTable("user_relationships", {
  id: serial("id").primaryKey(),
  followerId: varchar("follower_id", { length: 256 }).references(
    () => users.userId,
  ),
  followingId: varchar("following_id", { length: 256 }).references(
    () => users.userId,
  ),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
