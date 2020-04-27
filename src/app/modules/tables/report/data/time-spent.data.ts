import { planning } from '@core/services/planning.service';

export function getTimeSpentData(): any[] {
  return [
    {
      user: 'Andrew',
      doneNumber: '3',
      scheduledTime: planning['Andrew'].sprint1,
      sumOfEstimation: '35',
      trackedTime: '33',
      sprint: 'Доска Спринт 1'
    },
    {
      user: 'Anton Vakhrushin',
      doneNumber: '6',
      scheduledTime: planning['Anton Vakhrushin'].sprint1,
      sumOfEstimation: '37',
      trackedTime: '30',
      sprint: 'Доска Спринт 1'
    },
    {
      user: 'Ekaterina',
      doneNumber: '2',
      scheduledTime: planning['Ekaterina'].sprint1,
      sumOfEstimation: '8',
      trackedTime: '12',
      sprint: 'Доска Спринт 1'
    },
    {
      user: 'Andrew',
      doneNumber: '5',
      scheduledTime: planning['Andrew'].sprint2,
      sumOfEstimation: '27',
      trackedTime: '24',
      sprint: 'Доска Спринт 2'
    },
    {
      user: 'Anton Vakhrushin',
      doneNumber: '4',
      scheduledTime: planning['Anton Vakhrushin'].sprint2,
      sumOfEstimation: '27',
      trackedTime: '33',
      sprint: 'Доска Спринт 2'
    },
    {
      user: 'Ekaterina',
      doneNumber: '3',
      scheduledTime: planning['Ekaterina'].sprint2,
      sumOfEstimation: '18',
      trackedTime: '19',
      sprint: 'Доска Спринт 2'
    }
  ];
}
