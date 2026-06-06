import { useTranslation } from "react-i18next";
import { ContentTitle } from "../Title"

type LessonHeaderProps = {
    lesson: any,
    id: string
}

export const LessonHeader = ({ lesson, id }: LessonHeaderProps) => {
    const { t } = useTranslation();

    return <div className="flex justify-between items-center mb-6">
        {/* TODO use number from model */}
        <ContentTitle>
            {t("lessonTitle", { number: id, name: lesson.name })}
        </ContentTitle>
        <div className="text-4xl font-bold">
            <i className={`da da-${lesson.language?.name}`}></i>
        </div>
    </div>
}