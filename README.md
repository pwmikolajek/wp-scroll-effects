# WP Scroll Effects

Enhanced parallax and scroll effects with advanced animation options for WordPress blocks.

https://github.com/user-attachments/assets/94bd11d9-d319-4143-8546-a324abdd6127

## Features

- **Multiple Animation Types**: Fade in, slide in from various directions, zoom effects, and more
- **Advanced Trigger Options**: Control when animations start (scroll-in, hover, click, immediate)
- **Customizable Timing**: Set duration and delay for each animation
- **Gutenberg Integration**: Works seamlessly with all core WordPress blocks
- **Performance Optimized**: Lightweight JavaScript with efficient scroll handling

## Installation

### Method 1: Upload via WordPress Admin

1. Download the plugin files as a ZIP archive
2. Login to your WordPress admin dashboard
3. Navigate to **Plugins > Add New**
4. Click **Upload Plugin**
5. Choose the ZIP file and click **Install Now**
6. Click **Activate Plugin** once installation is complete

### Method 2: Manual Installation

1. Download or clone this repository
2. Upload the entire `wp-scroll-effects` folder to your `/wp-content/plugins/` directory
3. Login to your WordPress admin dashboard
4. Navigate to **Plugins > Installed Plugins**
5. Find "WP Scroll Effects" and click **Activate**

### Method 3: Git Clone

```bash
cd /path/to/your/wordpress/wp-content/plugins/
git clone https://github.com/pwmikolajek/wp-scroll-effects.git
```

Then activate the plugin through the WordPress admin.

## Usage

1. **Edit any block** in the Gutenberg editor
2. **Open the block settings** panel on the right
3. **Find the "Scroll Effects" section** in the block settings
4. **Choose your animation type** from the dropdown:
   - Fade In
   - Slide In Up
   - Slide In Down
   - Slide In Left
   - Slide In Right
   - Zoom In
   - Zoom Out
5. **Select a trigger** for when the animation should start:
   - **Scroll In**: Animate when the element enters the viewport
   - **Hover**: Animate on mouse hover
   - **Click**: Animate on click
   - **Immediate**: Animate immediately when page loads
6. **Adjust timing** (optional):
   - **Duration**: How long the animation takes (in milliseconds)
   - **Delay**: How long to wait before starting (in milliseconds)
7. **Save or update** your content

## Animation Types

- **fade-in**: Element fades in smoothly
- **slide-in-up**: Element slides in from bottom
- **slide-in-down**: Element slides in from top
- **slide-in-left**: Element slides in from left
- **slide-in-right**: Element slides in from right
- **zoom-in**: Element scales up from small to normal size
- **zoom-out**: Element scales down from large to normal size

## Trigger Options

- **scroll-in**: Animation triggers when element enters viewport
- **hover**: Animation triggers on mouse hover
- **click**: Animation triggers when element is clicked
- **immediate**: Animation triggers immediately on page load

## Requirements

- WordPress 5.0 or higher
- PHP 7.4 or higher
- Modern web browser with JavaScript enabled

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GPL v2 or later - see the main plugin file for details.

## Support

For support and questions, please open an issue on the [GitHub repository](https://github.com/pwmikolajek/wp-scroll-effects/issues).
