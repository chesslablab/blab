import {
  Chessboard,
  BORDER_TYPE,
  INPUT_EVENT_TYPE
} from "https://cdn.jsdelivr.net/npm/cm-chessboard@8.7.8/src/Chessboard.min.js";

import {
  FORMAT_INLINE,
  BoardActionsDropdown,
  HistoryButtons,
  Movetext,
  SanMovesFactory
} from './utils/index.js';

const params = new URLSearchParams(document.location.search);
const fen = decodeURIComponent(params.get("fen"));
const orientation = decodeURIComponent(params.get("orientation"));
const pieces = decodeURIComponent(params.get("pieces"));
const notation = decodeURIComponent(params.get("notation"));
const movetext = decodeURIComponent(params.get("movetext"));

try {
  const response = await fetch(`https://${window.location.hostname}/wp-content/plugins/blab/endpoints/san.php`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fen: fen,
      orientation: orientation,
      movetext: movetext 
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();

  const chessboard = new Chessboard(
    document.querySelector('#chessboard'),
    {
      assetsUrl: "https://cdn.jsdelivr.net/npm/cm-chessboard@8.7.8/assets/",
      position: json[json.length - 1],
      style: {pieces: {file: `pieces/${pieces}.svg`}, borderType: BORDER_TYPE.frame},
      orientation: orientation
    }
  );

  const inputHandler = (event) => {
    switch (event.type) {
      case INPUT_EVENT_TYPE.moveInputStarted:
        return true;
      case INPUT_EVENT_TYPE.validateMoveInput:
        return true;
      case INPUT_EVENT_TYPE.moveInputCanceled:
        break;
      case INPUT_EVENT_TYPE.moveInputFinished:
        break;
      case INPUT_EVENT_TYPE.movingOverSquare:
        break;
    }
  }

  chessboard.enableMoveInput(inputHandler);

  const sanMovesBrowser = SanMovesFactory.create(
    FORMAT_INLINE,
    document.querySelector('#movesBrowser'),
    {
      chessboard: chessboard,
      movetext: Movetext.notation(notation, movetext),
      fen: json
    }
  );

  const historyButtons = new HistoryButtons(
    document.querySelector('#historyButtons'),
    {
      movesBrowser: sanMovesBrowser
    }
  );

  const boardActionsDropdown = new BoardActionsDropdown(
    document.querySelector('#boardActionsDropdown'),
    {
      movesBrowser: sanMovesBrowser
    }
  );

  window.parent.postMessage({
    'id': window.frameElement?.id
  }, window.location.origin);
} catch (error) {
  console.error('Failed to fetch:', error.message);
}