import { Link, useParams } from "react-router-dom";
import { Book, Chapter } from "./components/Book/Book.data";

export type BreadcrumbsProps = {
  book: Book,
  chapter?: Chapter,
  lesson?: { id: number, name: string },
  exercise?: { id: number, name: string }
}

export function Breadcrumbs({ book, chapter, lesson, exercise }: BreadcrumbsProps) {
  const { lessonId, exerciseId } = useParams();

  const chapterIndex = book.chapters.findIndex((c) => c.id === chapter?.id);
  const chapterRelativeId = chapterIndex !== -1 ? chapterIndex + 1 : chapter?.id;

  return (
    <nav className="text-gray-600 mb-4 flex items-center gap-2">
      <span className="font-semibold text-blue-600"></span>
      <Link to="/" className="hover:underline">
        {book.name}
      </Link>

      {chapter && (
        <>
          <span>/</span>
          <Link to={`/chapters/${chapter.id}`} className="hover:underline">
            {chapterRelativeId}. {chapter.name}
          </Link>
        </>
      )}

      {lesson && (
        <>
          <span>/</span>
          <Link to={`/chapters/${chapter?.id}/lessons/${lessonId || lesson.id}`} className="hover:underline">
            {lessonId || lesson.id}. {lesson.name}
          </Link>
        </>
      )}

      {exercise && (
        <>
          <span>/</span>
          <Link to={`/chapters/${chapter?.id}/lessons/${lessonId || lesson?.id}/exercises/${exerciseId || exercise.id}`} className="hover:underline">
            {exerciseId || exercise.id}. {exercise.name}
          </Link>
        </>
      )}
    </nav>
  )
}