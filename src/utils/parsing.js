/* eslint no-bitwise:off */
import { getDimensions } from './dimensions';

// Match style attributes in an HTML string.
export const matchStyle = /style="([^"]*)"|style='([^']*)'/g;

// Return an emoji as a GitHub image.
export const emojiTemplate = unicode =>
  `<img class="mindmap-emoji" src="https://assets-cdn.github.com/images/icons/emoji/unicode/${unicode}.png">`;

export const customEmojiTemplate = emoji =>
  `<img class="mindmap-emoji" src="https://assets-cdn.github.com/images/icons/emoji/${emoji}.png">`;

/* Convert all emojis in an HTML string to GitHub images.
 * The bitwise magic is explained at:
 *    http://crocodillon.com/blog/parsing-emoji-unicode-in-javascript
 */
export const parseEmojis = html =>
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

// TODO - convert subnodes
// Convert a list of nodes from Mindnode format to D3 format.
export const convertNodes = (nodes) =>
  nodes.map((node) => {
    // Remove style tags and parse emojis to image tags.
    const innerHTML = parseEmojis(node.title.text.replace(matchStyle, ''));

    // Calculate width and height of this node.
    const dimensions = getDimensions(innerHTML, {
      maxWidth: node.title.maxWidth,
    }, 'mindmap-node');

    // Change 15% of nodes as floating.
    const fixed = Math.random() > .15;

    return {
      id: node.id,
      html: innerHTML,
      fx: fixed ? node.location.x : null,
      fy: fixed ? node.location.y : null,
      width: node.title.maxWidth,
      height: dimensions.height + 4,
    };
  });

// Convert a list of connections from Mindnode format to D3 format.
export const convertLinks = (links) =>
  links.map(link => {
    // Change 15% of links as floating.
    const fixed = Math.random() > .25;

    return {
      source: link.startNodeID,
      target: link.endNodeID,
      curve: {
        x: fixed ? link.wayPointOffset.x : null,
        y: fixed ? link.wayPointOffset.y : null,
      }
    };
  });
