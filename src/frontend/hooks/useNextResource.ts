import { useTranslation } from "react-i18next";
import { functional, chapters } from "../model/book";

const exerciseModules = import.meta.glob("../../exercises/**/*", { eager: true });

export const useNextResource = (chapterId: string | undefined, lessonId: string | undefined, exerciseId: string | undefined) => {
  const { t } = useTranslation();

  const cId = Number(chapterId);
  const lId = Number(lessonId);
  const eId = Number(exerciseId);

  // For now we assume the current chapter is 'functional' if cId is 1
  // In a real app, we would look up the chapter by cId
  const chapter = chapters.find(c => c.id === cId) || functional;

  const lessonUrl = chapter.lessons[lId - 1];
  const lessonModule: any = exerciseModules[`../../exercises/${lessonUrl}.json`];
  const lesson = lessonModule.default;
  const nextExercise = lesson.exercises[eId];

  if (nextExercise) {
    return {
      name: nextExercise.name,
      to: `/chapters/${cId}/lessons/${lId}/exercises/${eId + 1}`,
      kind: t("exercise"),
    };
  }

  const nextLessonUrl = chapter.lessons[lId];
  if (nextLessonUrl) {
    const nextLessonModule: any = exerciseModules[`../../exercises/${nextLessonUrl}.json`];
    return {
      name: nextLessonModule.default.name,
      to: `/chapters/${cId}/lessons/${lId + 1}/exercises/1`,
      kind: t("lesson"),
    };
  }

  const nextChapter = chapters.find(c => c.id === cId + 1);
  if (nextChapter) {
    return {
      name: nextChapter.name,
      to: `/chapters/${cId + 1}`,
      kind: t("chapter"),
    };
  }

  return {
    name: t("home"),
    to: "/",
    kind: t("home"),
  };
};
