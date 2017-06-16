/* eslint-disable no-param-reassign */
import { event, zoom, drag, select, nest } from 'd3';

import { getViewBox, getDimensions } from './dimensions';


// Bind data to specified tag inside a group on the given root.
const bindData = (root, data, tag) => (
  root.append('g')
    .selectAll(tag)
    .data(data)
    .enter()
    .append(tag)
);

// Bind links to path tags.
export const d3Links = (svg, links) => (
  bindData(svg, links, 'path')
    .attr('class', 'mindmap-link')
);

// Bind nodes to foreignObject tags.
export const d3Nodes = (svg, nodes) => (
  bindData(svg, nodes, 'foreignObject')
    .attr('class', 'mindmap-node')
    .attr('id', node => node.text.replace(/ /g, '-'))
    .attr('width', node => node.width + 3)
    .attr('height', node => node.height)
    .html(node => node.html)
);

// Bind nodes to foreignObject tags.
export const d3Subnodes = (svg, subnodes) => {
  const nestedSubs = nest().key(sub => sub.parent).entries(subnodes);
  nestedSubs.forEach((subGroup) => {
    subGroup.html = subGroup.values.map(sub => (
      `<div class="mindmap-subnode-text">${sub.html}</div>`
    )).join('');
    subGroup.html = `<span>${subGroup.html}</span>`;

    const dimensions = getDimensions(subGroup.html, {}, 'mindmap-subnode-group');
    subGroup.width = dimensions.width + 4;
    subGroup.height = dimensions.height;
  });

  const subs = bindData(svg, nestedSubs, 'g').attr('class', 'mindmap-subnode-group');

  subs.append('foreignObject')
    .attr('class', 'mindmap-subnode-group-text')
    .attr('width', subGroup => subGroup.width)
    .attr('height', subGroup => subGroup.height)
    .html(subGroup => subGroup.html);

  return subs;
};


// Callback for tick event on forceSimulation.
export const onTick = (links, nodes, subnodes) => {
  const d = link => [
    'M',
    link.source.x,
    link.source.y,
    'Q',
    link.source.x + (link.curve.x || 0),
    link.source.y + (link.curve.y || 0),
    ',',
    link.target.x,
    link.target.y,
  ].join(' ');

  links.attr('d', d);

  nodes
    .attr('x', node => node.x - (node.width / 2))
    .attr('y', node => node.y - (node.height / 2));

  subnodes.select('foreignObject')
    .attr('style', (subGroup) => {
      const color = subGroup.values[0] ? subGroup.values[0].color : '';
      return `border-left-color: ${color}`;
    })
    .attr('transform', (subGroup) => {
      if (subGroup.key) {
        const parent = select(`#${subGroup.key.replace(/ /g, '-')}`).data()[0];

        if (parent) {
          return `translate(${parent.x + (parent.width / 2) + 15}, ${parent.y - (subGroup.height / 2)})`;
        }
      }

      return null;
    });
};


// Callback for zoom event.
const onZoom = el => (
  el.selectAll('svg > g')
    .attr('transform', event.transform)
);

// Pan and zoom behavior.
export const d3PanZoom = el => (
  zoom().scaleExtent([0.3, 5])
    .on('zoom', () => onZoom(el))
);


// Drag nodes behavior.
export const d3Drag = (simulation, svg, nodes) => {
  const dragStart = (node) => {
    if (!event.active) {
      simulation.alphaTarget(0.2).restart();
    }

    node.fx = node.x;
    node.fy = node.y;
  };

  const dragged = (node) => {
    node.fx = event.x;
    node.fy = event.y;
  };

  const dragEnd = () => {
    if (!event.active) {
      simulation.alphaTarget(0);
    }

    svg.attr('viewBox', getViewBox(nodes.data()));
  };

  return drag()
    .on('start', dragStart)
    .on('drag', dragged)
    .on('end', dragEnd);
};
