import { AnalysisResult, TestReport } from "yukigo";

export type UUID = string;
export type Slug = string;
export type Locale = string;

export type PlaygroundView = "editor" | "console" | "library";

export type ExerciseResult = {
  tests: TestReport[] | null;
  expectations: AnalysisResult[] | null;
  error: Error | null;
};
