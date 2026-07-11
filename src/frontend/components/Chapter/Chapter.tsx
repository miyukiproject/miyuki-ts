import { Navigate, useParams } from "react-router-dom";
import { PageLayout } from "../PageLayout";
import { pdep } from "../Book/Book.data";
import { DeepPartial } from "../../helpers/DeepPartial";
import { Exercise } from "../../model/guide";
import { ChapterHeader } from "./ChapterHeader";
import { LessonsList } from "../Lesson/LessonsList";
import { AppendixLink } from "../AppendixLink";

const exerciseModules = import.meta.glob("../../../exercises/**/*.json", {
  eager: true,
});

type LessonContent = {
  id: number;
  name: string;
  exercises: DeepPartial<Exercise>[];
};

export const Chapter = () => {
  const { chapterId } = useParams();

  const loadJson = <T,>(slug: string): T | undefined =>
    (exerciseModules[`../../../exercises/${slug}.json`] as { default: T } | undefined)
      ?.default;

  const loadLessons = (chapterSource: string): LessonContent[] => {
    const content = loadJson<{ lessons: string[] }>(chapterSource);
    if (!content) return [];
    return content.lessons
      .map((slug) => loadJson<LessonContent>(slug))
      .filter((lesson): lesson is LessonContent => Boolean(lesson));
  };

  const chapter = pdep.chapters.find((c) => c.id === Number(chapterId));

  if (!chapter) return <Navigate to="/" replace />;

  const lessons = chapter.source ? loadLessons(chapter.source) : [];

  return (
    <PageLayout book={pdep} chapter={chapter}>
      <ChapterHeader id={chapter.id} name={chapter.name} description={chapter.description} />
      <LessonsList chapterId={chapter.id} lessons={lessons} />
      <AppendixLink chapterId={chapter.id} />
    </PageLayout>
  );
};
