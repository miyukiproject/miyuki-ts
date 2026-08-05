import {
  Analyzer,
  Tester,
  Interpreter,
  TestReport,
  AnalysisResult,
  MulangAdapter,
  InterpreterConfig,
} from "yukigo";
import { AST, YukigoParser } from "yukigo-ast";
import { YukigoHaskellParser } from "yukigo-haskell-parser";
import { useCallback, useState } from "react";

export const interpreterConfig: Partial<InterpreterConfig> = {
  lazyLoading: true,
  mutability: false,
  debug: false,
  outputMode: "first",
};

export const resultStatus = (reports: TestReport[]) =>
  reports.every((res) => res.status === "passed")
    ? "passed"
    : reports.every((res) => res.status === "error")
      ? "error"
      : "failed";

export const useYukigo = () => {
  const [parser, setParser] = useState<YukigoParser>(new YukigoHaskellParser());
  const [cleanParser] = useState<YukigoParser>(
    new YukigoHaskellParser("", { typecheck: false, includePrims: false }),
  );

  const studentCode = useCallback(
    (code: string, extra: string): string =>
      extra ? extra.concat("\n", code) : code,
    [],
  );

  const parse = useCallback(
    (code: string, extra: string, withPrelude = true): AST => {
      const targetParser = withPrelude ? parser : cleanParser;
      return targetParser.parse(studentCode(code, extra));
    },
    [parser, cleanParser, studentCode],
  );

  const evaluate = useCallback(
    (code: string, extra: string, command: string) => {
      const ast = parser.parse(studentCode(code, extra));
      const expression = parser.parseExpression(command);

      const interpreter = new Interpreter(ast, interpreterConfig);
      return interpreter.evaluate(expression);
    },
    [],
  );

  const runTests = useCallback(
    (code: string, extra: string, test: string) => {
      const ast = parser.parse(studentCode(code, extra));
      const tester = new Tester(ast, interpreterConfig);
      return tester.test(parser.parse(test));
    },
    [parser, studentCode],
  );

  const runAnalysis = useCallback(
    (ast: AST, expectations: any[]): AnalysisResult[] => {
      const analyzer = new Analyzer();
      const adapter = new MulangAdapter();
      const translatedExpectations = expectations.map((inspection) =>
        adapter.translateMulangInspection(inspection),
      );
      return analyzer.analyze(ast, translatedExpectations);
    },
    [],
  );

  return { evaluate, runTests, runAnalysis, parse };
};
