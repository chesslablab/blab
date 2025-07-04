export class Move {
  static SQUARE = '[a-h]{1}[1-8]{1}';
  static CHECK = '[\+\#]{0,1}';
  static KING = 'K' + Move.SQUARE + Move.CHECK;
  static KING_CAPTURES = 'Kx' + Move.SQUARE + Move.CHECK;
  static KNIGHT = 'N[a-h]{0,1}[1-8]{0,1}' + Move.SQUARE + Move.CHECK;
  static KNIGHT_CAPTURES = 'N[a-h]{0,1}[1-8]{0,1}x' + Move.SQUARE + Move.CHECK;
  static PIECE = '[BRQ]{1}[a-h]{0,1}[1-8]{0,1}' + Move.SQUARE + Move.CHECK;
  static PIECE_CAPTURES = '[BRQ]{1}[a-h]{0,1}[1-8]{0,1}x' + Move.SQUARE + Move.CHECK;
}
