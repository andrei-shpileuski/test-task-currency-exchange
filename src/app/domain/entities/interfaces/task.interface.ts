export interface ITaskResponse {
  title: Record<string, string>;
  text: Record<string, string[]>;
  taskAssignedAt: Date;
  completionTime: number;
}

export interface ITask extends Omit<ITaskResponse, 'title' | 'text'> {
  title: string;
  text: string[];
}
