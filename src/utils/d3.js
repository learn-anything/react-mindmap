import { drag, event, nest, select, zoom } from 'd3';
import { getDimensions, getViewBox } from './dimensions';

/*
 * Bind data to a <TAG> tag, inside a G element, inside the given root element.
 * Root is a D3 selection, data is an object or array, tag is a string.
 */
const bindData = (root, data, tag) => (
  root.append('g')
    .selectAll(tag)
    .data(data)
    .enter()
    .append(tag)
);

/*
 * Bind connections to PATH tags on the given SVG.
 */
export const d3Connections = (svg, connections) => (
  bindData(svg, connections, 'path')
    .attr('class', 'mindmap-connection')
);

/*
 * Bind nodes to FOREIGNOBJECT tags on the given SVG,
 * and set dimensions and html.
 */
export const d3Nodes = (svg, nodes) => (
  bindData(svg, nodes, 'foreignObject')
    .attr('class', 'mindmap-node')
    .attr('id', node => node.text.replace(/^[ ./~\-:+#]*\d*|[ ./~\-:+#]/g, ''))
    .attr('width', node => node.width + 4)
    .attr('height', node => node.height)
    .html(node => node.html)
);

/* eslint-disable no-param-reassign */
/*
 * Nest subnodes, bind groups to FOREIGNOBJECT tags on the given SVG,
 * and set dimensions and html.
 */
export const d3Subnodes = (svg, subnodes) => {
  // Nest subnodes by parent.
  const nestedSubs = nest()
    .key(sub => sub.parent.replace(/^[ ./~\-:+#]*\d*|[ ./~\-:+#]/g, '')).entries(subnodes);

  // Generate HTML and dimensions for each subnode group.
  nestedSubs.forEach((subGroup) => {
    subGroup.html = subGroup.values.map(sub => (
      `<div class="mindmap-subnode-text">${sub.html}</div>`
    )).join('');
    subGroup.html = `<span>${subGroup.html}</span>`;

    const dimensions = getDimensions(subGroup.html, {}, 'mindmap-subnode-group');
    subGroup.width = dimensions.width + 4;
    subGroup.height = dimensions.height;
  });

  const subs = bindData(svg, nestedSubs, 'g')
    .attr('class', 'mindmap-subnode-group');

  subs.append('foreignObject')
    .attr('class', 'mindmap-subnode-group-text')
    .attr('width', subGroup => subGroup.width)
    .attr('height', subGroup => subGroup.height)
    .html(subGroup => subGroup.html);

  return subs;
};


/*
 * Callback for forceSimulation tick event.
 */
export const onTick = (conns, nodes, subnodes) => {
  const d = conn => [
    'M',
    conn.source.x,
    conn.source.y,
    'Q',
    conn.source.x + (conn.curve.x || 0),
    conn.source.y + (conn.curve.y || 0),
    ',',
    conn.target.x,
    conn.target.y,
  ].join(' ');

  // Set the connections path.
  conns.attr('d', d);

  // Set nodes position.
  nodes
    .attr('x', node => node.x - (node.width / 2))
    .attr('y', node => node.y - (node.height / 2));

  // Set subnodes groups color and position.
  subnodes.select('foreignObject')
    .attr('style', (subGroup) => {
      const color = subGroup.values[0] ? subGroup.values[0].color : '';
      return `border-left-color: ${color}`;
    })
    .attr('transform', (subGroup) => {
      if (subGroup.key) {
        const parent = select(`#${subGroup.key}`).data()[0];

        if (parent) {
          const x = parent.x + (parent.width / 2) + 15;
          const y = parent.y - (subGroup.height / 2);

          return `translate(${x}, ${y})`;
        }
      }

      return null;
    });
};


/*
 * Return drag behavior to use on d3.selection.call().
 */
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
/* eslint-enable no-param-reassign */


/*
 * Return pan and zoom behavior to use on d3.selection.call().
 */
export const d3PanZoom = el => (
  zoom().scaleExtent([0.3, 5])
    .on('zoom', () => (
      el.selectAll('svg > g').attr('transform', event.transform)
    ))
);
