import { readFile } from "fs/promises";
import connect from "../src/db.js";

async function seedDatabase() {
  const db = await connect("./db/library.db");

  await db.run("PRAGMA foreign_keys = ON");
  const fakeData = await readFile("./db/seed.sql", "utf8");

  await db.exec(fakeData);
  console.log("Base de données peuplée avec succès.");

  await db.close();
}

seedDatabase();
