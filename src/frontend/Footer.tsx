import { useTranslation } from "react-i18next";
import { Description } from "./Description";

const currentYear = new Date().getFullYear();
const brandBlueClass = "text-[#3998d8]";
const brandLinkClass =
  "inline-flex items-center gap-1.5 underline-offset-2 hover:underline text-[#3998d8] hover:text-[#3998d8]";

const socialButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d0e6f6] text-[#d0e6f6] transition-colors hover:border-[#3998d8] hover:bg-transparent hover:text-[#3998d8]";

type FooterProps = {
  lesson: any; // Deberia ser Lesson pero no tiene el tipado bien
};

export default function Footer({ lesson }: FooterProps) {
  const { t } = useTranslation();
  return (
    <footer className="mt-14">
      <div className="border-t border-gray-300 pt-2 font-[Lato_sans-serif]">
        {Boolean(lesson) && (
          <Description className="text-sm mb-4">
            {t("authoringNoteHtml", { authors: lesson.authors })}
          </Description>
        )}
        <div className="flex flex-col gap-5 text-sm text-gray-600 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span>&copy; 2023-{currentYear}</span>
              <a
                href="https://raw.githubusercontent.com/flbulgarelli/miyuki/refs/heads/main/AUTHORS"
                target="_blank"
                rel="noopener noreferrer"
                className={brandLinkClass}>
                <i
                  className={`fa-solid fa-snowflake inline-flex h-4 w-4 items-center justify-center text-[14px] leading-none ${brandBlueClass}`}
                  aria-hidden="true"></i>
                Miyuki
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>&copy; 2015-{currentYear}</span>
              <a
                href="https://mumuki.io/home/"
                target="_blank"
                rel="noopener noreferrer"
                className={brandLinkClass}>
                <span
                  aria-hidden="true"
                  className="inline-flex h-4 w-4 items-center justify-center bg-current"
                  style={{
                    WebkitMaskImage:
                      "url(https://raw.githubusercontent.com/mumuki/dev-awesome/master/svg/black/mumuki.svg)",
                    maskImage:
                      "url(https://raw.githubusercontent.com/mumuki/dev-awesome/master/svg/black/mumuki.svg)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "14px 14px",
                    maskSize: "14px 14px",
                  }}
                />
                Mumuki
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/miyukiproject"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Miyuki GitHub"
              className={socialButtonClass}>
              <i className="fa-brands fa-github text-xl" aria-hidden="true"></i>
            </a>
            <a
              href="https://discord.com/invite/Ak4ee7fcSM"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Miyuki Discord"
              className={socialButtonClass}>
              <i
                className="fa-brands fa-discord text-xl"
                aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
