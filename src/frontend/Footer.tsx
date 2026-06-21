import { useTranslation } from "react-i18next";
import { Description } from "./components/Description";

const currentYear = new Date().getFullYear();
const brandBlueClass = "text-[#3998d8]";
const brandLinkClass =
  "inline-flex items-center gap-1.5 underline-offset-2 text-[#3998d8] hover:text-[#3998d8]";

const socialButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d0e6f6] text-[#d0e6f6] transition-colors hover:border-[#3998d8] hover:bg-transparent hover:text-[#3998d8]";

type FooterProps = {
  lesson?: any; // Deberia ser Lesson pero no tiene el tipado bien
};

const Footer = ({ lesson }: FooterProps) =>{
  const { t } = useTranslation();
  return (
    <footer className="mt-14">
      <div className="border-t border-gray-300 pt-2 font-lato">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-snow" viewBox="0 0 16 16">
                  <path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z" />
                </svg>
                <span className="hover:underline">Miyuki</span>
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
                <span className="hover:underline">Mumuki</span>
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

export default Footer