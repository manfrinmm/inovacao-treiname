import { Connection, getConnection } from "typeorm";

import createConnection from "../../src/database";

let connection: Connection;

export async function initializeConnection(): Promise<void> {
  connection = await createConnection("test-connection");

  await connection.query("DROP TABLE IF EXISTS users");
  await connection.query("DROP TABLE IF EXISTS course_modules");
  await connection.query("DROP TABLE IF EXISTS courses");
  await connection.query("DROP TABLE IF EXISTS migrations");

  await connection.runMigrations();
}

export async function truncateAll(): Promise<void> {
  await connection.query("DELETE FROM users");
  await connection.query("DELETE FROM courses");
  await connection.query("DELETE FROM course_modules");
}

export async function closeConnection(): Promise<void> {
  const mainConnection = getConnection();

  await connection.close();
  await mainConnection.close();
}
