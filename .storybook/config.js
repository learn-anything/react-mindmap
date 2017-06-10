import { configure } from '@kadira/storybook';

const req = require.context('./', true, /story\.jsx$/);
configure(() => req.keys().forEach(req), module);
