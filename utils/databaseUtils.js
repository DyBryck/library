import { open } from "sqlite";
import sqlite3 from "sqlite3";

const connect = async (dbfile) => {
  try {
    const db = await open({
      filename: dbfile,
      driver: sqlite3.Database,
    });

    console.log("Connexion avec la base de données réussie");

    return db;
  } catch (error) {}
};

export default connect;
