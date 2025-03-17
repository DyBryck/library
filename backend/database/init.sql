CREATE TABLE categorie (
  id_categorie INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL UNIQUE
);

CREATE TABLE livre (
  id_livre INTEGER PRIMARY KEY AUTOINCREMENT,
  titre TEXT NOT NULL,
  isbn TEXT UNIQUE,
  annee_publication INTEGER,
  nb_pages INTEGER,
  auteur_id INTEGER NOT NULL,
  editeur TEXT,
  categorie_id INTEGER NOT NULL,
  FOREIGN KEY (auteur_id) REFERENCES auteur(id_auteur),
  FOREIGN KEY (categorie_id) REFERENCES categorie(id_categorie)
);

CREATE INDEX idx_livre_titre ON livre(titre);

CREATE TABLE auteur (
  id_auteur INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  date_naissance DATE NOT NULL,
  nationalite TEXT NOT NULL,
  UNIQUE (nom, prenom, date_naissance, nationalite)
);

CREATE INDEX idx_auteur_nom ON auteur(nom);

CREATE TABLE membre (
  id_membre INTEGER PRIMARY KEY AUTOINCREMENT,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  adresse TEXT,
  date_inscription DATE DEFAULT (date('now')),
  UNIQUE (nom, prenom, email, adresse)
);

CREATE INDEX idx_membre_email ON membre(email);

CREATE TABLE exemplaire (
  id_exemplaire INTEGER PRIMARY KEY AUTOINCREMENT,
  id_livre INTEGER NOT NULL,
  etat TEXT NOT NULL,
  disponible INTEGER NOT NULL DEFAULT 1 CHECK (disponible IN (0,1)),
  FOREIGN KEY (id_livre) REFERENCES livre(id_livre)
);

CREATE TABLE emprunt (
  id_emprunt INTEGER PRIMARY KEY AUTOINCREMENT,
  id_membre INTEGER NOT NULL,
  id_exemplaire INTEGER NOT NULL,
  date_emprunt DATE DEFAULT (date('now')),
  date_retour_prevue DATE NOT NULL,
  date_retour_effective DATE,
  FOREIGN KEY (id_membre) REFERENCES membre(id_membre),
  FOREIGN KEY (id_exemplaire) REFERENCES exemplaire(id_exemplaire)
);

CREATE INDEX idx_emprunt_date ON emprunt(date_emprunt);

CREATE VIEW vue_exemplaires_par_livre AS
SELECT 
  l.id_livre,
  l.titre,
  SUM(CASE WHEN e.disponible = 1 THEN 1 ELSE 0 END) AS nb_exemplaires_disponibles,
  COUNT(*) AS nb_exemplaires_total
FROM livre l
JOIN exemplaire e ON e.id_livre = l.id_livre
GROUP BY l.id_livre, l.titre;

CREATE VIEW vue_livres_complete AS
SELECT
  l.id_livre,
  l.titre,
  a.id_auteur,
  a.nom AS auteur,
  l.nb_pages,
  c.id_categorie,
  c.nom AS categorie
FROM livre l
JOIN auteur a ON a.id_auteur = l.auteur_id
JOIN categorie c ON c.id_categorie = l.categorie_id;

CREATE TRIGGER update_exemplaire_apres_emprunt
AFTER INSERT ON emprunt
BEGIN
    UPDATE exemplaire
    SET disponible = 0
    WHERE id_exemplaire = NEW.ID_exemplaire;
END;

CREATE TRIGGER update_exemplaire_apres_retour
AFTER UPDATE OF date_retour_effective ON emprunt
WHEN NEW.date_retour_effective IS NOT NULL AND OLD.date_retour_effective IS NULL
BEGIN
    UPDATE exemplaire
    SET disponible = 1
    WHERE id_exemplaire = NEW.id_exemplaire;
END;