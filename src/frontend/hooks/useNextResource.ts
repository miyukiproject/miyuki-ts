import { useTranslation } from "react-i18next";
import { functional, chapters } from "../model/book";

const exerciseModules = import.meta.glob("../../exercises/**/*", { eager: true });

export const useNextResource = (chapterId: number, lessonId: number, exerciseId: number) => {
  const { t } = useTranslation();

  // For now we assume the current chapter is 'functional' if cId is 1
  // In a real app, we would look up the chapter by cId
  const chapter = chapters.find(c => c.id === chapterId) || functional;

  const lessonUrl = chapter.lessons[lessonId - 1];
  const lessonModule: any = exerciseModules[`../../exercises/${lessonUrl}.json`];
  const lesson = lessonModule.default;
  const nextExercise = lesson.exercises[exerciseId];

  if (nextExercise) {
    return {
      name: nextExercise.name,
      to: `/chapters/${chapterId}/lessons/${lessonId}/exercises/${exerciseId + 1}`,
      kind: t("exercise"),
    };
  }

  const nextLessonUrl = chapter.lessons[lessonId];
  if (nextLessonUrl) {
    const nextLessonModule: any = exerciseModules[`../../exercises/${nextLessonUrl}.json`];
    return {
      name: nextLessonModule.default.name,
      to: `/chapters/${chapterId}/lessons/${lessonId + 1}/exercises/1`,
      kind: t("lesson"),
    };
  }

  const nextChapter = chapters.find(c => c.id === chapterId + 1);
  if (nextChapter) {
    return {
      name: nextChapter.name,
      to: `/chapters/${chapterId + 1}`,
      kind: t("chapter"),
    };
  }

  return {
    name: t("home"),
    to: "/",
    kind: t("home"),
  };
};
