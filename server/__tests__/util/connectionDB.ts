import { Connection, getConnection } from "typeorm";

import SubmitExamsRepository from "../../src/app/repositories/SubmitExamsRepository";
import createConnection from "../../src/database";

let connection: Connection[];
let submitExamsRepository: SubmitExamsRepository;

export async function initializeConnection(): Promise<void> {
  connection = await createConnection("test-connection");

  await connection[0].query("DROP TABLE IF EXISTS admins");
  await connection[0].query("DROP TABLE IF EXISTS logs");
  await connection[0].query("DROP TABLE IF EXISTS user_courses");
  await connection[0].query("DROP TABLE IF EXISTS exam_questions");
  await connection[0].query("DROP TABLE IF EXISTS course_modules");
  await connection[0].query("DROP TABLE IF EXISTS courses");
  await connection[0].query("DROP TABLE IF EXISTS users");
  await connection[0].query("DROP TABLE IF EXISTS migrations");

  await connection[0].runMigrations();

  submitExamsRepository = new SubmitExamsRepository();
}

export async function truncateAll(): Promise<void> {
  await connection[0].query("DELETE FROM users");
  await connection[0].query("DELETE FROM admins");
  await connection[0].query("DELETE FROM courses");
  await connection[0].query("DELETE FROM exam_questions");
  await connection[0].query("DELETE FROM course_modules");
  await connection[0].query("DELETE FROM logs");
  await connection[0].query("DELETE FROM user_courses");

  await submitExamsRepository.truncate();
}

export async function closeConnection(): Promise<void> {
  const mainConnection = getConnection("test-connection");
  const mongoConnection = getConnection("mongo");

  await Promise.all([mainConnection.close(), mongoConnection.close()]);
}
