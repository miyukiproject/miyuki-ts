import { usePlayground } from "../../hooks/usePlayground";
import { ConsoleButton, EditorButton, LibraryButton } from "./PlaygroundButton";

const PlaygroundHeader = () => {
  const { exercise, isPlayground, isReading } = usePlayground();

  const showHeader = !isPlayground && !isReading;

  if (!showHeader) return;

  return (
    <div className="flex items-center border-b">
      <EditorButton />
      {exercise.extra && <LibraryButton />}
      <ConsoleButton />
    </div>
  );
}

export default PlaygroundHeader