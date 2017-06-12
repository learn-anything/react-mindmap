import * as d3 from 'd3';
import { getViewBox } from './dimensions';

// Bind data to a specified tag inside a group on the given root.
const bindData = (root, data, tag) =>
  root.append('g')
    .selectAll(tag)
    .data(data)
    .enter().append(tag);

const zoom = el =>
  el.selectAll('svg > g').attr('transform', d3.event.transform);


// Render links from a d3 selection
export const d3Links = (root, data, tag) =>
  bindData(root, data, tag).attr('class', 'mindmap-link');

// Render links from a d3 selection
export const d3Nodes = (root, data, tag) =>
  bindData(root, data, tag).attr('class', 'mindmap-node')
    .attr('width', node => node.width)
    .attr('height', node => node.height)
    .html(node => node.html);

export const d3Subnodes = (root, data, tag) => {
  const subnodes = bindData(root, data, tag).attr('class', 'mindmap-subnode');

  subnodes.append('path')
    .attr('class', 'mindmap-subnode-connection')
    .attr('stroke', subnode => subnode.color)
    .attr('d', (subnode) => {
      const node = subnode.parent;
      console.log(node.__data__);
      const d = [
        'M',
        node.__data__.x,
        node.__data__.y,
        'C',
        node.__data__.x + ((subnode.x - node.__data__.x) / 2),
        node.__data__.y,
        ',',
        node.__data__.x + ((subnode.x - node.__data__.x) / 2),
        subnode.y,
        ',',
        subnode.x,
        subnode.y,
      ];

      return d.join(' ');
    });

  subnodes.append('foreignObject')
    .attr('class', 'mindmap-subnode-text')
    .attr('width', subnode => subnode.width)
    .attr('height', subnode => subnode.height)
    .attr('transform', (subnode) => {
      const cx = subnode.fx;
      const cy = subnode.fy - subnode.height / 2;

      return `translate(${cx}, ${cy})`;
    })
    .html(subnode => subnode.html);

  return subnodes;
};

export const tick = (links, nodes) => {
  const d = l => [
    'M',
    l.source.x,
    l.source.y,
    'Q',
    l.source.x + (l.curve.x || 0),
    l.source.y + (l.curve.y || 0),
    ',',
    l.target.x,
    l.target.y,
  ].join(' ');

  links
    .attr('d', d);

  nodes
    .attr('x', node => node.x - (node.width / 2))
    .attr('y', node => node.y - (node.height / 2));
};

export const dragStart = (node, simulation) => {
  if (!d3.event.active) {
    simulation.alphaTarget(0.2).restart();
  }

  node.fx = node.x;
  node.fy = node.y;
};

export const dragged = (node) => {
  node.fx = d3.event.x;
  node.fy = d3.event.y;

  d3.selectAll('.mindmap-subnode-connection')
    .each(function (subnode) {

      if (node.id === subnode.parent.__data__.id) {
        const d = [
          'M',
          node.x,
          node.y,
          'C',
          node.x + ((subnode.fx - node.x) / 2),
          node.y,
          ',',
          node.x + ((subnode.fx - node.x) / 2),
          subnode.fy,
          ',',
          subnode.fx,
          subnode.fy,
        ];

        d3.select(this).attr('d', d.join(' '));
      }
    });
};

export const dragEnd = (simulation) => {
  if (!d3.event.active) {
    simulation.alphaTarget(0);
  }
};

export const d3PanZoom = (el) =>
  d3.zoom()
    .scaleExtent([0.3, 5])
    .on('zoom', () => zoom(el));

export const d3Drag = (simulation, svg, nodes) =>
  d3.drag()
    .on('start', node => dragStart(node, simulation))
    .on('drag', dragged)
    .on('end', () => {
      dragEnd(simulation);
      svg.attr('viewBox', getViewBox(nodes.data()));
    });
