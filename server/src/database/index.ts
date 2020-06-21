import { createConnections, Connection, getConnectionOptions } from "typeorm";

export default async (name = "default"): Promise<Connection[]> => {
  const defaultOptions = await getConnectionOptions();
  const mongoOptions = await getConnectionOptions("mongo");

  return createConnections([
    Object.assign(defaultOptions, {
      name,
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT || 5432),
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database:
        process.env.NODE_ENV === "test"
          ? "inovacao-treiname-teste"
          : process.env.PG_DATABASE,
    }),

    Object.assign(mongoOptions, {
      host: process.env.MG_HOST,
      port: Number(process.env.MG_PORT || 27017),
      username: process.env.MG_USER,
      password: process.env.MG_PASS,
      database:
        process.env.NODE_ENV === "test"
          ? "inovacao-treiname-teste"
          : defaultOptions.database,
    }),
  ]);
};
