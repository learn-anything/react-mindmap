[![NPM](https://nodei.co/npm/react-mindmap.png)](https://npmjs.org/package/react-mindmap)

# React Mindmap
A React component for [MindNode](https://mindnode.com/) maps (or other mindmaps).


## Installation

    npm install react-mindmap --save


## Usage

```js
import { Component } from 'react';
import { render } from 'react-dom';
import MindMap from 'react-mindmap';
import { nodes, connections } from './my-map.json';

class Example extends Component {
  render() {
    return (
      <MindMap
        nodes={this.props.nodes}
        connections={this.props.connections}
      />
    );
  }
}

render(
  <Example nodes={nodes} connections={connections} />,
  document.getElementById('target')
);
```

![img](https://raw.githubusercontent.com/learn-anything/img/master/react-mindmap-example.png)


## Testing
To test this repository run these commands

```
git clone https://github.com/learn-anything/react-mindmap
cd react-mindmap
npm install && npm run test
```

and connect to http://localhost:3000/


## Parser
This repo also has a parser that automates the conversion of JSON maps from MindNode
to the format used by this component. To use it run:

```
npm run parse path/to/mindnode/maps path/to/converted/maps
```


## Props
| Prop            | Type    | Default | Description                                            |
|-----------------|:-------:|---------|--------------------------------------------------------|
| **nodes**       | Array   | []      | Array of objects used to render nodes.                 |
| **connections** | Array   | []      | Array of objects used to render connections.           |
| **subnodes**    | Array   | []      | Array of objects used to render subnodes.              |
| **editable**    | Boolean | false   | Enable editor mode, which allows to move around nodes. |

### nodes
Array of objects used to render nodes. Below an example of the node structure.

```json
{
  "text": "python",
  "url": "http://www.wikiwand.com/en/Python_(programming_language)",
  "fx": -13.916222252976013,
  "fy": -659.1641376795345,
  "category": "wiki",
  "note": ""
}
```

The possible attributes are:

- **text**: title of the node
- **url**: url contained in the node
- **fx** and **fy**: coordinates (if not present they'll be generated)
- **category**: category used to generate an emoji
- **note**: note that will be visible on hover

### connections
Array of objects used to render connections. Below an example of the connection
structure.

```json
{
  "source": "python",
  "target": "basics",
  "curve": {
    "x": -43.5535,
    "y": 299.545
  }
}
```

The possible attributes are:

- **source**: title of the node where the connection starts
- **target**: title of the node where the connection ends
- **curve.x** and **curve.y**: coordinates of the control point of a quadratic bezier curve
(if not specified the connection will be straight)

### subnodes
Array of objects used to render subnodes. The structure is the same as for nodes
with two additional attributes:

- **parent**: title of the parent node
- **color**: used for the margin color, needs to be a valid CSS color


## Styling
Here's a list of all CSS classes for styling:

- **.mindmap-svg**: main `svg` element containing the map;
- **.mindmap-node**: `foreignObject` element representing a node;
- **.mindmap-node--editable**: `foreignObject` element representing a node in editor mode;
- **.mindmap-subnode-group-text**: `foreignObject` element containing all subnodes of a given node;
- **.mindmap-subnode-text**: `div` element containing a subnode;
- **.mindmap-connection**: `path` element for each connection;
- **.mindmap-emoji**: `img` tag for emoji


## Contributing
If you want a new feature added, you find bugs or you want to help making some changes,
feel free to open an issue or submit a pull request. Any help would be greatly appreciated :heart:
