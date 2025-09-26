<?php
/**
 * Plugin Name: Block Parallax v2
 * Plugin URI: https://example.com
 * Description: Enhanced parallax scroll effects with advanced trigger options for WordPress blocks.
 * Version: 2.0.0
 * Author: Your Name
 * License: GPL v2 or later
 */

if (!defined('ABSPATH')) {
    exit;
}

class BlockParallaxV2 {

    public function __construct() {
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        add_action('init', array($this, 'register_block_attributes'));
    }

    public function enqueue_editor_assets() {
        wp_enqueue_script(
            'block-parallax-v2-editor',
            plugin_dir_url(__FILE__) . 'assets/editor.js',
            array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-compose', 'wp-data', 'wp-hooks'),
            '1.0.0',
            true
        );
    }

    public function enqueue_frontend_assets() {
        wp_enqueue_script(
            'block-parallax-v2-frontend',
            plugin_dir_url(__FILE__) . 'assets/frontend.js',
            array(),
            '1.0.0',
            true
        );

        wp_enqueue_style(
            'block-parallax-v2-frontend',
            plugin_dir_url(__FILE__) . 'assets/frontend.css',
            array(),
            '1.0.0'
        );
    }

    public function register_block_attributes() {
        $blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

        foreach ($blocks as $block_name => $block_type) {
            if (strpos($block_name, 'core/') === 0) {
                register_block_type($block_name, array(
                    'attributes' => array(
                        'parallaxAnimation' => array(
                            'type' => 'string',
                            'default' => ''
                        ),
                        'parallaxTrigger' => array(
                            'type' => 'string',
                            'default' => 'scroll-in'
                        ),
                        'parallaxDuration' => array(
                            'type' => 'number',
                            'default' => 800
                        ),
                        'parallaxDelay' => array(
                            'type' => 'number',
                            'default' => 0
                        )
                    ),
                    'render_callback' => array($this, 'render_block_with_parallax')
                ));
            }
        }
    }

    public function render_block_with_parallax($attributes, $content, $block) {
        if (!empty($attributes['parallaxAnimation'])) {
            $animation_class = ' parallax-' . esc_attr($attributes['parallaxAnimation']);
            $trigger_class = ' parallax-trigger-' . esc_attr($attributes['parallaxTrigger'] ?? 'scroll-in');
            $duration = isset($attributes['parallaxDuration']) ? $attributes['parallaxDuration'] : 800;
            $delay = isset($attributes['parallaxDelay']) ? $attributes['parallaxDelay'] : 0;

            $timing_attributes = ' data-parallax-duration="' . esc_attr($duration) . '" data-parallax-delay="' . esc_attr($delay) . '"';
            $combined_class = $animation_class . $trigger_class;

            $content = str_replace('class="', 'class="' . $combined_class, $content);
            $content = str_replace('>', $timing_attributes . '>', $content, 1);
        }

        return $content;
    }
}

new BlockParallaxV2();