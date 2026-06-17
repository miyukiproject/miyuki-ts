import { useTranslation } from "react-i18next";
import { Heading1 } from "../Title";
import IntroBanner from "./IntroBanner";
import { Link } from "react-router-dom";

type BookHeaderProps = {
    name: string,
    description: string
}

export const BookHeader = ({ name, description }: BookHeaderProps) => {
    return (
        <header className="text-center lg:w-2/3 mx-auto">
            <img
                src="https://mumuki.io/logo-alt-large.png"
                alt="Mumuki"
                className="mx-auto mb-4 h-20"
            />
            <Heading1>{name}</Heading1>
            <p className="mb-4 text-justify text-[17px]">{description}</p>
            <IntroBanner />
            <StartBookButton />
        </header>
    );
};

const StartBookButton = () => {
    const { t } = useTranslation();

    return <Link
        to="/lessons/1"
        className="inline-block text-white hover:text-white bg-mumuki-rose hover:bg-mumuki-rose-darken hover:underline px-4 py-2 rounded">
        {t("startPracticing")}
    </Link>
}