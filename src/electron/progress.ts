import { app, dialog } from "electron";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";

export type ProgressState = "passed" | "passed_with_warnings" | "error";

export type ExerciseProgress = {
  exercise_id: number;
  solution: string;
  state: ProgressState;
};

export type LessonProgress = {
  lesson_id: number;
  exercises: ExerciseProgress[];
};

export type ChapterProgress = {
  chapter_id: number;
  lessons: LessonProgress[];
};

export type BookProgress = {
  book_id: number;
  chapters: ChapterProgress[];
};

type ProgressFile = {
  books: BookProgress[];
};

type ProgressSettings = {
  filePath?: string;
};

export type ProgressScope = {
  bookId: number;
  chapterId: number;
  lessonId: number;
  exerciseId: number;
};

const userDataDirectory = () => app.getPath("userData");
const documentsDirectory = () => app.getPath("documents");

const settingsPath = () => join(userDataDirectory(), "progress-settings.json");

const defaultProgressFilePath = () =>
  join(process.platform === "win32" ? "C:\\" : "/", "Miyuki", "progress.miyuki");

const readSettings = (): ProgressSettings => {
  try {
    return JSON.parse(readFileSync(settingsPath(), "utf-8")) as ProgressSettings;
  } catch {
    return {};
  }
};

const storageFilePath = () => {
  const settings = readSettings();

  if (settings.filePath) {
    if (isLegacyDocumentsPath(settings.filePath)) {
      const nextFilePath = defaultProgressFilePath();

      if (existsSync(settings.filePath) && !existsSync(nextFilePath)) {
        ensureDirectory(dirname(nextFilePath));
        writeFileSync(nextFilePath, readFileSync(settings.filePath, "utf-8"), "utf-8");
      }

      writeSettings(nextFilePath);
      ensureProgressFile(nextFilePath);
      return nextFilePath;
    }

    return settings.filePath;
  }

  const filePath = defaultProgressFilePath();
  ensureProgressFile(filePath);
  return filePath;
};

const ensureDirectory = (directory: string) => {
  mkdirSync(directory, { recursive: true });
};

const ensureProgressFile = (filePath: string) => {
  ensureDirectory(dirname(filePath));

  if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify(emptyProgressFile(), null, 2), "utf-8");
  }
};

const isLegacyDocumentsPath = (filePath: string) => {
  const legacyRoot = `${documentsDirectory()}${process.platform === "win32" ? "\\" : "/"}`;
  return filePath.toLowerCase().startsWith(legacyRoot.toLowerCase());
};

const readProgressFile = (): ProgressFile => {
  const currentFile = storageFilePath();

  if (existsSync(currentFile)) {
    try {
      return JSON.parse(readFileSync(currentFile, "utf-8")) as ProgressFile;
    } catch {
      return { books: [] };
    }
  }

  return { books: [] };
};

const writeProgressFile = (progressFile: ProgressFile) => {
  const filePath = storageFilePath();
  ensureDirectory(dirname(filePath));
  writeFileSync(filePath, JSON.stringify(progressFile, null, 2), "utf-8");
};

const readBookProgress = (bookId: number): BookProgress => {
  const progressFile = readProgressFile();
  const book = progressFile.books.find((item) => item.book_id === bookId);

  if (!book) {
    return { book_id: bookId, chapters: [] };
  }

  return book;
};

const writeBookProgress = (progress: BookProgress) => {
  const progressFile = readProgressFile();
  const bookIndex = progressFile.books.findIndex((item) => item.book_id === progress.book_id);

  if (bookIndex >= 0) {
    progressFile.books[bookIndex] = progress;
  } else {
    progressFile.books.push(progress);
  }

  writeProgressFile(progressFile);
};

const writeSettings = (directory: string) => {
  ensureDirectory(userDataDirectory());
  writeFileSync(settingsPath(), JSON.stringify({ filePath: directory }, null, 2), "utf-8");
};

const emptyProgressFile = (): ProgressFile => ({ books: [] });

export const getProgressInfo = () => {
  const currentFilePath = storageFilePath();
  return {
    currentFilePath,
    defaultFilePath: defaultProgressFilePath(),
    isCustom: currentFilePath !== defaultProgressFilePath(),
  };
};

export const pickProgressFilePath = async () => {
  const result = await dialog.showOpenDialog({
    title: "Abrir archivo de progreso",
    defaultPath: defaultProgressFilePath(),
    properties: ["openFile"],
    filters: [{ name: "Miyuki", extensions: ["miyuki"] }],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  return result.filePaths[0];
};

export const saveProgressFilePath = (filePath: string) => {
  writeSettings(filePath);
  ensureDirectory(dirname(filePath));
  return getProgressInfo();
};

export const createNewProgressFile = async () => {
  const result = await dialog.showSaveDialog({
    title: "Nuevo archivo de progreso",
    defaultPath: defaultProgressFilePath(),
    filters: [{ name: "Miyuki", extensions: ["miyuki"] }],
  });

  if (result.canceled || !result.filePath) {
    return null;
  }

  const nextFilePath = result.filePath.endsWith(".miyuki")
    ? result.filePath
    : `${result.filePath}.miyuki`;

  writeSettings(nextFilePath);
  ensureProgressFile(nextFilePath);
  return getProgressInfo();
};

export const chooseProgressDirectory = async () => {
  const filePath = await pickProgressFilePath();

  if (!filePath) {
    return getProgressInfo();
  }

  return saveProgressFilePath(filePath);
};

export const saveExerciseProgress = (
  { bookId, chapterId, lessonId, exerciseId }: ProgressScope,
  solution: string,
  state: ProgressState,
) => {
  const progress = readBookProgress(bookId);
  const nextChapter = progress.chapters.find((item) => item.chapter_id === chapterId) ?? {
    chapter_id: chapterId,
    lessons: [],
  };
  const nextLesson = nextChapter.lessons.find((item) => item.lesson_id === lessonId) ?? {
    lesson_id: lessonId,
    exercises: [],
  };
  const nextExercise: ExerciseProgress = {
    exercise_id: exerciseId,
    solution,
    state,
  };

  const exerciseIndex = nextLesson.exercises.findIndex((item) => item.exercise_id === exerciseId);
  if (exerciseIndex >= 0) {
    nextLesson.exercises[exerciseIndex] = nextExercise;
  } else {
    nextLesson.exercises.push(nextExercise);
  }

  if (!nextChapter.lessons.includes(nextLesson)) {
    nextChapter.lessons.push(nextLesson);
  }

  if (!progress.chapters.includes(nextChapter)) {
    progress.chapters.push(nextChapter);
  }

  writeBookProgress(progress);
};

export const loadExerciseProgress = ({
  bookId,
  chapterId,
  lessonId,
  exerciseId,
}: ProgressScope) => {
  const progress = readBookProgress(bookId);
  const chapter = progress.chapters.find((item) => item.chapter_id === chapterId);
  const lesson = chapter?.lessons.find((item) => item.lesson_id === lessonId);
  const exercise = lesson?.exercises.find((item) => item.exercise_id === exerciseId);

  return exercise ?? null;
};

export const loadBookProgress = (bookId: number) => readBookProgress(bookId);