import { usePlayground } from "../CodePlayground/PlaygroundContext";
import Feedback from "../Feedback";
import { Exercise } from "../model/guide";
import NextButton from "./NextButton";

type FeedbackAreaProps = {
  nextExercise: Exercise;
};

export default function FeedbackArea({ nextExercise }: FeedbackAreaProps) {
  const { isNextVisible } = usePlayground();
  return (
    <div className="mt-8">
      <Feedback />
      {isNextVisible && (
        <NextButton
          nextExercise={nextExercise}
          onClick={() => {
            const { reset } = usePlayground();
            reset();
          }}
        />
      )}
    </div>
  );
}
