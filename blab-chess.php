<?php

/**
 * Blab Chess Plugin.
 *
 * @wordpress-plugin
 * Plugin Name:       Blab Chess
 * Plugin URI:        https://wordpress.org/plugins/blab-chess
 * Description:       A web toolkit for chess content creators.
 * Version:           1.0.1
 * Requires at least: 6.8
 * Requires PHP:      8.1
 * Author:            ChesslaBlab
 * Author URI:        https://github.com/chesslablab/blab-chess
 * Text Domain:       blab-chess
 * License:           GPL v3
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/includes/class-blab-chess-abstract-shortcode.php';
require_once __DIR__ . '/includes/class-blab-chess-san-shortcode.php';
require_once __DIR__ . '/includes/class-blab-chess-tutor-shortcode.php';

define( 'BLAB_VERSION', '1.0.1' );

define( 'BLAB_PLUGIN', __FILE__ );

function blab_assets () {
    wp_register_style(
        'blab',
        plugins_url( '/assets/blab/blab.css', BLAB_PLUGIN ),
        array(),
        BLAB_VERSION
    );
    
    wp_enqueue_style( 'blab' );
    
    wp_register_script(
        'blab',
        plugins_url( '/assets/blab/blab.js', BLAB_PLUGIN ),
        array(),
        BLAB_VERSION,
        array( 'in_footer' => true )
    );
    
    wp_enqueue_script( 'blab' );
}

( new San_Shortcode() )->add();

( new Tutor_Shortcode() )->add();

add_action( 'admin_enqueue_scripts', 'blab_assets' );

add_action( 'wp_enqueue_scripts', 'blab_assets' );