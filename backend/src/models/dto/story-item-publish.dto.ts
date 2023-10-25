type StoryItem = {
  readonly fileName: string;
  readonly filePath: string;
  readonly title?: string;
  readonly exportVariables: string[];
};

export type PublishResultDto = Pick<StoryItem, 'fileName' | 'title'> & {
  snapshot: { type: string; data: Uint8Array };
};
