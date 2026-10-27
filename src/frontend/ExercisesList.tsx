import { statusIcon } from "./helpers/statusIcon";
import { Exercise } from "./model/guide";
import { Link } from "react-router-dom";
import { SubmissionStatus } from "./model/submission";
import { DeepPartial } from "./helpers/DeepPartial";
import { StoredBookProgress } from "./helpers/progressStorage";
import { ProgressState } from "./model/progress";
import { useMemo } from "react";

const progressStateToSubmissionStatus: Record<ProgressState, SubmissionStatus> =
  {
    passed: SubmissionStatus.Passed,
    passed_with_warnings: SubmissionStatus.PassedWithWarnings,
    error: SubmissionStatus.Errored,
  };

function statusFor(
  exercise: DeepPartial<Exercise>,
  bookProgress: StoredBookProgress | null | undefined,
  chapterId: number | undefined,
  lessonId: number | undefined,
): SubmissionStatus {
  if (!bookProgress || !chapterId || !lessonId) {
    return SubmissionStatus.Pending;
  }

  const savedExercise = bookProgress.chapters
    ?.find((chapter) => chapter.chapter_id === chapterId)
    ?.lessons?.find((savedLesson) => savedLesson.lesson_id === lessonId)
    ?.exercises?.find((saved) => saved.exercise_id === exercise.id);

  if (!savedExercise) return SubmissionStatus.Pending;

  const status =
    progressStateToSubmissionStatus[savedExercise.state] ??
    SubmissionStatus.Pending;
  return status;
}

type ExercisesListProps = {
  lessonId: number | undefined;
  chapterId: number | undefined;
  exercises: DeepPartial<Exercise>[];
  bookProgress: StoredBookProgress | null | undefined;
};

export function ExercisesList({
  lessonId,
  exercises,
  bookProgress,
  chapterId,
}: ExercisesListProps) {
  const items = useMemo(() => {
    return exercises.map((exercise, index) => {
      const status = statusFor(exercise, bookProgress, chapterId, lessonId);
      return {
        exercise,
        index,
        status,
      };
    });
  }, [exercises, bookProgress, chapterId, lessonId]);

  return (
    <ul className="space-y-1 columns-3 mb-8">
      {items.map(({ exercise, index, status }) => (
        <li key={exercise.id} className="flex items-center gap-2">
          <span className={`text-lg ${statusIcon(status)}`}>●</span>
          <Link
            to={`/chapters/${chapterId}/lessons/${lessonId || "0"}/exercises/${index + 1}`}
            className="text-mumuki-skyblue hover:underline"
          >
            {index + 1}. {exercise.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
