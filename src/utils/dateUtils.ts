export const formatDate = (date: string) => {
  const formatted = new Date(date).toLocaleDateString("cs-CZ");
  return formatted;
};
