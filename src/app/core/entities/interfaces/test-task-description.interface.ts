export interface ITestTaskDescription {
  repositoryLink: string;
  title: string;
  text: string[];
}

export interface ITestTaskDescriptionExtended
  extends Omit<ITestTaskDescription, 'title' | 'text'> {
  title: Record<string, string>;
  text: Record<string, string[]>;
}
