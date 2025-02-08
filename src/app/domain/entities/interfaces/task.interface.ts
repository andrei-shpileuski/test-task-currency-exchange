export interface ITaskResponse {
  repositoryLink: string;
  title: Record<string, string>;
  text: Record<string, string[]>;
}

export interface ITask extends Omit<ITaskResponse, 'title' | 'text'> {
  title: string;
  text: string[];
}
