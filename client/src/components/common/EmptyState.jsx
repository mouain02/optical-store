import { useTranslation } from "react-i18next";

export default function EmptyState({ message, action }) {
  const { t } = useTranslation();
  return (
    <div className="text-center py-16">
      <p className="text-gray-500 mb-4">{message || t("shop.noProducts")}</p>
      {action}
    </div>
  );
}
