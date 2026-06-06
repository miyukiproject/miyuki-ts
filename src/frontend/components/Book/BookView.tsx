import { PageLayout } from "../PageLayout";
import { Book } from "./Book.data";
import { BookHeader } from "./BookHeader";
import { ChaptersView } from "./Chapter/ChaptersView";

type BookViewProps = {
  book: Book
}

export const BookView = ({ book }: BookViewProps) => (
  <PageLayout book={book}>
    <BookHeader name={book.name} description={book.description} />
    <ChaptersView chapters={book.chapters} />
  </PageLayout>
);