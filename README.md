# React Mindmap
A React component for [MindNode](https://mindnode.com/) maps.

## Installation

    npm install react-mindmap --save

## Usage

```js
import { Component } from 'react';
import { render } from 'react-dom';
import MindMap from 'react-mindmap';

class Example extends Component {
  render() {
    return (
      <MindMap url="/maps/devops.json" />
    );
  }
}

render(<Example />, document.getElementById('target'));
```

![img](https://raw.githubusercontent.com/learn-anything/img/master/react-mindmap-example.png)

## Props
| Prop                          | Type   | Default | Description                                                                                      |
|-------------------------------|:------:|:-------:|--------------------------------------------------------------------------------------------------|
| [`url`](#url)                 | String |         | URL to fetch the map's JSON. If specified the other two props won't be taken into consideration. |
| [`nodes`](#nodes)             | Array  | [ ]     | Array of objects used to render nodes. Is used only when `url` is not specified.                 |
| [`connections`](#connections) | Array  | [ ]     | Array of objects used to render connections. Is used only when `url` is not specified.           |

### url
URL indicating the location of the map's JSON. The URL has to return a valid JSON
with the following structure.

```js
{
  "nodes": [
    { /* node 1 */ },
    { /* node 2 */ },
    ...
  ],
  "connections": [
    { /* connection 1 */ },
    { /* connection 2 */ },
    ...
  ]
}
```

### nodes
Array of objects with the following structure.

```json
{
  "id": "79ED2113",
  "title": {
    "maxWidth": 300.0,
    "text": "<p><a href=\"http://www.wikiwand.com/en/DevOps\">DevOps 🌐</a></p>"
  },
  "location": {
    "x": 93,
    "y": -527
  }
}
```

### connections
Array of objects with the following structure. **wayPointOffset** is the offset
from the starting point, for the control point of a quadratic bezier curve. If the
connections are straight, just let the coordinated be 0.

```json
{
  "startNodeID": "79ED2113",
  "endNodeID": "A6760924",
  "wayPointOffset": {
    "x": -188.84,
    "y": 71.79
  }
}
```

## Styling
All inline styling in `node.title.text` is removed automatically, and all emojis
are converted to image tags with emojis from github.

The rendered map uses four css classes for styling:

- **.mindmap-svg**: main `svg` element containing the map;
- **.mindmap-node**: `foreignObject` element containing the HTML code from `node.title.text`;
- **.mindmap-connection**: `path` element for each connection;
- **.mindmap-emoji**: `img` tag for emoji

## TODO
This component is still work in progress, so there's some features missing. The most
critical features that we're working on are:

- [] showing sub nodes
- [] showing notes
- [] adding the possibility to move around the map with pan and zoom

## Contributing
If you want a new feature added, you find bugs or you want to help making some changes,
feel free to open an issue or submit a pull request. Any help would be greatly appreciated :heart:
