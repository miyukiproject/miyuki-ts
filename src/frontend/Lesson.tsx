import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { Description } from "./components/Description";
import { ExercisesList } from "./ExercisesList";
import { PageLayout } from "./components/PageLayout";
import { functional } from "./model/book";
import { Heading1, Heading2 } from "./components/Title";
import { pdep } from "./components/Book/Book.data";

const exerciseModules = import.meta.glob("../exercises/**/*", { eager: true });

const Lesson: React.FC = () => {
  const { t } = useTranslation();
  const { lessonId } = useParams();

  const lessonUrl = functional.lessons[Number(lessonId) - 1];
  const lesson = exerciseModules[`../exercises/${lessonUrl}.json`];

  return (
    <PageLayout book={pdep} chapter={functional} lesson={lesson}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* TODO use number from model */}
        <Heading1>
          {t("lessonTitle", { number: lessonId, name: lesson.name })}
        </Heading1>
        <div className="text-4xl font-bold">
          <i className={`da da-${lesson.language?.name}`}></i>
        </div>
      </div>

      {/* Intro */}
      <Description className="prose max-w-none mb-10">
        {lesson.description}
      </Description>

      {/* Exercises */}
      <Heading2>{t("exercises")}</Heading2>
      <ExercisesList lessonId={lessonId} exercises={lesson.exercises} />

      {/* Continue */}
      <Link
        to={`/lessons/${lessonId}/exercises/1`}
        className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded font-semibold">
        {t("continueLesson")}
      </Link>
    </PageLayout>
  );
};

export default Lesson;
