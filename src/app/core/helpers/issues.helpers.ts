import { IssueBeanModel } from '@core/api/platform/model/issueBean';
import { Sprint } from '@core/api/software/model/sprint';

function getSprintFromGreenhopperData(greenhopperData: string): Sprint {
  if (!greenhopperData) {
    return null;
  }

  const sprintInfo = greenhopperData.slice(greenhopperData.indexOf('[') + 1, greenhopperData.indexOf(']'));
  const infoArray = sprintInfo.split(',');
  const sprintPreview: any = {};

  infoArray.forEach(info => {
    const entry = info.split('=');

    sprintPreview[entry[0]] = entry[1] === '<null>' ? null : entry[1];
  });

  return {
    id: Number(sprintPreview.id),
    state: sprintPreview.state && sprintPreview.state.toString().toLowerCase(),
    name: sprintPreview.name,
    startDate: sprintPreview.startDate,
    endDate: sprintPreview.endDate,
    completeDate: sprintPreview.completeDate
  } as Sprint;
}

export function getCurrentSprint(issue: IssueBeanModel): Sprint | null {
  const greenhopperData: string[] = issue.fields['customfield_10020'] as string[];

  if (!greenhopperData) {
    return null;
  }

  let currentSprintData = greenhopperData[greenhopperData.length - 1];

  return getSprintFromGreenhopperData(currentSprintData);
}

export function getSprintByDate(issue: IssueBeanModel, date: Date): Sprint | null {
  const greenhopperData: string[] = issue.fields['customfield_10020'] as string[];

  if (!greenhopperData) {
    return null;
  }

  return greenhopperData
    .map(data => getSprintFromGreenhopperData(data))
    .find(sprint => new Date(sprint.startDate) <= date && new Date(sprint.completeDate || sprint.endDate) >= date);
}
