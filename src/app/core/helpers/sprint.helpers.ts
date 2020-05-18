import { Sprint } from '@core/api/software/model/sprint';

export function filterSprintsByDates(sprints: Array<Sprint>, startDate: Date, endDate: Date): Array<Sprint> {
  return sprints.filter(sprint => {
    const sprintStartDate = new Date(sprint.startDate);
    const sprintEndDate = new Date(sprint.completeDate || sprint.endDate);
    const isPeriodInside = sprintStartDate <= startDate && endDate <= sprintEndDate;
    const isPeriodOutside = startDate <= sprintStartDate && sprintEndDate <= endDate;
    const isPeriodRight = startDate <= sprintEndDate && startDate >= sprintStartDate;
    const isPeriodLeft = endDate >= sprintStartDate && endDate <= sprintEndDate;

    return isPeriodInside || isPeriodOutside || isPeriodRight || isPeriodLeft;
  });
}
