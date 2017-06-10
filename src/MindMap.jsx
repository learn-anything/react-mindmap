import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';

import { getViewBox } from './utils/dimensions';
import { d3Nodes, d3Links, d3Zoom, tick, dragStart, dragged, dragEnd } from './utils/d3';
import '../sass/main.sass';


export default class MindMap extends Component {
  constructor(props) {
    super(props);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(node => node.id))
      .force('charge', d3.forceManyBody())
      .force('collide', d3.forceCollide().radius(100));

    this.state = { simulation };
  }

  componentDidMount() {
    const svg = d3.select(this.refs.svg);

    const links = d3Links(svg, this.props.links, 'path');
    const nodes = d3Nodes(svg, this.props.nodes, 'foreignObject');

    this.state.simulation
      .nodes(this.props.nodes)
      .force('link').links(this.props.links);

    nodes.append('title').text(node => node.id);


    // If on edit mode allow dragging and let the simulation run.
    if (this.props.editable) {
      nodes
        .attr('class', 'mindmap-node mindmap-node--editable')
        .on('dblclick', (node) => {
          node.fx = null;
          node.fy = null;
        });


      nodes.call(
        d3.drag()
          .on('start', (node) => dragStart(node, this.state.simulation))
          .on('drag', dragged)
          .on('end', () => {
            dragEnd(this.state.simulation);
            svg.attr('viewBox', getViewBox(nodes.data()));
          })
      );

      this.state.simulation
        .alphaTarget(0.5).on('tick', () => tick(links, nodes));
    }

    // Run the simulation for 100 iterations.
    for (let i = 0; i < 100; i++) {
      this.state.simulation.tick();
    }

    tick(links, nodes);
    svg
      .attr('viewBox', getViewBox(nodes.data()))
      .call(d3Zoom(svg));
  }

  render() {
    return (
      <svg style={{border: '1px solid red'}}
        className="mindmap-svg"
        ref="svg"
      />
    );
  }
}


MindMap.defaultProps = {
  nodes: [],
  links: [],
  onIncompleteMap: () => {},
  editable: false,
};

MindMap.propTypes = {
  nodes: PropTypes.array,
  links: PropTypes.array,
  onIncompleteMap: PropTypes.func,
  editable: PropTypes.bool,
};
