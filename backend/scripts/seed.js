import { readFile } from "fs/promises";
import connect from "../dist/utils/databaseUtils.js";
import { DB_FILE } from "../src/config/config.js";

async function seedDatabase() {
  const db = await connect(DB_FILE);

  await db.run("PRAGMA foreign_keys = ON");
  const fakeData = await readFile("./database/seed.sql", "utf8");

  await db.exec(fakeData);
  console.log("Base de données peuplée avec succès.");

  await db.close();
}

seedDatabase();
