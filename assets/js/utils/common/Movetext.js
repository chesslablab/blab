import { Move } from './Move.js';
import { Nag } from './Nag.js';
import { NOTATION_SAN } from '../constants.js';

export class Movetext {
  static notation = (fmt, str) => {
    if (fmt === NOTATION_SAN) {
      return Movetext.toSan(str);
    }

    return Movetext.toFan(str);
  }

  static toSan = (str) => {
    str = str.replaceAll('♖', 'R');
    str = str.replaceAll('♘', 'N');
    str = str.replaceAll('♗', 'B');
    str = str.replaceAll('♕', 'Q');
    str = str.replaceAll('♔', 'K');

    return str;
  }

  static toFan = (str) => {
    str = Movetext.replace('R', '♖', str);
    str = Movetext.replace('N', '♘', str);
    str = Movetext.replace('B', '♗', str);
    str = Movetext.replace('Q', '♕', str);
    str = Movetext.replace('K', '♔', str);

    return str;
  }

  static replace = (letter, unicode, movetext) => {
    let matches = [];
    if (letter === 'K') {
      matches = [...matches, ...movetext.matchAll(Move.KING)];
      matches = [...matches, ...movetext.matchAll(Move.KING_CAPTURES)];
    } else if (letter === 'N') {
      matches = [...matches, ...movetext.matchAll(Move.KNIGHT)];
      matches = [...matches, ...movetext.matchAll(Move.KNIGHT_CAPTURES)];
    } else {
      matches = [...matches, ...movetext.matchAll(Move.PIECE)];
      matches = [...matches, ...movetext.matchAll(Move.PIECE_CAPTURES)];
    }
    matches.forEach(value => {
      const replaced = value[0].replace(letter, unicode);
      movetext = movetext.replace(value, replaced);
    });

    return movetext;
  }

  static description = (str) => {
    if (str.startsWith('{')) {
      let match = str.match(/{([^}]+)}/g)[0];
      return match.substring(1, match.length - 1);
    }

    return null;
  }

  static toRows = (str) => {
    let n = 1;
    let rows = [];
    if (str) {
      const arr = str.split(' ').filter(item => item);
      if (/^[1-9][0-9]*\.\.\.(.*)/.exec(str)) {
        const exploded = arr[0].split('...');
        n = parseInt(exploded[0]);
        rows.push({
          n: n,
          w: '...',
          b: exploded[1],
        });
        arr.shift();
      } else {
        const exploded = arr[0].split('.');
        n = parseInt(exploded[0]);
        rows.push({
          n: n,
          w: arr[0].split('.')[1],
          b: arr[1]
        });
        arr.shift();
        arr.shift();
      }
      arr.forEach((item, i) => {
        if (i % 2 === 0) {
          n += 1;
          rows.push({
            n: n,
            w: arr[i].split('.')[1] ?? arr[i],
            ...(arr[i+1] && {b: /^[1-9][0-9]*\.\.\.(.*)/.exec(arr[i+1]) ? arr[i+1].split('...')[1] : arr[i+1]})
          });
        }
      });
    }

    return rows;
  }

  static toCommentedRows = (str, nBreakdown) => {
    const rows = Movetext.toRows(
      str.replace(/(\{.*?\})/g, '')
        .replace(/\$[1-9][0-9]*/g, '')
        .replace(/  +/g, ' ')
        .replace(/[()]/g, '')
    );

    let commented = str;

    str.match(/\$[1-9][0-9]*/g)?.forEach((nag, i) => {
      commented = commented.replace(nag, `{${Nag.comment(nag)}}`);
    });

    rows.forEach(row => {
      commented.match(/\{(.*?)\}/g)?.forEach(comment => {
        if (commented.includes(`${row.n}.${row.w} ${comment}`)) {
          row.w += ` ${comment}`;
        } else if (commented.includes(`${row.n}.${row.w} ${row.b} ${comment}`)) {
          row.b += ` ${comment}`;
        } else if (commented.includes(`${row.n}...${row.b} ${comment}`)) {
          row.b += ` ${comment}`;
        }
      });
      row.w = row.w.replace(/[{}]/g, '');
      row.b = row.b?.replace(/[{}]/g, '');
      row.nBreakdown = nBreakdown;
    });

    return rows;
  }

  static substring = (str, back) => {
    let substr = '';
    const arr = str.split(' ');
    arr.forEach((item, i) => {
      if (i <= arr.length - 1 + back) {
        substr += `${item} `;
      }
    });

    return substr.slice(0, -1);
  }

  static openParentheses = (str) => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') {
        count += 1;
      } else if (str[i] === ')') {
        count -= 1;
      }
    }

    return count;
  }

  static rgb = (r, g, b) => `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`;

  static haystack = (str) => str.replace(/(\{.*?\})/g, '')
    .replace(/\s?\$[1-9][0-9]*/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\( /g, '(')
    .replace(/ \)/g, ')')
    .trim();

  static needles = (rows) => {
    return rows.map(row =>
      row.w === '...'
        ? `${row.n}...${row.b.replace(/ .*/,'') ?? ''}`.trim()
        : `${row.n}.${row.w.replace(/ .*/,'')} ${row.b?.replace(/ .*/,'') ?? ''}`.trim()
      );
  }
}
