import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { functional, chapters } from "../model/book";
import { ProgressBar } from "../ProgressBar";
import { Heading1 } from "../components/Title";
import CodePlayground from "../CodePlayground/CodePlayground";
import { PlaygroundProvider } from "../CodePlayground/PlaygroundContext";
import PlaygroundHeader from "../CodePlayground/Header/PlaygroundHeader";
import FeedbackArea from "./FeedbackArea";
import Assignment from "./Assignment";
import { layout } from "./utils";
import { PageLayout } from "../components/PageLayout";
import { pdep } from "../components/Book/Book.data";

import { useNextResource } from "../hooks/useNextResource";

const exerciseModules = import.meta.glob("../../exercises/**/*", { eager: true });

const Exercise: React.FC = () => {
  const { t } = useTranslation();
  const { chapterId, lessonId, exerciseId } = useParams();

  const chapter = chapters.find(c => c.id === Number(chapterId)) || functional;
  const lessonUrl = chapter.lessons[Number(lessonId) - 1];
  const lessonModule = (exerciseModules as any)[`../../exercises/${lessonUrl}.json`];
  const lesson = lessonModule.default;
  const exercise = lesson.exercises[Number(exerciseId) - 1];
  const nextResource = useNextResource(Number(chapterId), Number(lessonId), Number(exerciseId));

  const [showHint, setShowHint] = useState<boolean>(false);
  // Fake progress
  const progress = lesson.exercises.map((_: any, i: number) => ({
    chapterId: chapterId,
    lessonId: lessonId,
    exerciseId: i + 1,
    status: i < Number(exerciseId) ? "passed" : "pending",
  }));
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const exerciseLayout = (exercise?.layout || "input_right") as keyof typeof layout.text;

  return (
    <PageLayout
      fullscreen={fullscreen}
      book={pdep}
      chapter={chapter}
      lesson={lesson}
      exercise={exercise}
    >
      <Heading1>
        {t("exerciseTitle", {
          number: Number(exerciseId),
          name: exercise.name,
        })}
      </Heading1>

      <PlaygroundProvider exercise={exercise}>
        {/* TODO: Save the progress? */}
        <ProgressBar items={progress} />
        <div className={`${layout.container[exerciseLayout]} gap-6`}>
          <Assignment
            exercise={exercise}
            setShowHint={setShowHint}
            showHint={showHint}
          />

          <div
            className={`flex flex-col gap-4 rounded ${layout.text[exerciseLayout]}`}
          >
            <div className="flex flex-col">
              <PlaygroundHeader />
              <CodePlayground />
            </div>
          </div>
        </div>
        <FeedbackArea nextResource={nextResource} />
      </PlaygroundProvider>
    </PageLayout>
  );
};

export default Exercise;
