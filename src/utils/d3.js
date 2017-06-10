import * as d3 from 'd3';

// Bind data to a specified tag inside a group on the given root.
const bindData = (root, data, tag) =>
  root.append('g')
    .selectAll(tag)
    .data(data)
    .enter().append(tag);

const zoom = el =>
  el.selectAll('g').attr('transform', d3.event.transform);


// Render links from a d3 selection
export const d3Links = (root, data, tag) =>
  bindData(root, data, tag).attr('class', 'mindmap-link');

// Render links from a d3 selection
export const d3Nodes = (root, data, tag) =>
  bindData(root, data, tag).attr('class', 'mindmap-node')
    .attr('width', node => node.width)
    .attr('height', node => node.height)
    .html(node => node.html);

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
};

export const dragEnd = (simulation) => {
  if (!d3.event.active) {
    simulation.alphaTarget(0);
  }
};

export const d3Zoom = (el) => {
  const viewBox = el.attr('viewBox');

  return d3.zoom()
    .scaleExtent([0.3, 5])
    .on('zoom', () => zoom(el));
};
