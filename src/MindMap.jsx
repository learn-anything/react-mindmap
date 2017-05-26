import { Component, PropTypes } from 'react';

import { getJSON, matchStyle, parseEmojis } from './utils';
import '../sass/MindMap.sass';

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

    const Xs = this.state.nodes.map(node => node.location.x);
    const Ys = this.state.nodes.map(node => node.location.y);

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

  renderNodes() {
    return this.state.nodes.map((node) => {
      // Find offset for centering nodes.
      const cx = node.location.x - (node.title.maxWidth / 2);
      const cy = node.location.y - 25;

      // Unstyled HTML with parsed emojis.
      const innerHTML = parseEmojis(node.title.text.replace(matchStyle, ''));

      return (
        <foreignObject
          className="mindmap-node"
          dangerouslySetInnerHTML={{ __html: innerHTML }}
          transform={`translate(${cx}, ${cy})`}
          width={node.title.maxWidth}
          height="50px"
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
      <svg viewBox={this.viewBox()} className="mindmap-svg">
        <g>{this.renderConnections()}</g>
        <g>{this.renderNodes()}</g>
      </svg>
    );
  }

  componentDidUpdate(prevProps) {
    // If URL, nodes, or connections have changed, reload the map.
    if (prevProps.url !== this.props.url
      || prevProps.nodes !== this.props.nodes
      || prevProps.connections !== this.props.connections) {
      this.setState({ fetched: false });
    }
  }
}

MindMap.propTypes = {
  url: PropTypes.string,
  nodes: PropTypes.array,
  connections: PropTypes.array,
};
