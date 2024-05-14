export function timeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { value: 60 * 60 * 24 * 365, unit: "year" },
    { value: 60 * 60 * 24 * 30, unit: "month" },
    { value: 60 * 60 * 24, unit: "day" },
    { value: 60 * 60, unit: "hour" },
    { value: 60, unit: "minute" },
    { value: 1, unit: "second" },
  ];

  let count = 0;
  for (const interval of intervals) {
    count = Math.floor(seconds / interval.value);
    if (count !== 0) {
      return `${count} ${interval.unit}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
}
