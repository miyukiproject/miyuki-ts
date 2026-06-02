import { useContext } from "react";
import { PlaygroundContext } from "../CodePlayground/PlaygroundContext";

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (!context)
    throw new Error("usePlayground debe usarse dentro de PlaygroundProvider");
  return context;
}
