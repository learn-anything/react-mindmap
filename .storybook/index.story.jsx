import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { convertMap, parseIDs } from '../src/utils/parsing';
import MindMap from '../src';


storiesOf('maps', module)
  .add('devops', () => {
    const map = convertMap(parseIDs(require('./maps/programming/devops.json')));

    return (<MindMap
      links={map.links}
      nodes={map.nodes}
      subnodes={map.subnodes}
    />);
  })
  .add('map', () => {
    const map = convertMap(parseIDs(require('./maps/map.json')));

    return (<MindMap
      links={map.links}
      nodes={map.nodes}
      subnodes={map.subnodes}
    />);
  })
  .add('math', () => {
    const map = convertMap(parseIDs(require('./maps/math.json')));

    return (<MindMap
      links={map.links}
      nodes={map.nodes}
      subnodes={map.subnodes}
    />);
  })
  .add('python', () => {
    const map = convertMap(parseIDs(require('./maps/python.json')));

    return (<MindMap
      links={map.links}
      nodes={map.nodes}
      subnodes={map.subnodes}
    />);
  });

storiesOf('editable', module)
  .add('true', () => {
    const map = convertMap(parseIDs(require('./maps/python.json')));

    return (<MindMap
      links={map.links}
      nodes={map.nodes}
      subnodes={map.subnodes}
      editable={true}
    />);
  })
  .add('false', () => {
    const map = convertMap(parseIDs(require('./maps/python.json')));

    return (<MindMap
      links={map.links}
      nodes={map.nodes}
      subnodes={map.subnodes}
      editable={false}
    />);
  });
