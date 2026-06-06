import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Description } from "./components/Description";
import { ExercisesList } from "./ExercisesList";
import { PageLayout } from "./components/PageLayout";
import { functional } from "./model/book";
import { Heading1, Heading2, Heading3 } from "./components/Title";
import { pdep } from "./components/Book/Book.data";

const chapter = functional;
const exerciseModules = import.meta.glob("../exercises/**/*", { eager: true });

const lessons = chapter.lessons.map((url: string) => {
  const path = `../exercises/${url}.json`;
  return exerciseModules[path];
});
const Chapter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageLayout book={pdep} chapter={chapter}>
      {/* Header */}
      <header className="mb-8">
        <Heading1>
          {t("chapterTitle", {
            number: chapter.id,
            name: chapter.name,
          })}
        </Heading1>

        <Description className="bg-white p-4 flex gap-4">
          {chapter.description}
        </Description>
      </header>

      {/* Lessons */}
      <section>
        <Heading3>{t("lessons")}</Heading3>

        {lessons.map((lesson, index) => {
          console.log(lesson)
          return (
            <div key={lesson.id} className="mb-8">
              <Heading2>
                {index + 1}.{" "}
                <Link
                  to={`/lessons/${index + 1}`}
                  className="text-blue-600 hover:underline">
                  {lesson.name}
                </Link>
              </Heading2>

              <ExercisesList
                lessonId={`${index + 1}`}
                exercises={lesson.exercises}
              />
            </div>
          );
        })}
      </section>

      {/* Appendix */}
      <section className="mt-10">
        <Heading2>{t("appendix")}</Heading2>

        <p className="text-gray-600">
          {t("appendixTeaser")}{" "}
          <Link
            to={`/chapters/${chapter.id}/appendix`}
            className="text-blue-600 hover:underline">
            {t("appendixLink")}
          </Link>
        </p>
      </section>
    </PageLayout>
  );
};

export default Chapter;
