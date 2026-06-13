import { useTranslation } from "react-i18next";
import { Link } from "react-router";

type ButtonProps = {
  nextResource: {
    name: string;
    to: string;
    kind: string;
  };
  onClick?: () => void;
}

const NextButton = ({ nextResource, onClick }: ButtonProps) => {
  const { t } = useTranslation();

  return (
    <Link
      to={nextResource.to}
      className="hover:text-white block w-full mt-4 bg-mumuki-rose hover:bg-mumuki-rose-darken text-white py-3 rounded font-semibold text-center"
      onClick={onClick}>
      {t("navigationContinue", {
        kind: nextResource.kind,
        name: nextResource.name,
      })}{" "}
      →
    </Link>
  );
}

export default NextButton
