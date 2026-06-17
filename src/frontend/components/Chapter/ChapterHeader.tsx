import { useTranslation } from "react-i18next"
import { Description } from "../Description"
import { Heading1 } from "../Title"

type ChapterHeaderProps = {
    id: number,
    name: string,
    description: string
}

export const ChapterHeader = ({ id, name, description }: ChapterHeaderProps) => {
    const { t } = useTranslation();

    return <header className="mb-8">
        <Heading1>
            {t("chapterTitle", { number: id, name: name })}
        </Heading1>

        <Description className="bg-white p-4 flex gap-4">
            {description}
        </Description>
    </header>
}