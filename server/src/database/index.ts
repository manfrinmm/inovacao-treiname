import { createConnections, Connection, getConnectionOptions } from "typeorm";

export default async (name = "default"): Promise<Connection[]> => {
  const defaultOptions = await getConnectionOptions();
  const mongoOptions = await getConnectionOptions("mongo");

  return createConnections([
    Object.assign(defaultOptions, {
      name,
      database:
        process.env.NODE_ENV === "test"
          ? "inovacao-treiname-teste"
          : defaultOptions.database,
    }),

    Object.assign(mongoOptions, {
      database:
        process.env.NODE_ENV === "test"
          ? "inovacao-treiname-teste"
          : mongoOptions.database,
    }),
  ]);
};
