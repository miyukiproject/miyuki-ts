import { useEffect, useRef } from "react";
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

const FeedbackArea = ({ nextExercise }: FeedbackAreaProps) => {
  const { isNextVisible, reset, results } = usePlayground();
  const { tests, expectations, error } = results || {};
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tests || expectations || error) {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [tests, expectations, error]);

  return (
    <div className="mt-8" ref={containerRef}>
      <Feedback />
      {isNextVisible && (
        <NextButton nextResource={nextResource} onClick={reset} />
      )}
    </div>
  );
};

export default FeedbackArea;
