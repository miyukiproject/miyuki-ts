import { ContentChildTitle } from "../Title"
import { useTranslation } from "react-i18next"
import { LessonCard } from "./LessonCard"

type LessonsListProps = {
    lessons: any[]
}

export const LessonsList = ({ lessons }: LessonsListProps) => {
    const { t } = useTranslation();

    return <section>
        <ContentChildTitle>{t("lessons")}</ContentChildTitle>

        {lessons.map((lesson, index) => (
            <LessonCard key={index} lesson={lesson} id={index + 1}/>
        ))}
    </section>
}