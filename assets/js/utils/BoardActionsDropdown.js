import { COLOR } from "https://cdn.jsdelivr.net/npm/cm-chessboard@8.7.8/src/Chessboard.min.js";
import { Movetext } from './common/Movetext.js';
import AbstractComponent from './AbstractComponent.js';

export class BoardActionsDropdown extends AbstractComponent {
  mount() {
    this._el.querySelector('button').addEventListener('click', (event) => {
      event.preventDefault();
      this._el.querySelector(".dropdown-content").classList.toggle("show");
    });
    
    this._el.querySelector('div').children.item(0).addEventListener('click', (event) => {
      event.preventDefault();
      this._props.movesBrowser.props.chessboard.setOrientation(
        this._props.movesBrowser.props.chessboard.getOrientation() === COLOR.white ? COLOR.black : COLOR.white
      );
    });

    this._el.querySelector('div').children.item(1).addEventListener('click', (event) => {
      event.preventDefault();
      const back = (this._props.movesBrowser.props.fen.length - this._props.movesBrowser.current - 1) * -1;
      navigator.clipboard.writeText(Movetext.substring(this._props.movesBrowser.props.movetext, back));
    });

    this._el.querySelector('div').children.item(2).addEventListener('click', (event) => {
      event.preventDefault();
      navigator.clipboard.writeText(this._props.movesBrowser.props.fen[this._props.movesBrowser.current]);
    });
  }
}
