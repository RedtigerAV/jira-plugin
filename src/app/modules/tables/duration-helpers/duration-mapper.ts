export class DurationMapper {
  private static durationItems = ['ч.', 'мин.'];

  public static secondsToDuration(value: number | string): string {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    if (!value || isNaN(value) || value < 60) {
      return '0';
    }

    const prettyValue = DurationMapper.roundSecondsToMinutes(value);
    const time = DurationMapper.toHHMM(prettyValue);
    const splitTimeString = time.split(':');
    const dateStringList = splitTimeString.map((item, idx) => `${item} ${DurationMapper.durationItems[idx]}`);

    return DurationMapper.joinExcludeNill(dateStringList);
  }

  public static durationToSeconds(value: string): number {
    if (!value || isNaN(parseInt(value))) {
      return 0;
    }

    const hoursAndMinutes = value.split(' ');

    return parseInt(hoursAndMinutes[0]) * 3600 + parseInt(hoursAndMinutes[1]) * 60;
  }

  public static durationComparator(value1: string, value2: string): number {
    return DurationMapper.durationToSeconds(value1) - DurationMapper.durationToSeconds(value2);
  }

  private static roundSecondsToMinutes(value: number): number {
    const residue = value % 60;

    if (!residue) {
      return value;
    } else if (residue > 30) {
      return value + (60 - residue);
    } else if (residue <= 30) {
      return value - residue;
    }
  }

  private static toHHMM(value: number): string {
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

  private static joinExcludeNill(durationList: string[]): string {
    return durationList.filter(DurationMapper.excludeNill).join(' ');
  }

  private static excludeNill(dateString: string): boolean {
    return !new RegExp('^00').test(dateString);
  }
}
