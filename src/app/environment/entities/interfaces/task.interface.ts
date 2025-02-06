export interface ITask {
  repositoryLink: string;
  title: string;
  text: string[];
}

export interface ITaskRaw
  extends Omit<ITask, 'title' | 'text'> {
  title: Record<string, string>;
  text: Record<string, string[]>;
}
