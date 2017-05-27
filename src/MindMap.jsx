/* eslint-disable class-methods-use-this */
import { Component, PropTypes } from 'react';
import panzoom from 'panzoom';

import { getJSON, matchStyle, parseEmojis, htmlDimensions } from './utils';
import '../sass/MindMap.sass';

let panzoomInstance;

export default class MindMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connections: [],
      fetched: false,
      nodes: [],
    };
  }

  // Request map and load nodes and connections to state.
  fetchMap() {
    getJSON(this.props.url, res => this.setState({
      connections: res.connections,
      nodes: res.nodes,
      fetched: true,
    }));
  }

  // Calculate SVG viewport dimensions from the nodes.
  viewBox() {
    if (!this.state.fetched) {
      return '0 0 0 0';
    }

    const Xs = [];
    const Ys = [];

    this.state.nodes.forEach((node) => {
      node.nodes.forEach(subnode => Xs.push(subnode.location.x));
      Xs.push(node.location.x);
    });

    this.state.nodes.forEach((node) => {
      node.nodes.forEach(subnode => Ys.push(subnode.location.y));
      Ys.push(node.location.y);
    });

    const minX = Math.round(Math.min(...Xs) - 150);
    const minY = Math.round(Math.min(...Ys) - 150);
    const maxX = Math.round(Math.max(...Xs) - minX) + 150;
    const maxY = Math.round(Math.max(...Ys) - minY) + 150;

    return `${minX} ${minY} ${maxX} ${maxY}`;
  }

  renderConnections() {
    // Hashmap for nodes lookup.
    const nodes = {};
    this.state.nodes.forEach((node) => { nodes[node.id] = node; });

    return this.state.connections.map((conn) => {
      // Parameters for drawing a quadratic bezier curve.
      const d = [
        'M',
        nodes[conn.startNodeID].location.x,
        nodes[conn.startNodeID].location.y,
        'Q',
        nodes[conn.startNodeID].location.x + conn.wayPointOffset.x,
        nodes[conn.startNodeID].location.y + conn.wayPointOffset.y,
        ',',
        nodes[conn.endNodeID].location.x,
        nodes[conn.endNodeID].location.y,
      ];

      return (<path className="mindmap-connection" d={d.join(' ')} />);
    });
  }

  renderSubNodes() {
    const subnodes = [];

    this.state.nodes.forEach((node) => {
      node.nodes.forEach((subnode) => {
        // Unstyled HTML with parsed emojis.
        const innerHTML = parseEmojis(subnode.title.text.replace(matchStyle, ''));

        // Get subnode dimensions.
        const dimensions = htmlDimensions(innerHTML, {
          maxWidth: subnode.title.maxWidth,
        }, 'mindmap-subnode-text');

        // Find offset for centering subnodes.
        const cx = subnode.location.x;
        const cy = subnode.location.y - (dimensions.height / 2);

        // Parameters for drawing subnode connection.
        const d = [
          'M',
          node.location.x,
          node.location.y,
          'C',
          node.location.x + ((subnode.location.x - node.location.x) / 2),
          node.location.y,
          ',',
          node.location.x + ((subnode.location.x - node.location.x) / 2),
          subnode.location.y,
          ',',
          subnode.location.x,
          subnode.location.y,
        ];

        subnodes.push(
          <g className="mindmap-subnode">
            <path
              className="mindmap-subnode-connection"
              stroke={subnode.shapeStyle.borderStrokeStyle.color}
              d={d.join(' ')}
            />

            <foreignObject
              className="mindmap-subnode-text"
              dangerouslySetInnerHTML={{ __html: innerHTML }}
              transform={`translate(${cx}, ${cy})`}
              width={subnode.title.maxWidth}
              height={dimensions.height + 4}
            />
          </g>);
      });
    });

    return subnodes;
  }

  renderNodes() {
    return this.state.nodes.map((node) => {
      // Unstyled HTML with parsed emojis.
      const innerHTML = parseEmojis(node.title.text.replace(matchStyle, ''));

      // Get node dimensions.
      const dimensions = htmlDimensions(innerHTML, {
        maxWidth: node.title.maxWidth,
      }, 'mindmap-node');

      // Find offset for centering nodes.
      const cx = node.location.x - (node.title.maxWidth / 2);
      const cy = node.location.y - (dimensions.height / 2);


      return (
        <foreignObject
          className="mindmap-node"
          dangerouslySetInnerHTML={{ __html: innerHTML }}
          transform={`translate(${cx}, ${cy})`}
          width={node.title.maxWidth}
          height={dimensions.height + 4}
        />
      );
    });
  }

  render() {
    // Request map if url is specified and map hasn't been requested yet.
    if (this.props.url && !this.state.fetched) {
      this.fetchMap();
    }

    // Set nodes and connections to state if url is not specified
    // and this hasn't been done yet.
    if (!this.props.url && !this.state.fetched
      && this.props.connections.length > 0 && this.props.nodes.length > 0) {
      this.setState({
        connections: this.props.connections,
        nodes: this.props.nodes,
        fetched: true,
      });
    }

    return (
      <svg viewBox={this.viewBox()} className="mindmap-svg" draggable>
        <g className="mindmap-svg-inner">
          <g>{this.renderConnections()}</g>
          <g>{this.renderSubNodes()}</g>
          <g>{this.renderNodes()}</g>
        </g>
      </svg>
    );
  }

  // Create panzoom instance for pan and zoom.
  componentDidMount() {
    panzoomInstance = panzoom(document.querySelector('.mindmap-svg-inner'));
  }

  componentDidUpdate(prevProps) {
    // If URL, nodes, or connections have changed, reload the map.
    if (prevProps.url !== this.props.url
      || prevProps.nodes !== this.props.nodes
      || prevProps.connections !== this.props.connections) {
      this.setState({ fetched: false });
    }
  }

  // Destroy panzoom instance with all its listeners, to prevent memory leaking.
  componentWillUnmount() {
    panzoomInstance.dispose();
  }
}

MindMap.propTypes = {
  url: PropTypes.string,
  nodes: PropTypes.array,
  connections: PropTypes.array,
};
