import { useTranslation } from "react-i18next";
import { Exercise } from "../model/guide";
import { Description } from "../Description";
import { LightbulbIcon } from "../icons/Icons";
import HintBox from "./HintBox";
import { layout } from "./utils";

type AssignmentProps = {
  exercise: Exercise;
  showHint: boolean;
  setShowHint: (value: boolean) => void;
};

const Assignment = ({ exercise, showHint, setShowHint }: AssignmentProps) =>{
  const { t } = useTranslation();
  return (
    <div className={`exercise-assignment ${layout.text[exercise.layout]}`}>
      <Description className="mb-4 text-justify">
        {exercise.description}
      </Description>
      {exercise.hint && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-mumuki-skyblue flex items-center gap-2 mb-2 hover:underline">
          <LightbulbIcon width={16} height={16} />
          {t("needAHint")}
        </button>
      )}

      {showHint && <HintBox hint={exercise.hint} />}
    </div>
  );
}

export default Assignment