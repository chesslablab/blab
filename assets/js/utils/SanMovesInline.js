import { AbstractSanMoves } from './AbstractSanMoves.js';

export class SanMovesInline extends AbstractSanMoves {
  mount() {
    this._el.replaceChildren();

    this._moves().forEach(move => {
      const span = document.createElement('span');
      const wSpan = document.createElement('span');

      span.setAttribute('data-key', move.n);

      wSpan.appendChild(document.createTextNode(`${move.n}.${move.w}`));
      wSpan.addEventListener('click', () => {
        this.current = move.wFen;
        this.props.chessboard.setPosition(this.props.fen[this.current], true);
        this._activeMove(wSpan);
      });
      if (move.wFen === this.current) {
        this._activeMove(wSpan);
      }
      span.appendChild(wSpan);

      if (move.b) {
        const bSpan = document.createElement('span');
        bSpan.appendChild(document.createTextNode(move.b));
        bSpan.addEventListener('click', () => {
          this.current = move.bFen;
          this.props.chessboard.setPosition(this.props.fen[this.current], true);
          this._activeMove(bSpan);
        });
        if (move.bFen === this.current) {
          this._activeMove(bSpan);
        }
        span.appendChild(bSpan);
      }

      this._el.appendChild(span);
    });
  }
}
