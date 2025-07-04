import { Movetext } from './common/Movetext.js';
import { Pgn } from './common/Pgn.js';
import AbstractMoves from './AbstractMoves.js';

export class AbstractSanMoves extends AbstractMoves {
  _moves() {
    let j = 1;

    let rows = Movetext.toRows(
      this.props.movetext?.replace(/\s?\{[^}]+\}/g, '')
        .replace(/\s?\$[1-9][0-9]*/g, '')
        .trim()
    );

    rows.forEach((row, i) => {
      if (row.w !== '...') {
        row.wFen = j;
        j += 1;
      }
      if (row.b) {
        row.bFen = j;
        j += 1;
      }
    });

    return rows;
  }

  _activeMove(el) {
    Array.from(document.querySelectorAll(`.${this._className}`)).forEach(el => el.classList.remove(this._className));
    el.classList.add(this._className);
    this.props.chessboard.state.inputWhiteEnabled = false;
    this.props.chessboard.state.inputBlackEnabled = false;
    if (this.props.fen[this.current] === this.props.fen[this.props.fen.length - 1]) {
      this.props.fen[this.current].split(' ')[1] === Pgn.symbol.WHITE
        ? this.props.chessboard.state.inputWhiteEnabled = true
        : this.props.chessboard.state.inputBlackEnabled = true;
    }
  }
}
