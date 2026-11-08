export const formatDate = (dateValue?: string | Date | null) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};
