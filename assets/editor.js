(function() {
    const { addFilter } = wp.hooks;
    const { Fragment } = wp.element;
    const { InspectorControls } = wp.blockEditor || wp.editor;
    const { PanelBody, SelectControl, RangeControl } = wp.components;
    const { createHigherOrderComponent } = wp.compose;
    const { __ } = wp.i18n;

    const allowedBlocks = [
        'core/paragraph',
        'core/heading',
        'core/image',
        'core/cover',
        'core/group',
        'core/columns',
        'core/column',
        'core/media-text',
        'core/quote',
        'core/list',
        'core/gallery'
    ];

    const addParallaxAttribute = (settings, name) => {
        if (allowedBlocks.includes(name)) {
            settings.attributes = {
                ...settings.attributes,
                parallaxAnimation: {
                    type: 'string',
                    default: ''
                },
                parallaxTrigger: {
                    type: 'string',
                    default: 'scroll-in'
                },
                parallaxDuration: {
                    type: 'number',
                    default: 800
                },
                parallaxDelay: {
                    type: 'number',
                    default: 0
                }
            };
        }

        return settings;
    };

    const withParallaxControls = createHigherOrderComponent((BlockEdit) => {
        return (props) => {
            const { name, attributes, setAttributes, isSelected } = props;
            const { parallaxAnimation, parallaxTrigger, parallaxDuration, parallaxDelay } = attributes;

            if (!allowedBlocks.includes(name)) {
                return React.createElement(BlockEdit, props);
            }

            return React.createElement(
                Fragment,
                null,
                React.createElement(BlockEdit, props),
                isSelected && React.createElement(
                    InspectorControls,
                    null,
                    React.createElement(
                        PanelBody,
                        {
                            title: __('Animation', 'block-parallax'),
                            initialOpen: false
                        },
                        React.createElement(SelectControl, {
                            label: __('On Scroll Animation', 'block-parallax'),
                            value: parallaxAnimation,
                            options: [
                                {
                                    label: __('None', 'block-parallax'),
                                    value: ''
                                },
                                {
                                    label: __('Fade from Left', 'block-parallax'),
                                    value: 'fade-from-left'
                                },
                                {
                                    label: __('Fade from Right', 'block-parallax'),
                                    value: 'fade-from-right'
                                },
                                {
                                    label: __('Fade from Top', 'block-parallax'),
                                    value: 'fade-from-top'
                                },
                                {
                                    label: __('Fade from Bottom', 'block-parallax'),
                                    value: 'fade-from-bottom'
                                },
                                {
                                    label: __('Scale Up', 'block-parallax'),
                                    value: 'scale-up'
                                },
                                {
                                    label: __('Rotate In', 'block-parallax'),
                                    value: 'rotate-in'
                                },
                                {
                                    label: __('Slide Up', 'block-parallax'),
                                    value: 'slide-up'
                                },
                                {
                                    label: __('Bounce In', 'block-parallax'),
                                    value: 'bounce-in'
                                }
                            ],
                            onChange: (value) => setAttributes({ parallaxAnimation: value }),
                            help: __('Choose an animation effect.', 'block-parallax')
                        }),
                        parallaxAnimation && React.createElement(SelectControl, {
                            label: __('Animation Trigger', 'block-parallax'),
                            value: parallaxTrigger || 'scroll-in',
                            options: [
                                {
                                    label: __('On Scroll In', 'block-parallax'),
                                    value: 'scroll-in'
                                },
                                {
                                    label: __('On Scroll In & Out', 'block-parallax'),
                                    value: 'scroll-in-out'
                                }
                            ],
                            onChange: (value) => setAttributes({ parallaxTrigger: value }),
                            help: __('When should the animation trigger?', 'block-parallax')
                        }),
                        parallaxAnimation && React.createElement(RangeControl, {
                            label: __('Duration (ms)', 'block-parallax'),
                            value: parallaxDuration || 800,
                            onChange: (value) => setAttributes({ parallaxDuration: value }),
                            min: 200,
                            max: 2000,
                            step: 100,
                            allowReset: true,
                            resetFallbackValue: 800
                        }),
                        parallaxAnimation && React.createElement(RangeControl, {
                            label: __('Delay (ms)', 'block-parallax'),
                            value: parallaxDelay || 0,
                            onChange: (value) => setAttributes({ parallaxDelay: value }),
                            min: 0,
                            max: 1000,
                            step: 50,
                            allowReset: true,
                            resetFallbackValue: 0
                        })
                    )
                )
            );
        };
    }, 'withParallaxControls');

    const addParallaxClass = (extraProps, blockType, attributes) => {
        const { parallaxAnimation, parallaxTrigger, parallaxDuration, parallaxDelay } = attributes;

        if (allowedBlocks.includes(blockType.name) && parallaxAnimation) {
            const animationClass = ' parallax-' + parallaxAnimation;
            const triggerClass = ' parallax-trigger-' + (parallaxTrigger || 'scroll-in');
            extraProps.className = (extraProps.className || '') + animationClass + triggerClass;

            // Add data attributes for timing
            extraProps['data-parallax-duration'] = parallaxDuration || 800;
            extraProps['data-parallax-delay'] = parallaxDelay || 0;
        }

        return extraProps;
    };

    addFilter(
        'blocks.registerBlockType',
        'block-parallax/add-parallax-attribute',
        addParallaxAttribute
    );

    addFilter(
        'editor.BlockEdit',
        'block-parallax/with-parallax-controls',
        withParallaxControls
    );

    addFilter(
        'blocks.getSaveContent.extraProps',
        'block-parallax/add-parallax-class',
        addParallaxClass
    );

})();