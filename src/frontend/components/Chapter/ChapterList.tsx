import { useTranslation } from "react-i18next";
import { ChapterCard } from "./ChapterCard";
import { Chapter } from "../Book/Book.data";
import { Heading2 } from "../Title";

type ChapterListProps = {
    chapters: Chapter[]
}

export const ChapterList = ({ chapters }: ChapterListProps) => {
    const { t } = useTranslation();
    return (
        <section className="lg:w-2/3 mx-auto">
            <Heading2>{t("chapters")}</Heading2>
            <div className="space-y-8">
                {chapters.map((chapter) => (
                    <ChapterCard key={chapter.id} chapter={chapter} />
                ))}
            </div>
        </section>
    );
};
