import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MindMap from '../src';


storiesOf('maps', module)
  .add('devops', () => {
    const map = require('./parsed-maps/programming/devops.json');

    return (<MindMap
      links={map.connections}
      nodes={map.nodes}
      subnodes={map.subnodes}
    />);
  })
  .add('map', () => {
    const map = require('./parsed-maps/map.json');

    return (<MindMap
      links={map.connections}
      nodes={map.nodes}
      subnodes={map.subnodes}
    />);
  })
  .add('math', () => {
    const map = require('./parsed-maps/math.json');

    return (<MindMap
      links={map.connections}
      nodes={map.nodes}
      subnodes={map.subnodes}
    />);
  })
  .add('python', () => {
    const map = require('./parsed-maps/python.json');

    return (<MindMap
      links={map.connections}
      nodes={map.nodes}
      subnodes={map.subnodes}
    />);
  });

storiesOf('editable', module)
  .add('true', () => {
    const map = require('./parsed-maps/python.json');

    return (<MindMap
      links={map.connections}
      nodes={map.nodes}
      subnodes={map.subnodes}
      editable={true}
    />);
  })
  .add('false', () => {
    const map = require('./parsed-maps/python.json');

    return (<MindMap
      links={map.connections}
      nodes={map.nodes}
      subnodes={map.subnodes}
      editable={false}
    />);
  });
