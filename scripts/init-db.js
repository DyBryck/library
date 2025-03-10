import { readFile } from "fs/promises";
import connect from "../src/db.js";

async function initDatabase() {
  const db = await connect("./db/library.db");

  await db.run("PRAGMA foreign_keys = ON");
  const initSQL = await readFile("./db/init.sql", "utf8");

  await db.exec(initSQL);
  console.log("Base de données initialisée avec succès.");

  await db.close();
}

initDatabase();
