import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MindMap from '../src';

const render = (path, editable) => {
  const map = require(path);

  return <MindMap
    connections={map.connections}
    nodes={map.nodes}
    subnodes={map.subnodes}
    editable={editable}
  />;
};

storiesOf('maps', module)
  .add('devops', () => render('./parsed-maps/programming/devops.json'))
  .add('map', () => render('./parsed-maps/map.json'))
  .add('python', () => render('./parsed-maps/python.json'));

storiesOf('editable', module)
  .add('true', () => render('./parsed-maps/python.json', true))
  .add('false', () => render('./parsed-maps/python.json', false));
