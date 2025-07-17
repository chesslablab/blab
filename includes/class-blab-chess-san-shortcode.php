<?php

use Chess\Media\AbstractMedia;
use Chess\Play\SanPlay;
use Chess\Variant\Classical\FenToBoardFactory;
use Chess\Variant\Classical\PGN\Color;

/**
 * SAN Shortcode.
 */
class San_Shortcode extends Abstract_Shortcode {
    /**
     * Shortcode tag to be searched in post content.
     *
     * @var string
     */
    protected $tag = 'blab_san';

    /**
     * The notation to be used.
     *
     * @var array
     */
    protected $notation = [
        'san',
        'fan',
    ];

    /**
     * The orientation of the chess board.
     *
     * @var array
     */
    protected $orientation = [
        Color::W,
        Color::B,
    ];

    /**
     * The piece set to be used.
     *
     * @var array
     */
    protected $pieces = [
        AbstractMedia::PIECE_SET_STANDARD,
        AbstractMedia::PIECE_SET_STAUNTY,
    ];

    /**
     * Validates the data.
     *
     * @param array $atts
     * @param string $content
     * @throws \InvalidArgumentException
     */
    public function validate( &$atts, &$content ) {
        if ( !$content ) {
            throw new \InvalidArgumentException();
        }

        try {
            $board = FenToBoardFactory::create( $atts['fen'] ?? null );
            $sanPlay = new SanPlay( $content, $board );
            $sanPlay->validate();
            $atts['fen'] = $board->startFen;
        } catch ( \Throwable $e ) {
            throw new \InvalidArgumentException();
        }

        if ( ! isset( $atts['notation'] ) ) {
            $atts['notation'] = 'fan';
        } elseif ( ! in_array( $atts['notation'], $this->notation ) ) {
            throw new \InvalidArgumentException();
        }

        if ( ! isset( $atts['orientation'] ) ) {
            $atts['orientation'] = Color::W;
        } elseif ( ! in_array( $atts['orientation'], $this->orientation ) ) {
            throw new \InvalidArgumentException();
        }

        if ( ! isset( $atts['pieces'] ) ) {
            $atts['pieces'] = AbstractMedia::PIECE_SET_STAUNTY;
        } elseif ( ! in_array( $atts['pieces'], $this->pieces ) ) {
            throw new \InvalidArgumentException();
        }

        $content = $sanPlay->board->movetext();
    }

    /**
     * The callback function to run when the shortcode is found.
     *
     * @param array $atts
     * @param string $content
     * @return string
     */
    public function callback( $atts, $content ) {
        try {
            $this->sanitize( $atts, $content )
                ->validate( $atts, $content );
        } catch ( \Throwable $e ) {
            return $this->errorMsg;
        }

        $fen = urlencode( $atts['fen'] );
        $notation = urlencode( $atts['notation'] );
        $orientation = urlencode( $atts['orientation'] );
        $pieces = urlencode( $atts['pieces'] );
        $movetext = urlencode( $content );

        $md5 = md5( $fen . $notation . $orientation . $pieces . $movetext );
        $url = plugins_url( '/iframes', BLAB_PLUGIN ) . '/san.php' . "?fen=$fen&notation=$notation&orientation=$orientation&pieces=$pieces&movetext=$movetext";
        $nonceUrl = wp_nonce_url( $url );

        return "<iframe id='$md5' class='blab' loading='lazy' width='100%' scrolling='no' src='$nonceUrl'></iframe>";
    }
}