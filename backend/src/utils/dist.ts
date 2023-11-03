import { dirname, join } from 'path';

export const distFolder = join(dirname(require.main.filename), 'stories');
