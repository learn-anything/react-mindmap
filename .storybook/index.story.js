import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MindMap from '../src';

storiesOf('mind maps', module)
  .add('devops', () => {
    const { connections, nodes } = require('../test/maps/devops.json');
    return (<MindMap connections={connections} nodes={nodes} />);
  })
  .add('map', () => {
    const { connections, nodes } = require('../test/maps/map.json');
    return (<MindMap connections={connections} nodes={nodes} />);
  })
  .add('math', () => {
    const { connections, nodes } = require('../test/maps/math.json');
    return (<MindMap connections={connections} nodes={nodes} />);
  })
  .add('python', () => {
    const { connections, nodes } = require('../test/maps/python.json');
    return (<MindMap connections={connections} nodes={nodes} />);
  });
