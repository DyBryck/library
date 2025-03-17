import { readFile } from "fs/promises";
import connect from "../dist/utils/databaseUtils.js";
import { DB_FILE } from "../src/config/config.js";

async function initDatabase() {
  const db = await connect(DB_FILE);

  await db.run("PRAGMA foreign_keys = ON");
  const initSQL = await readFile("./database/init.sql", "utf8");

  await db.exec(initSQL);
  console.log("Base de données initialisée avec succès.");

  await db.close();
}

initDatabase();
