export const isSameDate = (date1: Date, date2: Date): boolean => {
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  ) {
    return true;
  } else {
    return false;
  }
};

export const getDateText = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateStr = date.getDate();

  return `${year}년 ${month}월 ${dateStr}일`;
};
