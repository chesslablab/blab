<?php

spl_autoload_register( function ( string $filename ) {
    if ( substr( $filename, 0, 6 ) === 'Chess\\' ) {
        $filename = substr( str_replace( '\\', '/', $filename ), 6 );
        require_once __DIR__ . "/vendor/chesslablab/php-chess/src/$filename.php";
    }
} );