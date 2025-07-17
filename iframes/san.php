<?php

require_once __DIR__ . '/../includes/class-blab-chess-abstract-shortcode.php';
require_once __DIR__ . '/../includes/class-blab-chess-san-shortcode.php';
require_once __DIR__ . '/../../../../wp-load.php';

$nonce = isset( $_GET['_wpnonce'] ) ? sanitize_text_field( wp_unslash ( $_GET['_wpnonce'] ) ) : '';

if ( ! wp_verify_nonce( $nonce ) ) { 
    http_response_code( 401 );
    exit;
}

$atts = [
    'fen' => $_GET['fen'],
    'notation' => $_GET['notation'],
    'orientation' => $_GET['orientation'],
    'pieces' => $_GET['pieces'],
];

$content = $_GET['movetext'];

try {
    ( new San_Shortcode() )
        ->sanitize( $atts, $content )
        ->validate( $atts, $content );
} catch ( \Throwable $e ) {
    http_response_code( 500 );
    exit;
} ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>SAN Moves</title>
    <link rel="stylesheet" href="../assets/cm-chessboard/assets/chessboard.css">
    <link rel="stylesheet" href="../assets/blab/utils/utils.css">
    <script src="../assets/blab/utils/utils.js"></script>
    <script type="module" src="../assets/blab/san.js"></script>
</head>
<body>
    <div id="left">
    <div id="chessboard"></div>
    <?php require_once './partial/menu.php'; ?>
    </div>
    <div id="right">
    <div id="movesBrowser"></div>
    </div>
</body>
</html>
