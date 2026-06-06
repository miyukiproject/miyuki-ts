import { Link } from "react-router-dom";
import { Heading3 } from "../../Title";
import { Chapter } from "../Book.data";
import { Description } from "../../Description";

type ChapterCardProps = {
  chapter: Chapter
}

export const ChapterCard = ({ chapter }: ChapterCardProps) => (
  <div className="p-4">
    <Heading3>
      {chapter.id}.{" "}
      <Link
        to={`chapters/${chapter.id}`}
        className="text-mumuki-skyblue hover:underline">
        {chapter.name}
      </Link>
    </Heading3>
    <div className="flex gap-4">
      <img
        src={chapter.imageUrl}
        alt=""
        className="h-20 w-20 object-contain"
      />
      {chapter.description !== undefined && (
        <Description className="text-justify">{chapter.description}</Description>
      )}
    </div>
  </div>
);