import { usePlayground } from "../../hooks/usePlayground";
import {
  ConsoleButton,
  EditorButton,
  LibraryButton,
} from "./PlaygroundButton";

export default function PlaygroundHeader() {
  const { exercise } = usePlayground();

  return (
    <div className="flex items-center border-b">
      <EditorButton />
      {exercise.extra && <LibraryButton />}
      <ConsoleButton />
    </div>
  );
}
