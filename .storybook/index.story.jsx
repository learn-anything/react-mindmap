import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { convertLinks, convertNodes } from '../src/utils/parsing';
import MindMap from '../src';


storiesOf('maps', module)
  .add('devops', () => {
    const { connections, nodes } = require('./maps/devops.json');
    return (<MindMap
      links={convertLinks(connections)}
      nodes={convertNodes(nodes)}
    />);
  })
  .add('map', () => {
    const { connections, nodes } = require('./maps/map.json');
    return (<MindMap
      links={convertLinks(connections)}
      nodes={convertNodes(nodes)}
    />);
  })
  .add('math', () => {
    const { connections, nodes } = require('./maps/math.json');
    return (<MindMap
      links={convertLinks(connections)}
      nodes={convertNodes(nodes)}
    />);
  })
  .add('python', () => {
    const { connections, nodes } = require('./maps/python.json');
    return (<MindMap
      links={convertLinks(connections)}
      nodes={convertNodes(nodes)}
    />);
  });

storiesOf('editable', module)
  .add('true', () => {
    const { connections, nodes } = require('./maps/devops.json');
    return (<MindMap
      links={convertLinks(connections)}
      nodes={convertNodes(nodes)}
      editable={true}
    />);
  })
  .add('false', () => {
    const { connections, nodes } = require('./maps/devops.json');
    return (<MindMap
      links={convertLinks(connections)}
      nodes={convertNodes(nodes)}
      editable={false}
    />);
  });
