import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./library.db", (err) => {
    if (err) {
        return console.error("Erreur lors de l'ouverture de la base de données : ", err.message);
    }
    console.log("Connexion à la base de données établie.");
});
const runQuery = (query, params = []) => {
    db.all(query, params, (err, rows) => {
        if (err) {
            return console.error("Erreur lors de l'exécution de la requête : ", err.message);
        }
        console.table(rows);
    });
};
const queryTopAuthor = `
    SELECT 
      a.id_auteur, 
      a.nom, 
      a.prenom, 
      COUNT(l.id_livre) AS total_livres
    FROM auteur a
    JOIN livre l ON a.id_auteur = l.id_auteur
    GROUP BY a.id_auteur
    ORDER BY total_livres DESC
    LIMIT 1;
  `;
runQuery(queryTopAuthor);
const queryBooks = `
    SELECT id_livre, titre, isbn, annee_publication, nb_pages, editeur
    FROM livre;
  `;
runQuery(queryBooks);
const queryMembers = `
    SELECT id_membre, nom, prenom, email, date_inscription
    FROM membre;
  `;
runQuery(queryMembers);
const queryCurrentLoans = `
    SELECT id_emprunt, id_membre, id_exemplaire, date_emprunt, date_retour_prevue
    FROM emprunt
    WHERE date_retour_effective IS NULL;
  `;
runQuery(queryCurrentLoans);
setTimeout(() => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connexion à la base de données fermée.");
    });
}, 2000);
//# sourceMappingURL=queries.js.map