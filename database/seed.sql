INSERT INTO categorie (nom) VALUES
  ('roman'),
  ('bandes-dessinées'),
  ('recueil de poèmes'),
  ('science-fiction'),
  ('documentaire');

INSERT INTO auteur (nom, prenom, date_naissance, nationalite) VALUES
  ('Zweig', 'Stefan', '1870-11-15', 'Autrichienne'),
  ('Kaur', 'Rupi', '1978-10-04', 'Canadienne'),
  ('Camus', 'Albert', '1913-11-07', 'Française'),
  ('Rowling', 'Joanne', '1965-07-31', 'Britannique'),
  ('Herbert', 'Frank', '1920-10-08', 'Américaine');

INSERT INTO livre (titre, isbn, annee_publication, nb_pages, editeur, categorie_id) VALUES
  ('Healing Through Words', '9781398518797', 2022, 320, 'Simon & Schuster UK', 3),
  ('Harry Potter et la Chambre des Secrets', '9788831000154', 2015, 393, 'Pottermore Publishing', 1),
  ('The Silent Observer', '9781234567897', 2017, 280, 'Observer Press', 1),
  ('Comic Adventures', '9782345678901', 2020, 150, 'BD Publisher', 2),
  ('Echoes of Time', '9783456789012', 2018, 200, 'Time Press', 1),
  ('Whispers of the Soul', '9784567890123', 2019, 250, 'Poetry House', 3),
  ('Mystery at Midnight', '9785678901234', 2021, 320, 'Mystery Books', 1),
  ('The Enchanted Forest', '9786789012345', 2022, 410, 'Fantasy House', 1),
  ('Lines and Rhymes', '9787890123456', 2020, 190, 'Poetic Expressions', 3);

INSERT INTO membre (nom, prenom, email, adresse, date_inscription) VALUES
  ('Dupont', 'Jean', 'jean.dupont@mail.com', '123 rue de Paris', '2022-01-15'),
  ('Martin', 'Claire', 'claire.martin@mail.com', '45 avenue de Lyon', '2022-03-10'),
  ('Durand', 'Paul', 'paul.durand@mail.com', '78 boulevard de Marseille', '2022-05-20');

INSERT INTO exemplaire (id_livre, etat, disponible) VALUES
  (1, 'neuf', 1),
  (1, 'neuf', 1),
  (2, 'neuf', 1),
  (2, 'abîmé', 0),
  (3, 'usé', 1),
  (4, 'usé', 1),
  (5, 'usé', 1),
  (6, 'abîmé', 1),
  (7, 'abîmé', 0),
  (8, 'usé', 1),
  (9, 'usé', 1);

INSERT INTO emprunt (id_membre, id_exemplaire, date_emprunt, date_retour_prevue, date_retour_effective) VALUES
  (1, 2, '2023-07-01', '2023-07-15', NULL),
  (2, 3, '2023-06-20', '2023-07-04', '2023-07-02'),
  (3, 5, '2023-07-03', '2023-07-17', NULL);