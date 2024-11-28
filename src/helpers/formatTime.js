export const formatTime = dateString => {
  const date = new Date(dateString);
  if (isNaN(date)) return "";

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};
