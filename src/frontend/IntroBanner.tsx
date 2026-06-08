import React from "react";
import { useTranslation } from "react-i18next";
import { Description } from "./Description";

const IntroBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="mb-4">
      <blockquote className="rounded-[4px] bg-mumuki-sky border-l-8 border-sky-500 text-[15px] px-[30px] py-[15px] m-0">
        <Description className="prose leading-[1.8] max-w-none text-left prose-a:text-sky-700 prose-a:no-underline prose-a:hover:underline prose-p:mb-3 prose-p:last:mb-0">
          {t("aboutMiyuki")}
        </Description>
      </blockquote>
    </section>
  );
};

export default IntroBanner;
