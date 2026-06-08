import { useTranslation } from "react-i18next";
import { DeepPartial } from "../helpers/DeepPartial";
import { Exercise } from "../model/guide";
import { Link, useParams } from "react-router";

type ButtonProps = {
  nextExercise: DeepPartial<Exercise>;
  onClick?: () => void;
}

// TODO next should be generic, not just exercise
const NextButton = ({ nextExercise,onClick }: ButtonProps) =>{
  const { t } = useTranslation();
  const { lessonId, exerciseId } = useParams();

  return (
    <Link
      to={`/lessons/${lessonId}/exercises/${Number(exerciseId) + 1}`}
      className="hover:text-white block w-full mt-4 bg-mumuki-rose hover:bg-mumuki-rose-darken text-white py-3 rounded font-semibold text-center"
      onClick={onClick}>
      {t("navigationContinue", {
        kind: t("exercise"),
        name: nextExercise.name,
      })}{" "}
      →
    </Link>
  );
}

export default NextButton
