export enum SprintState {
  FUTURE = 'future',
  ACTIVE = 'active',
  CLOSED = 'closed'
}

export interface Sprint {
  id: number;
  self?: string;
  state?: SprintState;
  name: string;
  startDate?: string;
  endDate?: string;
  completeDate?: string;
  originBoardId?: number;
  goal?: string;
}
