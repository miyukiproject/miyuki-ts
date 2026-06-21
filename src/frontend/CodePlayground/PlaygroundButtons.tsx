import { useTranslation } from "react-i18next";
import { usePlayground } from "../hooks/usePlayground";
import { PlayIcon, SpinnerIcon } from "../icons/Icons";

type OnClickProp = { onClick?: () => void };
type BaseButtonProps = OnClickProp & {
  background: string;
  children: React.ReactNode;
};

const BaseButton = ({ onClick, background, children }: BaseButtonProps) => (
  <button
    onClick={onClick}
    className={
      "w-full py-3 rounded font-semibold flex justify-center items-center gap-1 text-white " +
      background
    }
  >
    {children}
  </button>
);

const SubmitButton = ({ onClick }: OnClickProp) => {
  const { t } = useTranslation();
  return (
    <BaseButton
      onClick={onClick}
      background="bg-mumuki-rose hover:bg-mumuki-rose-darken"
    >
      <PlayIcon width={25} height={25} />
      <span>{t("send")}</span>
    </BaseButton>
  );
};

const LoadingButton = ({ onClick }: OnClickProp) => {
  const { t } = useTranslation();
  return (
    <BaseButton onClick={onClick} background="bg-mumuki-rose/60">
      <SpinnerIcon className="animate-spin" width={25} height={25} />
      <span>{t("sendingSolution")}...</span>
    </BaseButton>
  );
};

export const ActionButton = () => {
  const { submit, processing } = usePlayground();
  return processing ? <LoadingButton /> : <SubmitButton onClick={submit} />;
};
