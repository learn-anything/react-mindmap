const path = require('path');
const fs = require('fs');
const walk = require('fs-walk').walk;

const input = process.argv[2];
const output = process.argv[3];

/*
 * Recursively walk a directory and call a function on all its files.
 */
const walkDir = (dirname, fn) =>
  walk(dirname, (basedir, filename, stat) => {
    const absPath = path.resolve(path.join(__dirname, '/../..'), basedir, filename);

    if (stat.isDirectory()) {
      return walkDir(absPath, fn);
    }

    if (typeof fn === 'function') {
      fn(require(absPath), absPath);
    }
  });

// Return an emoji as a GitHub image.
const emojiTemplate = unicode =>
  `<img class="mindmap-emoji" src="https://assets-cdn.github.com/images/icons/emoji/unicode/${unicode}.png">`;

const customEmojiTemplate = emoji =>
  `<img class="mindmap-emoji" src="https://assets-cdn.github.com/images/icons/emoji/${emoji}.png">`;

/* Convert all emojis in an HTML string to GitHub images.
 * The bitwise magic is explained at:
 *    http://crocodillon.com/blog/parsing-emoji-unicode-in-javascript
 */
const parseEmojis = html =>
  html.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, (match) => {
    if (match === '🐙') {
      return customEmojiTemplate('octocat');
    }
    if (match === '🤖') {
      return '<img class="mindmap-emoji reddit-emoji" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNpOQVZdTCyVamjJPl92KjaDHigNWVM8mOLHPRU4DHoVNJWxCg">';
    }
    if (match === '🗂') {
      return '<img class="mindmap-emoji" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/se/se-icon.png?v=93426798a1d4">';
    }

    // Keep the first 10 bits.
    const lead = match.charCodeAt(0) & 0x3FF;
    const trail = match.charCodeAt(1) & 0x3FF;

    // 0x[lead][trail]
    const unicode = ((lead << 10) + trail).toString(16);

    return emojiTemplate(`1${unicode}`);
  });

const parseNode = (node) => {
  // Match style attributed in an HTML string.
  const matchStyle = /style="([^"]*)"|style='([^']*)'/g;
  const parsedNode = {};

  parsedNode.innerHTML = parseEmojis(node.title.text.replace(matchStyle, ''));

  return parsedNode;
};

walkDir(input, (map, filename) => {
  const parsedMap = {
    title: map.title,
    nodes: map.nodes.map(node => parseNode(node)),
  };

  console.log(JSON.stringify(parsedMap, null, 2));
  console.log('\n\n\n');
});
