import { Link } from "react-router-dom"
import { ContentChildrenTitle } from "./Title"
import { useTranslation } from "react-i18next";

type ApendixLinkProps = {
    chapterId: number
}

export const AppendixLink = ({chapterId}: ApendixLinkProps) => {
  const { t } = useTranslation();
    
    return <section className="mt-10">
        <ContentChildrenTitle>{t("appendix")}</ContentChildrenTitle>

        <p className="text-gray-600">
            {t("appendixTeaser")}{" "}
            <Link
                to={`/chapters/${chapterId}/appendix`}
                className="text-blue-600 hover:underline">
                {t("appendixLink")}
            </Link>
        </p>
    </section>
}