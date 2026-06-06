import { useTranslation } from "react-i18next";
import { Heading2 } from "../../Title";
import { ChapterCard } from "./ChapterCard";
import { Chapter } from "../Book.data";

type ChaptersViewProps = {
    chapters: Chapter[]
}

export const ChaptersView = ({ chapters }: ChaptersViewProps) => {
    const { t } = useTranslation();
    return (
        <section className="lg:w-2/3 mx-auto">
            <Heading2>{t("chapters")}</Heading2>
            <div className="space-y-8">
                {chapters.map((chapter) => (
                    <ChapterCard chapter={chapter} />
                ))}
            </div>
        </section>
    );
};
