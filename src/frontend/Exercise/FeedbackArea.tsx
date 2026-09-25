import { usePlayground } from "../hooks/usePlayground";
import Feedback from "../Feedback";
import NextButton from "./NextButton";

type FeedbackAreaProps = {
  nextResource: {
    name: string;
    to: string;
    kind: string;
  };
};

const FeedbackArea = ({ nextResource }: FeedbackAreaProps) => {
  const { isNextVisible, reset } = usePlayground();
  return (
    <div className="mt-8">
      <Feedback />
      {isNextVisible && (
        <NextButton nextResource={nextResource} onClick={reset} />
      )}
    </div>
  );
};

export default FeedbackArea;
