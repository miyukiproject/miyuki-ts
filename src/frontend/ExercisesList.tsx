import { statusIcon } from "./helpers/statusIcon"
import { Exercise } from "./model/guide"
import { Link } from "react-router-dom"
import { SubmissionStatus } from "./model/submission"
import { DeepPartial } from "./helpers/DeepPartial"
import { StoredBookProgress } from "./helpers/progressStorage"
import { ProgressState } from "./model/progress"
import { useMemo } from "react"

const progressStateToSubmissionStatus: Record<ProgressState, SubmissionStatus> = {
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
    console.log(`[statusFor] ${exercise.id}: PENDING (missing data)`);
    return SubmissionStatus.Pending;
  }

  const savedExercise = bookProgress.chapters
    ?.find((chapter) => chapter.chapter_id === chapterId)
    ?.lessons?.find((savedLesson) => savedLesson.lesson_id === lessonId)
    ?.exercises?.find((saved) => saved.exercise_id === exercise.id);

  if (!savedExercise) {
    console.log(`[statusFor] ${exercise.id}: PENDING (not found in progress)`);
    return SubmissionStatus.Pending;
  }

  const status = progressStateToSubmissionStatus[savedExercise.state] ?? SubmissionStatus.Pending;
  console.log(`[statusFor] ${exercise.id}: ${status} (from state: ${savedExercise.state})`);
  return status;
}

export function ExercisesList({
  lessonId,
  exercises,
  bookProgress,
  chapterId,
  lessonIdNum,
}: {
  lessonId: string | undefined;
  exercises: DeepPartial<Exercise>[];
  bookProgress: StoredBookProgress | null | undefined;
  chapterId: number | undefined;
  lessonIdNum: number | undefined;
}) {
  console.log("[ExercisesList] RENDER with:", { lessonId, chapterId, lessonIdNum, hasProgress: !!bookProgress });
  
  const items = useMemo(
    () => {
      console.log("[ExercisesList] useMemo computing items, bookProgress:", bookProgress);
      return exercises.map((exercise, index) => {
        const status = statusFor(exercise, bookProgress, chapterId, lessonIdNum);
        console.log(`[ExercisesList] Exercise ${exercise.id}: status=${status}`);
        return {
          exercise,
          index,
          status,
        };
      });
    },
    [exercises, bookProgress, chapterId, lessonIdNum],
  );

  return <ul className="space-y-1 columns-3 mb-8">
    {items.map(({ exercise, index, status }) => (
      <li key={exercise.id} className="flex items-center gap-2">
        <span className={`text-lg ${statusIcon(status)}`}>●</span>
        <Link
          to={`/lessons/${lessonId || '0'}/exercises/${index + 1}`}
          className="hover:underline"
        >
          {index + 1}. {exercise.name}
        </Link>
      </li>
    ))}
  </ul>
}