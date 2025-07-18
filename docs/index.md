# Blab Chess

The [Blab Chess](https://github.com/chesslablab/blab-chess) plugin provides with a handful of WordPress shortcodes for chess content creators to engage with their audience.

Please note that some of these shortcodes are intended to display an iframe by querying an HTTP service that runs on your site through the Blab plugin.

## `blab_san`

Display a chess game in SAN format as an HTML iframe. 

- All parameters listed below are optional, if not explicitly provided the default value will be used.
- The `/endpoints/san.php` service will be queried under the hood using the POST method.

### `fen` (optional)

The starting position in FEN format.

Default value:

- `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`

### `notation` (optional)

The notation to be used as per these options:

- `fan` (Figurine Algebraic Notation)
- `san` (Standard Algebraic Notation)

Default value:

- `fan`

### `orientation` (optional)

The orientation of the chess board as per these options:

- `w` for the white pieces.
- `b` for the black pieces.

Default value:

- `w`

### `pieces` (optional)

The piece set to be used as per these options:

- `standard`
- `staunty`

Default value:

- `staunty`

### Usage

#### Example

Display a chess game.

```txt
[blab_san]1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. 0-0 Be7 6. Re1 b5 7. Bb3 0-0 8. a4 Rb8 9. axb5 axb5 10. h3 d6 11. c3 b4 12. d3 bxc3 13. bxc3 d5 14. Nbd2 dxe4 15. dxe4 Bd6 16. Qc2 h6 17. Nf1 Ne7 18. Ng3 Ng6 19. Be3 Qe8 20. Red1 Be6 21. Ba4 Bd7 22. Nd2 Bxa4 23. Qxa4 Qxa4 24. Rxa4 Ra8 25. Rda1 Rxa4 26. Rxa4 Rb8 27. Ra6 Ne8 28. Kf1 Nf8 29. Nf5 Ne6 30. Nc4 Rd8 31. f3 f6 32. g4 Kf7 33. h4 Bf8 34. Ke2 Nd6 35. Ncxd6+ Bxd6 36. h5 Bf8 37. Ra5 Ke8 38. Rd5 Ra8 39. Rd1 Ra2+ 40. Rd2 Ra1 41. Rd1 Ra2+ 42. Rd2 Ra1 43. Rd1[/blab_san]
```

#### Example

Display a chess game from a particular position.

```txt
[blab_san fen="r2q1rk1/2pbbppp/p1np1n2/4p3/1p2P3/1BNPBN2/PPPQ1PPP/2KR3R w - - 0 11"]1.Nb1 h6 12.h4[/blab_san]
```

#### Example

Display a chess game from a particular position using SAN notation, the black pieces on the bottom and the standard pieces.

```txt
[blab_san fen="r2q1rk1/2pbbppp/p1np1n2/4p3/1p2P3/1BNPBN2/PPPQ1PPP/2KR3R w - - 0 11" notation="san" orientation="b" pieces="standard"]1.Nb1 h6 12.h4[/blab_san]
```

## `blab_tutor`

Explain a chess position in terms of concepts like a tutor. The resulting text may sound a little robotic but it can be easily rephrased by the AI of your choice to make it sound more human-like.

### `fen` (required)

The starting position in FEN format.

### Usage

#### Example

```txt
[blab_tutor fen="4kb2/2p3p1/4np1p/4pN1P/4P1P1/2P1BP2/4K3/r2R4 b - -"]
```