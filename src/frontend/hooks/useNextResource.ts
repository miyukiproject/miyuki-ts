import { useTranslation } from "react-i18next";
import { functional } from "../model/book";

const exerciseModules = import.meta.glob("../../exercises/**/*", { eager: true });

export const useNextResource = (lessonId: string | undefined, exerciseId: string | undefined) => {
  const { t } = useTranslation();

  const lId = Number(lessonId);
  const eId = Number(exerciseId);

  const lessonUrl = functional.lessons[lId - 1];
  const lessonModule: any = exerciseModules[`../../exercises/${lessonUrl}.json`];
  const lesson = lessonModule.default;
  const nextExercise = lesson.exercises[eId];

  if (nextExercise) {
    return {
      name: nextExercise.name,
      to: `/lessons/${lId}/exercises/${eId + 1}`,
      kind: t("exercise"),
    };
  }

  const nextLessonUrl = functional.lessons[lId];
  if (nextLessonUrl) {
    const nextLessonModule: any = exerciseModules[`../../exercises/${nextLessonUrl}.json`];
    return {
      name: nextLessonModule.default.name,
      to: `/lessons/${lId + 1}/exercises/1`,
      kind: t("lesson"),
    };
  }

  return {
    name: functional.name,
    to: `/chapters/${functional.id}`,
    kind: t("chapter"),
  };
};
