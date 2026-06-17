import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { Description } from "../Description";
import { ExercisesList } from "../../ExercisesList";
import { PageLayout } from "../PageLayout";
import { functional, chapters } from "../../model/book";
import { pdep } from "../Book/Book.data";
import { LessonHeader } from "./LessonHeader";
import { Heading2 } from "../Title";

const exerciseModules = import.meta.glob("../../../exercises/**/*", { eager: true });

export const Lesson: React.FC = () => {
  const { t } = useTranslation();
  const { chapterId, lessonId } = useParams();

  const chapter = chapters.find(c => c.id === Number(chapterId)) || functional;
  const lessonUrl = chapter.lessons[Number(lessonId) - 1];
  const lesson: any = exerciseModules[`../../../exercises/${lessonUrl}.json`];

  return (
    <PageLayout book={pdep} chapter={chapter} lesson={lesson}>
      <LessonHeader lesson={lesson} id={lessonId!} />

      <Description className="prose max-w-none mb-10">
        {lesson.description}
      </Description>

      <Heading2>{t("exercises")}</Heading2>
      <ExercisesList chapterId={chapterId} lessonId={lessonId} exercises={lesson.exercises} />

      <StartLessonButton chapterId={chapterId!} id={lessonId!}/>

    </PageLayout>
  );
};

type StartLessonButtonProps = {
  chapterId: string,
  id: string
}

const StartLessonButton = ({ chapterId, id }: StartLessonButtonProps) => {
  const { t } = useTranslation();

  return <Link
    to={`/chapters/${chapterId}/lessons/${id}/exercises/1`}
    className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded font-semibold">
    {t("continueLesson")}
  </Link>
}
