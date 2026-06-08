import {
  Analyzer,
  MulangAdapter,
  Tester,
  Interpreter,
  TestReport,
  AnalysisResult,
} from "yukigo";
import { AST, Expression, YukigoParser } from "yukigo-ast";
import { YukigoHaskellParser } from "yukigo-haskell-parser";
import { InterpreterConfig } from "yukigo/dist/interpreter/components/RuntimeContext";
import { useCallback, useMemo, useState } from "react";

export const interpreterConfig: InterpreterConfig = {
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

  const evaluate = useCallback((code: string, extra: string, command: string) => {
      const ast = parser.parse(studentCode(code, extra));
      const expression = parser.parseExpression(command);

      const interpreter = new Interpreter(ast, interpreterConfig);
      return interpreter.evaluate(expression);
    },
    [],
  );

  const runTests = useCallback((code: string, extra: string, test: string) => {
    const ast = parser.parse(studentCode(code, extra));
    const tester = new Tester(ast, interpreterConfig);
    const testResults = tester.test(parser.parse(test));
    return { ast, testResults };
  }, []);

  const runAnalysis = useCallback((ast: AST, expectations: unknown[]): AnalysisResult[] => {
      const analyzer = new Analyzer();
      const adapter = new MulangAdapter();
      const translatedExpectations =
        expectations?.map((exp) => adapter.translateMulangInspection(exp)) ||
        [];
      return analyzer.analyze(ast, translatedExpectations);
    },
    [],
  );
  const studentCode = useCallback((code: string, extra: string): string =>
      extra ? extra.concat("\n", code) : code,
    [],
  );

  return { evaluate, runTests, runAnalysis };
};
