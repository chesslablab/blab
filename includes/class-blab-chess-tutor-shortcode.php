<?php

use Chess\Eval\CompleteFunction;
use Chess\Tutor\FenEvaluation;
use Chess\Variant\Classical\FenToBoardFactory;

/**
 * Tutor Shortcode.
 */
class Tutor_Shortcode extends Abstract_Shortcode {
    /**
     * Shortcode tag to be searched in post content.
     *
     * @var string
     */
    protected $tag = 'blab_tutor';

    /**
     * Validates the data.
     *
     * @param array $atts
     * @param string $content
     * @throws \InvalidArgumentException
     */
    public function validate( &$atts, &$content ) {
        if ( !isset( $atts['fen'] ) ) {
            throw new \InvalidArgumentException();
        }

        try {
            FenToBoardFactory::create( $atts['fen'] );
        } catch ( \Throwable $e ) {
            throw new \InvalidArgumentException();
        }
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

        $f = new CompleteFunction();
        $board = FenToBoardFactory::create( $atts['fen'] );
        $paragraph = ( new FenEvaluation( $f, $board ) )->paragraph;

        return '<p>' . implode( ' ', $paragraph ) . '</p>';
    }
}