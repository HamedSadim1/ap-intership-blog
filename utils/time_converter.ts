export const formatTime = (dateString: string | null): string => {
  if (!dateString) {
    return "Unknown date";
  }
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString(undefined, options);
};
