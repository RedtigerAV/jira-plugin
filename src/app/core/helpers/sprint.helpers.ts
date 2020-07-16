import { Sprint } from '@core/api/software/model/sprint';

export function filterSprintsByDates(sprints: Array<Sprint>, startDate: Date, endDate: Date): Array<Sprint> {
  return sprints.filter(sprint => {
    const sprintStartDate = new Date(sprint.startDate);
    // ToDo: сделать не new Date(), а конец или начало текущего дня
    const sprintEndDate = sprint.completeDate ? new Date(sprint.completeDate) : new Date();
    const isPeriodInside = sprintStartDate <= startDate && endDate <= sprintEndDate;
    const isPeriodOutside = startDate <= sprintStartDate && sprintEndDate <= endDate;
    const isPeriodRight = startDate <= sprintEndDate && startDate >= sprintStartDate;
    const isPeriodLeft = endDate >= sprintStartDate && endDate <= sprintEndDate;

    return isPeriodInside || isPeriodOutside || isPeriodRight || isPeriodLeft;
  });
}

export function getStartEndDatesFromSprints(fromSprint: Sprint, toSprint: Sprint): { startDate: Date, endDate: Date } {
  const startDate = fromSprint && fromSprint.startDate;
  const endDate = toSprint && toSprint.completeDate || (new Date()).toString();

  return { startDate: new Date(startDate), endDate: new Date(endDate) };
}
