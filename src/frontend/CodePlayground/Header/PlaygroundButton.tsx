import { JSX, MouseEventHandler } from "react";
import { usePlayground } from "../../hooks/usePlayground";
import { CodeIcon, PencilIcon, TerminalIcon } from "../../icons/Icons";
import { useTranslation } from "react-i18next";

type BaseButtonProps = {
  text: string;
  icon: JSX.Element;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const BaseButton = ({ text, icon, isActive, onClick }: BaseButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        "flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-50 transition " +
        (isActive ? " border-x border-t bg-gray-100" : "")
      }
    >
      {icon}
      <span className="text-mumuki-teal font-medium">{text}</span>
    </button>
  );
};

export const EditorButton = () => {
  const { t } = useTranslation();
  const { playgroundView, changeToEditor } = usePlayground();

  return (
    <BaseButton
      text={t("solution")}
      icon={
        <PencilIcon width={15} height={15} className="fill-mumuki-teal" />
      }
      isActive={playgroundView === "editor"}
      onClick={changeToEditor}
    />
  );
};

export const ConsoleButton = () => {
  const { t } = useTranslation();
  const { playgroundView, changeToConsole } = usePlayground();

  return (
    <BaseButton
      text={t("console")}
      icon={
        <TerminalIcon width={15} height={15} className="fill-mumuki-teal" />
      }
      isActive={playgroundView === "console"}
      onClick={changeToConsole}
    />
  );
};

export const LibraryButton = () => {
  const { t } = useTranslation();
  const { playgroundView, changeToLibrary } = usePlayground();

  return (
    <BaseButton
      text={t("library")}
      icon={
        <CodeIcon width={15} height={15} className="fill-mumuki-teal" />
      }
      isActive={playgroundView === "library"}
      onClick={changeToLibrary}
    />
  );
};

