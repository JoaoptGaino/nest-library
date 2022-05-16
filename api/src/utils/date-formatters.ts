export function transformDatetimeToDate(date: Date) {
  return new Date(date.toDateString());
}
