import { ChapterList } from "../Chapter/ChapterList";
import { PageLayout } from "../PageLayout";
import { Book } from "./Book.data";
import { BookHeader } from "./BookHeader";

type BookViewProps = {
  book: Book
}

export const BookView = ({ book }: BookViewProps) => (
  <PageLayout book={book}>
    <BookHeader name={book.name} description={book.description} />
    <ChapterList chapters={book.chapters} />
  </PageLayout>
);