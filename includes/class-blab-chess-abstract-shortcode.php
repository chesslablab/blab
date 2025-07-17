<?php

/**
 * Abstract Shortcode.
 */
abstract class Abstract_Shortcode {
    /**
     * Error message.
     *
     * @var string
     */
    protected $errorMsg = "<p class='blab-error'>
            Whoops! The shortcode provided is not valid. Please try again with a different one.
        </p>";

    /**
     * Sanitizes the data.
     *
     * @param array $atts
     * @param string $content
     * @return Abstract_Shortcode
     */
    public function sanitize( &$atts, &$content ) {
        foreach ( $atts as $key => $val ) {
            $atts[$key] = sanitize_text_field( $val );
        }

        $content = sanitize_text_field( $content );

        return $this;
    }

    /**
     * Validates the data.
     *
     * @param array $atts
     * @param string $content
     * @throws \InvalidArgumentException
     */
    abstract public function validate( &$atts, &$content );

    /**
     * Adds a new shortcode.
     */
    public function add() {
        add_shortcode( $this->tag, array( $this, 'callback' ) );
    }

    /**
     * The callback function to run when the shortcode is found.
     *
     * @param array $atts
     * @param string $content
     * @return string
     */
    abstract protected function callback( $atts, $content );
}