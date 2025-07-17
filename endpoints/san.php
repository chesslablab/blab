<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../../../../wp-load.php';

use Chess\Play\SanPlay;
use Chess\Variant\Classical\FenToBoardFactory;

$contents = file_get_contents( 'php://input' );
$decode = json_decode( $contents, true );

$nonce = isset( $decode['nonce'] ) ? sanitize_text_field( $decode['nonce'] ) : '';
$movetext = sanitize_text_field( $decode['movetext'] );
$fen = sanitize_text_field( $decode['fen'] );

if ( ! wp_verify_nonce( $nonce ) ) { 
    http_response_code( 401 );
    exit;
}

try {
    $sanPlay = new SanPlay( $movetext, FenToBoardFactory::create( $fen ) );
    $sanPlay->validate();
    echo wp_json_encode( $sanPlay->fen );
} catch ( \Throwable $e ) {
    http_response_code( 500 );
}