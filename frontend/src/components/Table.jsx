import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export function TableDemo() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/livres")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Érreur dans la récupération des livres");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data.bookList.data);
      });
  }, []);

  return (
    <Table>
      <TableCaption>Liste des livres trouvés.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Titre</TableHead>
          <TableHead>Auteur</TableHead>
          <TableHead>Nombre de pages</TableHead>
          <TableHead className="text-right">Catégorie</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book.id_livre}>
            <TableCell className="font-medium">{book.titre}</TableCell>
            <TableCell>{book.auteur}</TableCell>
            <TableCell>{book.nb_pages}</TableCell>
            <TableCell className="text-right">{book.categorie}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{books.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
