/* eslint-disable no-param-reassign */
import React, { Component, PropTypes } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCollide,
  select,
} from 'd3';

import { d3Links, d3Nodes, d3PanZoom, d3Drag, onTick } from './utils/d3';
import { getDimensions, getViewBox } from './utils/dimensions';
import { toHTML } from './utils/parsing';
import '../sass/main.sass';


export default class MindMap extends Component {
  constructor(props) {
    super(props);

    const simulation = forceSimulation()
      .force('link', forceLink().id(node => node.text))
      .force('charge', forceManyBody())
      .force('collide', forceCollide().radius(100));

    this.state = { simulation };
  }

  renderMap() {
    const svg = select(this.refs.mountPoint);
    svg.append('g').attr('id', 'mindmap-subnodes');

    this.props.nodes.forEach((node) => {
      const dimensions = getDimensions(toHTML(node), {}, 'mindmap-node');

      node.width = dimensions.width;
      node.height = dimensions.height;
      node.html = toHTML(node);
    });

    const links = d3Links(svg, this.props.links);
    const nodes = d3Nodes(svg, this.props.nodes);
    nodes.append('title').text(node => node.note);

    this.state.simulation
      .nodes(this.props.nodes)
      .force('link').links(this.props.links);

    if (this.props.editable) {
      nodes
        .attr('class', 'mindmap-node mindmap-node--editable')
        .on('dblclick', (node) => {
          node.fx = null;
          node.fy = null;
        });

      nodes.call(d3Drag(this.state.simulation, svg, nodes));

      this.state.simulation
        .alphaTarget(0.5).on('tick', () => onTick(links, nodes));
    }

    for (let i = 0; i < 100; i += 1) {
      this.state.simulation.tick();
    }

    onTick(links, nodes);

    svg
      .attr('viewBox', getViewBox(nodes.data()))
      .call(d3PanZoom(svg))
      .on('dblclick.zoom', null);
  }

  componentDidMount() {
    this.renderMap();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <svg className="mindmap-svg" ref="mountPoint" />
    );
  }
}

MindMap.defaultProps = {
  nodes: [],
  subnodes: [],
  links: [],
  editable: false,
};

MindMap.propTypes = {
  nodes: PropTypes.array,
  subnodes: PropTypes.array,
  links: PropTypes.array,
  editable: PropTypes.bool,
};
