import { Opening } from './common/Opening.js';
import AbstractComponent from './AbstractComponent.js';

export class OpeningTable extends AbstractComponent {
  mount() {
    this._el.replaceChildren();
    const opening = Opening.byLongestMovetext(this.props.movetext);
    if (opening) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.appendChild(document.createTextNode(`${opening[0].eco} ${opening[0].name}`));
      tr.appendChild(td);
      this._el.appendChild(tr);
    }
  }
}
