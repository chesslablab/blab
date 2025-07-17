import { AbstractSanMoves } from './AbstractSanMoves.js';

export class SanMovesTable extends AbstractSanMoves {
  mount() {
    this._el.replaceChildren();

    this._moves().forEach(move => {
      const div = document.createElement('div');
      const nSpan = document.createElement('span');
      const wSpan = document.createElement('span');

      nSpan.appendChild(document.createTextNode(move.n));
      div.appendChild(nSpan);

      wSpan.appendChild(document.createTextNode(move.w));
      wSpan.addEventListener('click', () => {
        this.current = move.wFen;
        this.props.chessboard.setPosition(this.props.fen[this.current], true);
        this._activeMove(wSpan);
      });
      if (move.wFen === this.current) {
        this._activeMove(wSpan);
      }
      div.appendChild(wSpan);

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
        div.appendChild(bSpan);
      }

      this._el.appendChild(div);
    });

    this._el.parentNode.parentNode.scrollTop = this._el.parentNode.parentNode.scrollHeight;
  }
}
