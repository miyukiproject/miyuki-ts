import { ProgressState } from "../model/progress";
import { hasElectronBridge, invokeElectron } from "./electron";

export type ProgressScope = {
  bookId: number;
  chapterId: number;
  lessonId: number;
  exerciseId: number;
};

export type ProgressInfo = {
  currentFilePath: string;
  defaultFilePath: string;
  isCustom: boolean;
};

export type StoredExerciseProgress = {
  exercise_id: number;
  solution: string;
  state: ProgressState;
};

export type StoredBookProgress = {
  book_id: number;
  chapters: Array<{
    chapter_id: number;
    lessons: Array<{
      lesson_id: number;
      exercises: StoredExerciseProgress[];
    }>;
  }>;
};

export const getProgressInfo = () => invokeElectron<ProgressInfo>("progress:get-info");

export const pickProgressFilePath = () => invokeElectron<string | null>("progress:pick-file-path");

export const saveProgressFilePath = (filePath: string) =>
  invokeElectron<ProgressInfo>("progress:set-file-path", filePath);

export const chooseProgressDirectory = () =>
  invokeElectron<ProgressInfo>("progress:choose-directory");

export const onProgressInfoUpdated = (handler: (info: ProgressInfo) => void) => {
  if (!hasElectronBridge) {
    return () => undefined;
  }

  const electron = window.require("electron") as {
    ipcRenderer: {
      on: (channel: string, listener: (_event: unknown, info: ProgressInfo) => void) => void;
      removeListener: (channel: string, listener: (_event: unknown, info: ProgressInfo) => void) => void;
    };
  };

  const listener = (_event: unknown, info: ProgressInfo) => {
    handler(info);
  };

  electron.ipcRenderer.on("progress:updated", listener);

  return () => {
    electron.ipcRenderer.removeListener("progress:updated", listener);
  };
};

export const loadExerciseProgress = (scope: ProgressScope) =>
  invokeElectron<StoredExerciseProgress | null>("progress:load-exercise", scope);

export const loadBookProgress = (bookId: number) =>
  invokeElectron<StoredBookProgress | null>("progress:load-book", bookId);

export const saveExerciseProgress = (
  scope: ProgressScope,
  solution: string,
  state: ProgressState,
) => invokeElectron<void>("progress:save-exercise", scope, solution, state);