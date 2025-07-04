import AbstractComponent from './AbstractComponent.js';

export class HistoryButtons extends AbstractComponent {
  mount() {
    this._el.children.item(0).addEventListener('click', () => {
      this.props.movesBrowser.current = 0;
      this.props.movesBrowser.props.chessboard.setPosition(
        this.props.movesBrowser.props.fen[this.props.movesBrowser.current], true
      );
      this.props.movesBrowser.mount();
    });

    this._el.children.item(1).addEventListener('click', () => {
      if (this.props.movesBrowser.current > 0) {
        this.props.movesBrowser.current = this.props.movesBrowser.current - 1;
        this.props.movesBrowser.props.chessboard.setPosition(
          this.props.movesBrowser.props.fen[this.props.movesBrowser.current], true
        );
        this.props.movesBrowser.mount();
      }
    });

    this._el.children.item(2).addEventListener('click', () => {
      if (this.props.movesBrowser.current < this.props.movesBrowser.props.fen.length - 1) {
        this.props.movesBrowser.current = this.props.movesBrowser.current + 1;
        this.props.movesBrowser.props.chessboard.setPosition(
          this.props.movesBrowser.props.fen[this.props.movesBrowser.current], true
        );
        this.props.movesBrowser.mount();
      }
    });

    this._el.children.item(3).addEventListener('click', () => {
      this.props.movesBrowser.current = this.props.movesBrowser.props.fen.length - 1;
      this.props.movesBrowser.props.chessboard.setPosition(
        this.props.movesBrowser.props.fen[this.props.movesBrowser.current], true
      );
      this.props.movesBrowser.mount();
    });
  }
}
