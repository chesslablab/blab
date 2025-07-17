import {
  FORMAT_INLINE,
  FORMAT_TABLE,
  SanMovesInline,
  SanMovesTable
} from './index.js';

export class SanMovesFactory {
  static create = (fmt, el, props) => {
    if (fmt === FORMAT_TABLE) {
      el.classList.add(FORMAT_TABLE);
      return new SanMovesTable(el, props);
    }
    el.classList.add(FORMAT_INLINE);

    return new SanMovesInline(el, props);
  }
}
