import { Heading2 } from "../Title"
import { useTranslation } from "react-i18next"
import { LessonCard } from "./LessonCard"

type LessonsListProps = {
    chapterId: number
    lessons: any[]
}

export const LessonsList = ({ chapterId, lessons }: LessonsListProps) => {
    const { t } = useTranslation();

    return <section>
        <Heading2>{t("lessons")}</Heading2>

        {lessons.map((lesson, index) => (
            <LessonCard key={index} chapterId={chapterId} lesson={lesson} id={index + 1}/>
        ))}
    </section>
}