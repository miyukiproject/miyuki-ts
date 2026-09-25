import { ActionButton } from "./PlaygroundButtons";
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

const CodePlayground = () => {
  const { playgroundView, isPlayground, isReading } = usePlayground();
  const ActiveView = COMPONENT_VIEW[playgroundView];

  if (isReading) return;
  return (
    <div className="flex flex-col">
      <ActiveView />
      {!isPlayground && <ActionButton />}
    </div>
  );
};

export default CodePlayground;
