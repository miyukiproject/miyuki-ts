import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ExerciseResult, PlaygroundView } from "../model/common";
import { resultStatus, useYukigo } from "../hooks/useYukigo";

interface PlaygroundContextType {
  code: string;
  setCode: (code: string) => void;
  results: ExerciseResult;
  processing: boolean;
  changeToEditor: () => void;
  changeToConsole: () => void;
  changeToLibrary: () => void;
  isPlayground: boolean;
  isReading: boolean;
  playgroundView: PlaygroundView;
  setPlaygroundView: (view: PlaygroundView) => void;
  exercise: any;
  submit: () => void;
  reset: () => void;
  isNextVisible: boolean
}

export const PlaygroundContext = createContext<PlaygroundContextType | undefined>(
  undefined,
);

const baseResult: ExerciseResult = {
  tests: null,
  expectations: null,
  error: null,
};

export function PlaygroundProvider({
  exercise,
  children,
}: {
  exercise: any;
  children: ReactNode;
}) {
  const isPlayground = useMemo(
    () => exercise.type === "playground",
    [exercise],
  );
  const isReading = useMemo(() => exercise.type === "reading", [exercise]);
  const resetView = useCallback(() => (isPlayground ? "console" : "editor"), [isPlayground]);

  const { runTests, runAnalysis } = useYukigo();
  const [code, setCode] = useState<string>(exercise.default_content ?? "");
  const [processing, setProcessing] = useState<boolean>(false);

  // si hay progreso hecho en el ejercicio esto deberia estar en true
  const [isNextVisible, setNextVisible] = useState<boolean>(isReading || isPlayground)
  
  const [playgroundView, setPlaygroundView] =
    useState<PlaygroundView>(resetView());

  const [results, setResults] = useState<ExerciseResult>({
    expectations: null,
    error: null,
    tests: null,
  });

  const changeToEditor = useCallback(() => setPlaygroundView("editor"), []);

  const changeToConsole = useCallback(() => setPlaygroundView("console"), []);

  const changeToLibrary = useCallback(() => setPlaygroundView("library"), []);

  const reset = useCallback(() => {
    setProcessing(false);
    setResults(baseResult);
    setPlaygroundView(resetView());
    setCode(exercise.default_content ?? "");
    setNextVisible(isReading || isPlayground)
  }, [exercise.default_content, resetView]);

  useEffect(() => {
    reset();
  }, [exercise, reset]);

  const submit = useCallback(() => {
    setProcessing(true);
    setResults(baseResult);
    try {
      const { ast, testResults } = runTests(
        code,
        exercise.extra,
        exercise.test,
      );
      setResults((results) => ({ ...results, tests: testResults }));

      if (resultStatus(testResults) === "passed") {
        const expectationResults = runAnalysis(ast, exercise.expectations);
        setResults((results) => ({
          ...results,
          expectations: expectationResults,
        }));
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setResults((results) => ({
        ...results,
        error,
      }));
    } finally {
      setProcessing(false);
      setNextVisible(true)
    }
  }, [code, exercise, runTests, runAnalysis]);

  const value = useMemo(
    () => ({
      code,
      setCode,
      results,
      processing,
      changeToConsole,
      changeToEditor,
      changeToLibrary,
      isPlayground,
      isReading,
      playgroundView,
      isNextVisible,
      setPlaygroundView,
      exercise,
      submit,
      reset,
    }),
    [
      code,
      results,
      processing,
      changeToConsole,
      changeToEditor,
      changeToLibrary,
      isPlayground,
      isReading,
      playgroundView,
      isNextVisible,
      exercise,
      submit,
      reset,
    ],
  );

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}

