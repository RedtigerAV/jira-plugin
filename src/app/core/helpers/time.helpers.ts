export function secondsToHoursAndMinutes(value: number | string): string {
  function excludeNill(dateString: string): boolean {
    return !new RegExp('^00').test(dateString);
  }

  function joinExcludeNill(durationList: string[]): string {
    return durationList.filter(excludeNill).join(' ');
  }

  function toHHMM(value: number): string {
    let hours: string | number = Math.floor(value / 3600);
    let minutes: string | number = Math.floor((value - hours * 3600) / 60);

    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return hours + ':' + minutes;
  }

  function roundSecondsToMinutes(value: number): number {
    if (value <= 60) {
      return 60;
    }

    const residue = value % 60;

    if (!residue) {
      return value;
    } else if (residue > 30) {
      return value + (60 - residue);
    } else if (residue <= 30) {
      return value - residue;
    }
  }

  if (value < 60) {
    return '0';
  }

  const durationItems = ['ч.', 'мин.'];
  const parsedValue = parseFloat(value.toString(10));
  const prettyValue = roundSecondsToMinutes(parsedValue);
  const time = toHHMM(prettyValue);
  const splitTimeString = time.split(':');
  const dateStringList = splitTimeString.map((item, idx) => `${item} ${durationItems[idx]}`);

  return joinExcludeNill(dateStringList);
}
