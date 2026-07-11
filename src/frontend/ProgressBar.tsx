import { Link, useParams } from "react-router-dom";
import { ProgressStatus } from "./ProgressStatus";
import { usePlayground } from "./hooks/usePlayground";
import { resultStatus } from "./hooks/useYukigo";

interface ProgressItemProps {
  lessonId: string;
  routeExerciseId: number;
  exerciseId: number;
  status: ProgressStatus;
  active?: boolean;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  status,
  active,
  lessonId,
  routeExerciseId,
}) => {
  const styles: Record<ProgressStatus, string> = {
    passed: "bg-progress-passed",
    pending: "bg-progress-pending",
    failed: "bg-progress-failed",
    error: "bg-progress-error",
    processing: "bg-progress-processing animate-pulse",
  };

  return (
    <Link
      to={`/lessons/${lessonId || "0"}/exercises/${routeExerciseId}`}
      className={`progress-bar-step ${styles[status]} ${
        active ? "active" : ""
      }`}></Link>
  );
};

export const ProgressBar: React.FC<{ items: ProgressItemProps[] }> = ({
  items,
}) => {
  const { exerciseId } = useParams();
  const { results, processing } = usePlayground();
  const progress = [...items]
  const currentIndex = Number(exerciseId) - 1;
  const currentItem = progress[currentIndex];

  if (currentItem) {
    const currentProgressStatus = results.error
      ? "error"
      : processing
        ? "processing"
        : results.tests
          ? resultStatus(results.tests)
          : currentItem.status;

    progress[currentIndex] = {
      ...currentItem,
      status: currentProgressStatus,
      active: true,
    };
  }

  return <div className="flex gap-0.5 mb-6">
    {progress.map((item, i) => (
      <ProgressItem key={i} {...item} />
    ))}
  </div>;
};
