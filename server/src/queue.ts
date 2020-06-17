import "dotenv/config";

import createConnection from "./database";
import Queue from "./libs/Queue";

createConnection();

Queue.processQueue();
