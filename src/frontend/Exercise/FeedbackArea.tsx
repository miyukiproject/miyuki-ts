import { usePlayground } from "../hooks/usePlayground";
import Feedback from "../Feedback";
import { Exercise } from "../model/guide";
import NextButton from "./NextButton";

type FeedbackAreaProps = {
  nextExercise: Exercise;
};

const FeedbackArea = ({ nextExercise }: FeedbackAreaProps) => {
  const { isNextVisible, reset } = usePlayground();
  return (
    <div className="mt-8">
      <Feedback />
      {isNextVisible && (
        <NextButton nextExercise={nextExercise} onClick={reset} />
      )}
    </div>
  );
};

export default FeedbackArea;
