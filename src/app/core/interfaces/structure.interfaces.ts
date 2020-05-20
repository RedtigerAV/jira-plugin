export enum TableID {
  LIFECYCLE = 'lifecycle',
  DYNAMIC = 'dynamic',
  TIME_SPENT = 'time-spent',
  PLANNING = 'planning'
}

export enum ChartID {
  AVERAGE_PRODUCTIVITY = 'average-productivity',
  UNFINISHED_WORK = 'unfinished-work',
  PLAN_FACT = 'plan-fact'
}

export type StructureID = TableID | ChartID;
