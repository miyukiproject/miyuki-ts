import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Main } from "../Main";
import { functional, pdep } from "../model/book";
import { ProgressBar } from "../ProgressBar";
import { ContentTitle } from "../Title";
import CodePlayground from "../CodePlayground/CodePlayground";
import {
  PlaygroundProvider,
} from "../CodePlayground/PlaygroundContext";
import PlaygroundHeader from "../CodePlayground/Header/PlaygroundHeader";
import FeedbackArea from "./FeedbackArea";
import Assignment from "./Assignment";
import { layout } from "./utils";

const exerciseModules = import.meta.glob("../exercises/**/*", { eager: true });

const Exercise: React.FC = () => {
  const { t } = useTranslation();
  const { lessonId, exerciseId } = useParams();

  const lessonUrl = functional.lessons[Number(lessonId) - 1];
  const lessonModule = exerciseModules[`../exercises/${lessonUrl}.json`];
  const lesson = lessonModule.default;
  const exercise = lesson.exercises[Number(exerciseId) - 1];
  const nextExercise = lesson.exercises[Number(exerciseId)];

  const [showHint, setShowHint] = useState<boolean>(false);
  // Fake progress
  const progress = lesson.exercises.map((_: any, i: number) => ({
    lessonId: lessonId,
    exerciseId: i + 1,
    status: i < Number(exerciseId) ? "passed" : "pending",
  }));
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  return (
    <Main
      fullscreen={fullscreen}
      book={pdep}
      chapter={functional}
      lesson={lesson}
      exercise={exercise}>
      <ContentTitle>
        {t("exerciseTitle", {
          number: Number(exerciseId),
          name: exercise.name,
        })}
      </ContentTitle>

      <PlaygroundProvider exercise={exercise}>
        {/* TODO: Save the progress? */}
        <ProgressBar items={progress} />
        <div className={`${layout.container[exercise.layout]} gap-6`}>
          <Assignment
            exercise={exercise}
            setShowHint={setShowHint}
            showHint={showHint}
          />

          <div
            className={`flex flex-col gap-4 rounded ${layout.text[exercise.layout]}`}>
            <div className="flex flex-col">
              <PlaygroundHeader />
              <CodePlayground />
            </div>
          </div>
        </div>
        <FeedbackArea nextExercise={nextExercise} />
      </PlaygroundProvider>
    </Main>
  );
};



export default Exercise;
