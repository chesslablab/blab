<?php

require_once __DIR__ . '/../autoload.php';

use Chess\Play\SanPlay;
use Chess\Variant\Classical\FenToBoardFactory;

try {
    $contents = file_get_contents( 'php://input' );
    $decode = json_decode( $contents, true );
    $sanPlay = new SanPlay( $decode['movetext'], FenToBoardFactory::create( $decode['fen'] ) );
    $sanPlay->validate();
    echo json_encode($sanPlay->fen);
} catch ( \Throwable $e ) {
    http_response_code( 500 );
}