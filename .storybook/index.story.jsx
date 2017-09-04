import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MindMap from '../src';

const render = (path, editable) => {
  const map = require(`./maps-parsed/${path}`);

  return <MindMap
    connections={map.connections}
    nodes={map.nodes}
    subnodes={map.subnodes}
    editable={editable}
  />;
};

storiesOf('maps', module)
  .add('devops', () => render('programming/devops.json'))
  .add('interviews', () => render('programming/programming-interviews.json'))
  .add('map', () => render('map.json'))
  .add('python (no coords)', () => render('python-no-coords.json'));

storiesOf('editable', module)
  .add('true (no coords)', () => render('python-no-coords.json', true))
  .add('true', () => render('python.json', true))
  .add('false', () => render('python.json', false));
