//tslint:disable

import { ChartID, TableID } from '@core/interfaces/structure.interfaces';

export const mainPageTexts = {
  pluginDescription: 'Плагин TimGo позволяет планировать и регистрировать трудозатраты в Agile проектах. Благодаря ему вы можете следить за эффективностью как команды в целом, так и каждого ее члена в частности. Благодаря 3 отчетным таблицам, 3 диагарммам и таблице планирования, а также системе фильтрации и сортировки, вам не составит труда построить отчеты о работе команды, проанализировать эффективность работы и спланировать дальнейшее развитие',
  [TableID.LIFECYCLE]: 'В эту таблицу отчетов записываются данные по следующим атрибутам: номер задачи и ссылка на нее, имя задачи, исполнитель, время изменения, дата изменения, номер спринта, первоначальная оценка рабочего времени для выполнения задачи, затраченное время, кто записал время, затраченное на задачу, статус задачи',
  [TableID.DYNAMIC]: 'Таблица отчетов «Динамика задач» отображает в удобном формате данные о динамике задач как по времени, так и по определенной дате или спринту, отображая все всю историю изменений задач по статусам в указанный вами период',
  [TableID.TIME_SPENT]: 'Эта таблица отчетов построена на основе заполненной таблицы планирования, она записана в спринтах. Она предоставляет визуальную информацию о том, насколько эффективен каждый разработчик, на основе данных о выполненных задачах, времени, потраченного на них, и установленной запланированной нагрузки на каждого разработчика в спринте',
  [ChartID.AVERAGE_PRODUCTIVITY]: 'Эта линейная диаграмма отображает среднюю производительность всех пользователей от спринта к спринту по нескольким показателям: по затраченному времени и по первоначальной оценке решенных задач. Она позволяет узнать тенденцию по эффективности работы команды и предотвратить выгорание или упад мотивации.',
  [ChartID.UNFINISHED_WORK]: 'Эта столбчата диаграмма отображает данные о проценте времени незавершенных задач относительно времени всех задач в спринте. Если тренд диаграммы восходящий - это сигнализирует о проблемах в процессах команды. Если тренд нисходящий, значит точность вашего планирования улучшается от спринта к спринту.',
  [ChartID.PLAN_FACT]: 'На этой линейной диаграмме отображено время, внесенное на странице планирования, и сумма оценок реально решенных задач от спринта к спринту. Процессы команды настроены идеально, когда сумма оценок всех решенных задач приближается к запланированному времени.',
  [ChartID.BUGS_WEIGHT]: 'Эта линейная диаграмма отображает забагованность разрабатываемой платформы. Расчет показателя забагованности ведется на приоритете. Чем выше приоритет, тем больше вес бага, тем больше забагованность.'
};
