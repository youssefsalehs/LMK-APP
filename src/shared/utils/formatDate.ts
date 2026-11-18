export const formatDate = (dateValue?: string | Date | null) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

export const formatDateTime = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const dateFormatted = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const timeFormatted = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${dateFormatted}, ${timeFormatted}`;
};
