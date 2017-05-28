import { configure } from '@kadira/storybook';

const req = require.context('./', true, /story\.js$/);
configure(() => req.keys().forEach(req), module);
