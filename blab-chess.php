<?php

/**
 * Blab Chess Plugin.
 *
 * @wordpress-plugin
 * Plugin Name:       Blab Chess
 * Plugin URI:        https://wordpress.org/plugins/blab-chess
 * Description:       A web toolkit for chess content creators.
 * Version:           1.0.0
 * Requires at least: 6.8
 * Requires PHP:      8.1
 * Author:            ChesslaBlab
 * Author URI:        https://github.com/chesslablab/blab-chess
 * Text Domain:       blab-chess
 * License:           GPL v3
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 */

require_once __DIR__ . '/autoload.php';

use Chess\Eval\CompleteFunction;
use Chess\Exception\UnknownNotationException;
use Chess\Media\AbstractMedia;
use Chess\Play\SanPlay;
use Chess\Tutor\FenEvaluation;
use Chess\Variant\Classical\FenToBoardFactory;
use Chess\Variant\Classical\PGN\Color;

define( 'BLAB_VERSION', '1.0.0' );

define( 'BLAB_PLUGIN', __FILE__ );

$errorMsg = "<p class='blab-error'>
            Whoops! The shortcode provided is not valid. Please try again with a different one.
        </p>";

function blab_assets () {
    wp_register_style(
        'blab',
        plugins_url( '/assets/js/blab.css', BLAB_PLUGIN ),
        array(),
        BLAB_VERSION
    );
    
    wp_enqueue_style( 'blab' );
    
    wp_register_script(
        'blab',
        plugins_url( '/assets/js/blab.js', BLAB_PLUGIN ),
        array(),
        BLAB_VERSION,
        array( 'in_footer' => true )
    );
    
    wp_enqueue_script( 'blab' );
}

add_shortcode('blab_san', function( $atts, $content ) use ( $errorMsg ) {
    try {
        if ( !$content ) {
            throw new \InvalidArgumentException();
        }
        if ( isset( $atts['fen'] ) ) {
            $board = FenToBoardFactory::create( $atts['fen' ] );
            $sanPlay = new SanPlay( $content, $board );
            $sanPlay->validate();
            $fen = $atts['fen'];
        } else {
            $board = FenToBoardFactory::create();
            $sanPlay = new SanPlay( $content, $board );
            $sanPlay->validate();
            $fen = $board->startFen;
        }
        if ( isset( $atts['notation'] ) ) {
            $notation = $atts['notation'] === 'san' ? 'san' : 'fan';
        } else {
            $notation = 'fan';
        }
        if ( isset( $atts['orientation'] ) ) {
            $orientation = $atts['orientation'] === Color::B ? Color::B : Color::W;
        } else {
            $orientation = Color::W;
        }
        if ( isset( $atts['pieces'] ) ) {
            $pieces = $atts['pieces'] === AbstractMedia::PIECE_SET_STANDARD
                ? AbstractMedia::PIECE_SET_STANDARD
                : AbstractMedia::PIECE_SET_STAUNTY;
        } else {
            $pieces = AbstractMedia::PIECE_SET_STAUNTY;
        }
        $fen = urlencode( $fen );
        $notation = urlencode( $notation );
        $orientation = urlencode( $orientation );
        $pieces = urlencode( $pieces );
        $movetext = urlencode( $sanPlay->board->movetext() );
        $md5 = md5( $fen . $notation . $orientation . $pieces . $movetext );
        $url = plugins_url( '/iframes', BLAB_PLUGIN ) . '/san-moves.html' . "?fen=$fen&notation=$notation&orientation=$orientation&pieces=$pieces&movetext=$movetext";
    } catch ( \Throwable $e ) {
        return $errorMsg;
    }

    return "<iframe id='$md5' class='blab' loading='lazy' width='100%' scrolling='no' src='$url'></iframe>";
} );

add_shortcode('blab_tutor', function( $atts ) use ( $errorMsg ) {
    try {
        if ( !isset( $atts['fen'] ) ) {
            throw new \InvalidArgumentException();
        }
        $f = new CompleteFunction();
        $board = FenToBoardFactory::create( $atts['fen'] );
        $paragraph = ( new FenEvaluation( $f, $board ) )->paragraph;
    } catch ( \Throwable $e ) {
        return $errorMsg;
    }

    return '<p>' . implode( ' ', $paragraph ) . '</p>';
} );

add_action( 'admin_enqueue_scripts', 'blab_assets' );

add_action( 'wp_enqueue_scripts', 'blab_assets' );