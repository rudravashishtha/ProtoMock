import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const schema = pgTable("protomock", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
  numberOfQuestions: varchar("numberOfQuestions").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});
