import { createConnection, getConnectionOptions, Connection } from "typeorm";

createConnection();

export default async (name = "default"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      database:
        process.env.NODE_ENV === "test"
          ? "inovacao-treiname-teste"
          : defaultOptions.database,
    }),
  );
};
