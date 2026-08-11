import { useTranslation } from "react-i18next";

function Loading() {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-yellow-600" />

          <p className="text-sm font-medium text-gray-500">{t("loading")}</p>
        </div>
      </div>
    </>
  );
}

export default Loading;
