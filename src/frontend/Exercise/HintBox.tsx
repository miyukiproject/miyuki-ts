import { Description } from "../Description";

type HintBoxProps = {
  hint: string;
};

export default function HintBox({ hint }: HintBoxProps) {
  return (
    <div className="mb-5">
      <Description className="p-3">{hint}</Description>
    </div>
  );
}
