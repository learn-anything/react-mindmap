const el = document.querySelector('svg');
el.setAttribute('height', window.innerHeight);
el.setAttribute('width', window.innerWidth);

const url = './map.json';
const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const simulation = d3.forceSimulation()
  .force('link', d3.forceLink().id(d => d.id))
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width / 2, height / 2));

d3.json(url, (error, json) => {
  const graph = {};
  graph.nodes = json.nodes.map(node => {
    const match = node.title.text.match(/<a href="(.*)".*>(.*)<\/a>/);

    return {
      id: node.id,
      color: node.shapeStyle.fillColor,
      url: match ? match[1] : '',
      text: match ? match[2] : '',
    };
  });
  graph.links = json.connections.map(conn => ({
    source: conn.startNodeID,
    target: conn.endNodeID,
    width: conn.pathStyle.strokeStyle.width,
  }));

  if (error) {
    throw error;
  }

  const link = svg.append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(graph.links)
    .enter().append('line')
    .attr('stroke', 'black')
    .attr('stroke-width', conn => conn.width);

  const node = svg.append('g')
    .attr('class', 'node')
    .selectAll('.node')
    .data(graph.nodes)
    .enter().append('text')
    .text(node => node.text)
      .on('click', node => location.href = node.url)
      .attr('fill', node => node.color)
      .call(d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded));

  // node.append('rect')
  //   .attr('width', )
  //   .attr('height', )
  //   .attr('fill', node => node.color);

  const ticked = () => {
    link
      .attr('x1', conn => conn.source.x)
      .attr('y1', conn => conn.source.y)
      .attr('x2', conn => conn.target.x)
      .attr('y2', conn => conn.target.y);

    node
      .attr('x', node => node.x)
      .attr('y', node => node.y);
  };

  node.append('title')
    .text(node => node.id);

  simulation
    .nodes(graph.nodes)
    .on('tick', ticked);

  simulation.force('link')
    .links(graph.links);
});

const dragStarted = (node) => {
  if (!d3.event.active) {
    simulation.alphaTarget(0.3).restart();
  }

  node.fx = node.x;
  node.fy = node.y;
};

const dragged = (node) => {
  node.fx = d3.event.x;
  node.fy = d3.event.y;
};

const dragEnded = (node) => {
  if (!d3.event.active) {
    simulation.alphaTarget(0);
  }

  node.fx = null;
  node.fy = null;
};
