import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { functional } from "../model/book";
import { Heading1 } from "../components/Title";
import CodePlayground from "../CodePlayground/CodePlayground";
import { PlaygroundProvider } from "../CodePlayground/PlaygroundContext";
import PlaygroundHeader from "../CodePlayground/Header/PlaygroundHeader";
import FeedbackArea from "./FeedbackArea";
import Assignment from "./Assignment";
import { layout } from "./utils";
import { PageLayout } from "../components/PageLayout";
import { pdep } from "../components/Book/Book.data";
import { ProgressBar } from "../ProgressBar";
import { saveExerciseProgress, StoredBookProgress } from "../helpers/progressStorage";
import { ProgressStatus } from "../ProgressStatus";
import { ProgressState } from "../model/progress";
import { useProgress } from "../contexts/ProgressContext";

type SavedChapter = StoredBookProgress["chapters"][number];
type SavedLesson = SavedChapter["lessons"][number];
type SavedExercise = SavedLesson["exercises"][number];

const exerciseModules = import.meta.glob("../../exercises/**/*", { eager: true });

const progressStatusByState: Record<string, ProgressStatus> = {
  passed: "passed",
  passed_with_warnings: "passed",
  error: "error",
};

const upsertBookProgress = (
  current: StoredBookProgress | null,
  scope: { bookId: number; chapterId: number; lessonId: number; exerciseId: number },
  solution: string,
  state: ProgressState,
) => {
  const nextProgress: StoredBookProgress =
    current ?? { book_id: scope.bookId, chapters: [] };
  const nextChapter: SavedChapter =
    nextProgress.chapters.find((chapter) => chapter.chapter_id === scope.chapterId) ?? {
      chapter_id: scope.chapterId,
      lessons: [],
    };
  const nextLesson: SavedLesson =
    nextChapter.lessons.find((savedLesson) => savedLesson.lesson_id === scope.lessonId) ?? {
      lesson_id: scope.lessonId,
      exercises: [],
    };

  const nextExercise: SavedExercise = {
    exercise_id: scope.exerciseId,
    solution,
    state,
  };

  const exerciseIndex = nextLesson.exercises.findIndex(
    (saved) => saved.exercise_id === scope.exerciseId,
  );

  if (exerciseIndex >= 0) {
    nextLesson.exercises[exerciseIndex] = nextExercise;
  } else {
    nextLesson.exercises.push(nextExercise);
  }

  if (!nextChapter.lessons.includes(nextLesson)) {
    nextChapter.lessons.push(nextLesson);
  }

  if (!nextProgress.chapters.includes(nextChapter)) {
    nextProgress.chapters.push(nextChapter);
  }

  return { ...nextProgress };
};

const Exercise: React.FC = () => {
  const { t } = useTranslation();
  const { lessonId, exerciseId } = useParams();
  const { bookProgress, updateProgress } = useProgress();

  const lessonUrl = functional.lessons[Number(lessonId) - 1];
  const lessonModule = exerciseModules[`../../exercises/${lessonUrl}.json`] as { default: any };
  const lesson = lessonModule.default;
  const exercise = lesson.exercises[Number(exerciseId) - 1];
  const nextExercise = lesson.exercises[Number(exerciseId)];
  const exerciseLayout = exercise.layout as keyof typeof layout.container;
  const progressScope = {
    bookId: (pdep as any).id ?? 1,
    chapterId: functional.id,
    lessonId: lesson.id,
    exerciseId: exercise.id,
  };

  const [showHint, setShowHint] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (exercise.type !== "reading") {
      return;
    }

    const chapterIndex = bookProgress?.chapters.findIndex(
      (chapter) => chapter.chapter_id === progressScope.chapterId,
    );
    const lessonIndex = bookProgress?.chapters[chapterIndex ?? -1]?.lessons.findIndex(
      (savedLesson) => savedLesson.lesson_id === progressScope.lessonId,
    );
    const exerciseIndex = bookProgress?.chapters[chapterIndex ?? -1]?.lessons[
      lessonIndex ?? -1
    ]?.exercises.findIndex((saved) => saved.exercise_id === progressScope.exerciseId);

    const alreadySaved =
      chapterIndex != null &&
      chapterIndex >= 0 &&
      lessonIndex != null &&
      lessonIndex >= 0 &&
      exerciseIndex != null &&
      exerciseIndex >= 0;

    if (alreadySaved) {
      return;
    }

    void saveExerciseProgress(progressScope, "", "passed");
    updateProgress(upsertBookProgress(bookProgress, progressScope, "", "passed"));
  }, [bookProgress, exercise.type, progressScope, updateProgress]);

  const progress = useMemo(
    () =>
      lesson.exercises.map((lessonExercise: any, index: number) => {
        const savedExercise = bookProgress?.chapters
          ?.find((chapter) => chapter.chapter_id === progressScope.chapterId)
          ?.lessons?.find((savedLesson) => savedLesson.lesson_id === progressScope.lessonId)
          ?.exercises?.find((saved) => saved.exercise_id === lessonExercise.id);

        return {
          lessonId: lessonId ?? "0",
          routeExerciseId: index + 1,
          exerciseId: lessonExercise.id,
          status: savedExercise
            ? progressStatusByState[savedExercise.state] ?? "pending"
            : "pending",
        };
      }),
    [bookProgress, lesson.exercises, lessonId, progressScope.chapterId, progressScope.lessonId],
  );

  return (
    <PageLayout
      book={pdep}
      chapter={functional as any}
      lesson={lesson}
      exercise={exercise}
    >
      <Heading1>
        {t("exerciseTitle", {
          number: Number(exerciseId),
          name: exercise.name,
        })}
      </Heading1>

      <PlaygroundProvider
        exercise={exercise}
        progressScope={progressScope}
        onProgressSaved={(solution, state) => {
          const newProgress = upsertBookProgress(
            bookProgress,
            progressScope,
            solution,
            state === "passed" ? "passed" : state === "passed_with_warnings" ? "passed_with_warnings" : "error",
          );
          updateProgress(newProgress);
        }}
      >
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
        <FeedbackArea nextExercise={nextExercise} />
      </PlaygroundProvider>
    </PageLayout>
  );
};

export default Exercise;