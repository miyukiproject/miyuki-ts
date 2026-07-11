import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { Description } from "../Description";
import { ExercisesList } from "../../ExercisesList";
import { PageLayout } from "../PageLayout";
import { functional } from "../../model/book";
import { pdep } from "../Book/Book.data";
import { LessonHeader } from "./LessonHeader";
import { Heading2 } from "../Title";
import { useProgress } from "../../contexts/ProgressContext";

const exerciseModules = import.meta.glob("../../../exercises/**/*", { eager: true });

export const Lesson: React.FC = () => {
  const { t } = useTranslation();
  const { lessonId } = useParams();
  const { bookProgress } = useProgress();

  const lessonUrl = functional.lessons[Number(lessonId) - 1];
  const lesson: any = exerciseModules[`../../../exercises/${lessonUrl}.json`];

  return (
    <PageLayout book={pdep} chapter={functional} lesson={lesson}>
      <LessonHeader lesson={lesson} id={lessonId!} />

      <Description className="prose max-w-none mb-10">
        {lesson.description}
      </Description>

      <Heading2>{t("exercises")}</Heading2>
      <ExercisesList
        lessonId={lessonId}
        exercises={lesson.exercises}
        bookProgress={bookProgress}
        chapterId={Number(functional.id) || 1}
        lessonIdNum={Number(lesson.id) || 1}
      />

      <StartLessonButton id={lessonId!}/>

    </PageLayout>
  );
};

type StartLessonButtonProps = {
  id: string
}

const StartLessonButton = ({ id }: StartLessonButtonProps) => {
  const { t } = useTranslation();

  return <Link
    to={`/lessons/${id}/exercises/1`}
    className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded font-semibold">
    {t("continueLesson")}
  </Link>
}
