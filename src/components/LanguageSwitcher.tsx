import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "es", name: "Español" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang =
    languages.find((lang) => lang.code === i18n.language.split("-")[0]) ||
    languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const language = i18n.language.split("-")[0];

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 bg-white border border-gray-300 text-gray-900 text-sm font-semibold rounded-lg px-4 py-2 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-200"
      >
        <span className="flex items-center gap-2">
          <span>
            {/* Capitalize */}
            {currentLang.name.charAt(0).toUpperCase() +
              currentLang.name.slice(1)}
          </span>
        </span>

        <FontAwesomeIcon
          icon={faChevronUp}
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden origin-top-right">
          <ul className="flex flex-col py-1 m-0 p-0">
            {languages.map((lang) => (
              <li key={lang.code} className="list-none">
                <button
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer
                    ${
                      i18n.language === lang.code
                        ? "bg-yellow-50 text-yellow-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  <span>{lang.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
