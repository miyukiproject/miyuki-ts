import { useTranslation } from "react-i18next";
import { Heading1 } from "../Title"

type LessonHeaderProps = {
    lesson: any,
    id: string
}

export const LessonHeader = ({ lesson, id }: LessonHeaderProps) => {
    const { t } = useTranslation();

    return <div className="flex justify-between items-center mb-6">
        {/* TODO use number from model */}
        <Heading1>
            {t("lessonTitle", { number: id, name: lesson.name })}
        </Heading1>
        <div className="text-4xl font-bold">
            <i className={`da da-${lesson.language?.name}`}></i>
        </div>
    </div>
}