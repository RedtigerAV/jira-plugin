export function getStartOfDate(date: Date): Date {
  const newDate = new Date(date.toString());

  newDate.setHours(0, 0, 0, 0);

  return newDate;
}

export function getEndOfDate(date: Date): Date {
  const newDate = new Date(date.toString());

  newDate.setHours(0, 0, 0, 0);
  newDate.setDate(newDate.getDate() + 1);

  return newDate;
}
