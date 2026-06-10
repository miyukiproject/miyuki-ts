import { Description } from "../Description";

type HintBoxProps = {
  hint: string;
};

const HintBox = ({ hint }: HintBoxProps) =>{
  return (
    <div className="mb-5">
      <Description className="p-3">{hint}</Description>
    </div>
  );
}

export default HintBox