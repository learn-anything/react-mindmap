const svg = document.querySelector('svg');
const nodes = document.querySelector('#nodes');
const connections = document.querySelector('#connections');
const matchStyle = /style="([\w\s:;,\-\.\(\)\&]*)"|style='([\w\s:;,"\-\.\(\)\&]*)'/g;
const map = {};

const get = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && typeof callback === 'function') {
      callback(JSON.parse(xhr.responseText));
    }
  };

  xhr.send();
};

const renderNode = (node) => {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.classList.add('node');
  g.setAttribute('transform', `translate(${node.location.x - (node.title.maxWidth / 2)}, ${node.location.y - 25})`);

  const bubble = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
  bubble.setAttribute('width', node.title.maxWidth);
  bubble.setAttribute('height', '50px');
  bubble.innerHTML = node.title.text.replace(matchStyle, '');
  g.appendChild(bubble);

  return g;
};

const renderConn = (conn) => {
  const startNode = map[conn.startNodeID];
  const endNode = map[conn.endNodeID];
  const loc = {
    x1: startNode.location.x,
    y1: startNode.location.y,
    x2: endNode.location.x,
    y2: endNode.location.y,
    qx: conn.wayPointOffset.x,
    qy: conn.wayPointOffset.y,
  };

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M ${loc.x1}, ${loc.y1} Q ${loc.x1 + loc.qx} ${loc.y1 + loc.qy}, ${loc.x2} ${loc.y2}`);
  path.classList.add('connection');
  return path;
};

get('./maps/devops.json', (res) => {
  res.nodes.forEach((node) => {
    map[node.id] = node;
    nodes.appendChild(renderNode(node));
  });

  res.connections.forEach(conn => connections.appendChild(renderConn(conn)));

  const x = Object.keys(map).map(node => map[node].location.x);
  const y = Object.keys(map).map(node => map[node].location.y);

  const pos = {
    minX: Math.round(Math.min(...x) - 100),
    minY: Math.round(Math.min(...y) - 100),
  };

  pos.maxX = Math.round((Math.max(...x) - pos.minX) + 100);
  pos.maxY = Math.round((Math.max(...y) - pos.minY) + 100);
  svg.setAttribute('viewBox', `${pos.minX} ${pos.minY} ${pos.maxX} ${pos.maxY}`);
});
