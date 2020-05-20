//tslint:disable

import { ChartID, TableID } from '@core/interfaces/structure.interfaces';

export const mainPageTexts = {
  pluginDescription: 'TimGo plugin allows you to plan and record labor costs in Agile projects. Thanks to him, you can monitor the effectiveness of both the team as a whole and each of its members in particular. Thanks to 3 reporting tables and a planning table, it will not be difficult for you to build reports on the work of the team, to analyze the effectiveness of work and plan future development.',
  [TableID.LIFECYCLE]: 'This report table records data on the following attributes: task number and link to it, task name, executor, time of change, date of change, sprint number, initial estimate of working time to complete the task, time spent, who wrote down the time spent in the task, task status.',
  [TableID.DYNAMIC]: 'The report table "Dynamics of the tasks" displays in a convenient format data on the dynamics of tasks both by time period and by a specific date or sprint, creating a data upload for all task statuses.',
  [TableID.TIME_SPENT]: 'This report table is built on the basis of the completed planning table, it is recorded in sprints. It provides visual information on how effective each developer is, based on data on completed tasks, time spent on them and the established planned load on each developer in the sprint.',
  [ChartID.AVERAGE_PRODUCTIVITY]: 'Эта линейная диаграмма отображает среднюю производительность всех пользователей от спринта к спринту по нескольким показателям: по затраченному времени и по первоначальной оценке решенных задач. Она позволяет узнать тенденцию по эффективности работы команды и предотвратить выгорание или упад мотивации.',
  [ChartID.UNFINISHED_WORK]: 'Эта столбчата диаграмма отображает данные о проценте времени незавершенных задач относительно времени всех задач в спринте. Если тренд диаграммы восходящий - это сигнализирует о проблемах в процессах команды. Если тренд нисходящий, значит точность вашего планирования улучшается от спринта к спринту.'
};
