import { useTranslation } from "react-i18next";
import { AnalysisResult, InspectionRule, TestReport } from "yukigo";
import {
  CheckIcon,
  CrossIcon,
  ErrorIcon,
  SpinnerIcon,
  SuccessIcon,
  WarningIcon,
} from "./icons/Icons";
import { usePlayground } from "./hooks/usePlayground";

const testsOk = (tests: TestReport[]) =>
  tests.every((res) => res.status === "passed");
const expectationsOk = (expectations: AnalysisResult[]) =>
  expectations.every((res) => res.passed);

type FeedbackStatus = "error" | "warning" | "passed" | "loading";

type StatusStyle = {
  container: string;
  text: string;
};

const colorStyles: Record<FeedbackStatus, StatusStyle> = {
  error: {
    container: "border-red-500 bg-red-50",
    text: "text-red-700",
  },
  warning: {
    container: "border-yellow-500 bg-yellow-50",
    text: "text-yellow-700",
  },
  passed: {
    container: "border-green-500 bg-green-50",
    text: "text-green-700",
  },
  loading: {
    container: "border-mumuki-skyblue bg-white",
    text: "text-mumuki-skyblue text-xl",
  },
};

type ContainerProps = {
  status: FeedbackStatus;
  children: React.ReactNode;
};

const FeedbackContainer = ({ status, children }: ContainerProps) => (
  <div className={`border-l-4 p-4 mb-6 ${colorStyles[status].container}`}>
    {children}
  </div>
);
type TitleProps = {
  heading: string;
  status: FeedbackStatus;
  icon: React.ReactNode;
};
const FeedbackTitle = ({ heading, status, icon }: TitleProps) => (
  <div className="flex gap-2 items-center mb-2">
    {icon}
    <h4 className={`${colorStyles[status].text} font-semibold`}>{heading}</h4>
  </div>
);
type MessageProps = {
  msg: string;
};
const FeedbackMessage = ({ msg }: MessageProps) => (
  <div className="bg-white p-2 border rounded">
    <span className="text-sm font-mono">{msg}</span>
  </div>
);

const TestReportRow = ({ name, status, message }: TestReport) => (
  <div className="bg-white p-2 flex flex-col">
    <div className="flex gap-2 items-center">
      {status === "passed" ? (
        <CheckIcon width={20} height={20} />
      ) : (
        <CrossIcon width={20} height={20} />
      )}
      <p>{name}</p>
    </div>
    {message && <p className="ml-8 text-sm text-gray-600">{message}</p>}
  </div>
);

const TestReportItem = (report: TestReport) =>
  report.children ? (
    report.children.map((child, i) => <TestReportRow key={i} {...child} />)
  ) : (
    <TestReportRow {...report} />
  );

type ErrorFeedbackProps = {
  error: Error;
};

const ErrorFeedback = ({ error }: ErrorFeedbackProps) => {
  const { t } = useTranslation(["translation", "yukigo"]);

  return (
    <FeedbackContainer status={"error"}>
      <FeedbackTitle
        heading={t("errored")}
        status={"error"}
        icon={<ErrorIcon width={20} height={20} className="fill-red-700" />}
      />
      <FeedbackMessage msg={error.message} />
    </FeedbackContainer>
  );
};

type TestsFeedbackProps = {
  results: TestReport[];
};

const TestsFeedback = ({ results }: TestsFeedbackProps) => {
  const { t } = useTranslation(["translation", "yukigo"]);
  return (
    <FeedbackContainer status={"error"}>
      <FeedbackTitle
        heading={t("failed")}
        status={"error"}
        icon={<ErrorIcon width={20} height={20} className="fill-red-700" />}
      />
      {results.map((report, i) => (
        <TestReportItem key={i} {...report} />
      ))}
    </FeedbackContainer>
  );
};

type ExpectationResultProps = {
  rule: InspectionRule;
  index: number;
  passed: boolean;
};

const ExpectationResult = ({ rule, index, passed }: ExpectationResultProps) => {
  const { t } = useTranslation(["translation", "yukigo"]);

  const { inspection, args, binding, expected, targetSuffix, matcher } = rule;

  const hasTarget = args && args.length > 0;
  const suffix = hasTarget && targetSuffix ? `_${targetSuffix}` : "";
  const translationKey = `${inspection}${suffix}`;

  return (
    <span className="flex gap-2" key={index}>
      {passed ? (
        <CheckIcon width={20} height={20} />
      ) : (
        <CrossIcon width={20} height={20} />
      )}
      <p>
        {t(`yukigo:${translationKey}`, {
          binding: binding === "*" ? t("yukigo:solution") : binding,
          must: t(expected ? "yukigo:must" : "yukigo:must_not"),
          target: hasTarget ? args[0] : undefined,
          matching: matcher
            ? t(`yukigo:${matcher.type}`, { value: matcher.value })
            : "",
        })}
      </p>
    </span>
  );
};

type ExpectationsFeedbackProps = {
  expectations: AnalysisResult[];
};

const ExpectationsFeedback = ({ expectations }: ExpectationsFeedbackProps) => {
  const { t } = useTranslation(["translation", "yukigo"]);
  return (
    <FeedbackContainer status={"warning"}>
      <FeedbackTitle
        heading={t("failedExpectations")}
        status={"warning"}
        icon={
          <WarningIcon width={20} height={20} className="fill-yellow-700" />
        }
      />
      <div className="bg-white border rounded p-3 text-sm font-mono">
        {expectations.map(({ rule, passed }, index) => (
          <ExpectationResult rule={rule} index={index} passed={passed} />
        ))}
      </div>
    </FeedbackContainer>
  );
};

const SuccessFeedback = () => {
  const { t } = useTranslation(["translation", "yukigo"]);

  return (
    <FeedbackContainer status={"passed"}>
      <FeedbackTitle
        heading={t("passed")}
        status={"passed"}
        icon={<SuccessIcon width={20} height={20} className="fill-green-700" />}
      />
    </FeedbackContainer>
  );
};

const LoadingFeedback = () => {
  const { t } = useTranslation(["translation", "yukigo"]);

  return (
    <FeedbackContainer status={"loading"}>
      <FeedbackTitle
        heading={t("processingYourSolution")}
        status={"loading"}
        icon={
          <SpinnerIcon
            width={20}
            height={20}
            className="stroke-mumuki-skyblue animate-spin"
          />
        }
      />
    </FeedbackContainer>
  );
};

const Feedback = () => {
  const {
    results: { tests, expectations, error },
    processing,
  } = usePlayground();
  if (processing) return <LoadingFeedback />;
  if (!tests && !expectations && !error) return <></>;

  if (error) return <ErrorFeedback error={error} />;

  if (tests && !testsOk(tests)) return <TestsFeedback results={tests} />;

  if (expectations && !expectationsOk(expectations))
    return <ExpectationsFeedback expectations={expectations} />;

  return <SuccessFeedback />;
};

export default Feedback;
