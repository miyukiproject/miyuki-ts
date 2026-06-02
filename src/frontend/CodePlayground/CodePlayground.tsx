import { PlayIcon } from "../icons/Icons";
import Console from "./Console/Console";
import Editor from "./Editor/Editor";
import Library from "./Library";
import { usePlayground } from "../hooks/usePlayground";
import { PlaygroundView } from "../model/common";

type ComponentView = typeof Editor | typeof Console | typeof Library;

const COMPONENT_VIEW: Record<PlaygroundView, ComponentView> = {
  editor: Editor,
  console: Console,
  library: Library,
};

export default function CodePlayground() {
  const { submit, processing, playgroundView, isPlayground, isReading } =
    usePlayground();
  const ActiveView = COMPONENT_VIEW[playgroundView];

  if (isReading) return;
  return (
    <div className="flex flex-col">
      <ActiveView />
      {!isPlayground && <SubmitButton onClick={submit} disabled={processing} />}
    </div>
  );
}

type SubmitButtonProps = { onClick: () => void; disabled?: boolean };

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full py-3 rounded font-semibold flex justify-center items-center gap-1 text-white bg-mumuki-rose hover:bg-mumuki-rose-darken disabled:bg-gray-400">
    <PlayIcon width={25} height={25} />
    <span>Enviar</span>
  </button>
);
