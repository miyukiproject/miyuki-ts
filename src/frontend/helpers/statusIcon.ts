import { SubmissionStatus } from "../model/submission";

export function statusIcon(status: SubmissionStatus) {
  const colorClass = (() => {
    switch (status) {
      case "passed":
        return "text-green-500";
      case "passed_with_warnings":
        return "text-yellow-500";
      case "failed":
      case "errored":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  })();
  console.log(`[statusIcon] status: ${status} -> class: ${colorClass}`);
  return colorClass;
};