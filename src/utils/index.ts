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

export const getDateId = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dateStr = date.getDate();

  return `${year}${month}${dateStr}`;
};

// ! 경과시간이 1분 미만인 경우 1을 리턴한다.
export const getElapsedMinutes = (
  startTime: Date,
  finishTime: Date,
): number => {
  const elapsedMinutes = Math.floor(
    (finishTime.getTime() - startTime.getTime()) / (1000 * 60),
  );
  return elapsedMinutes > 1 ? elapsedMinutes : 1;
};
