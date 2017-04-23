<?php
// include parent stylesheet
function theme_enqueue_styles() {
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
}
add_action('wp_enqueue_scripts', 'theme_enqueue_styles');

// Use WP-PageNavi when it's active
function twentytwelve_content_nav( $nav_id ) {
	global $wp_query;

	if ( $wp_query->max_num_pages > 1 ) : ?>
		<?php /* add wp-pagenavi support for posts */ ?>
		<?php if(function_exists('wp_pagenavi') ) : ?>
			<?php wp_pagenavi(); ?>
		<?php else: ?>
			<nav id="<?php echo $nav_id; ?>">
				<h3 class="assistive-text"><?php _e( 'Post navigation', 'tto' ); ?></h3>
				<div class="nav-previous"><?php next_posts_link( __( '<span class="meta-nav">&larr;</span> Older posts', 'tto' ) ); ?></div>
				<div class="nav-next"><?php previous_posts_link( __( 'Newer posts <span class="meta-nav">&larr;</span>', 'tto' ) ); ?></div>
			</nav><!-- #nav-above -->
		<?php endif; ?>
	<?php endif;
}

function load_datepicker_scripts() {
    // Let's enqueue a script only to be used on a specific page of the site
    if (!isBooking()) {
        return;
    }

    // Use `get_stylesheet_directoy_uri() if your script is inside your theme or child theme.
    wp_register_script('datepicker-util-script', get_stylesheet_directory_uri() . '/js/datepicker/util.js', false, true);
    wp_register_script('datepicker-dataprovider-script', get_stylesheet_directory_uri() . '/js/datepicker/dataprovider.js', array('datepicker-util-script'), false, true);
    wp_register_script('datepicker-availability-script', get_stylesheet_directory_uri() . '/js/datepicker/availability.js', array('datepicker-dataprovider-script'), false, true);

    // Enqueue a script that has both jQuery (automatically registered by WordPress)
    // and my-script (registered earlier) as dependencies.
    wp_enqueue_script('style-datepicker-script', get_stylesheet_directory_uri() . '/js/datepicker/style-datepicker.js', array('jquery', 'jquery-ui-datepicker', 'datepicker-availability-script'), false, true);

    // TODO: add noscript with dates
}
add_action('wp_footer', 'load_datepicker_scripts');

class PageContentAwareFilter {
    public function isPageWithForm() {
        return isBooking();
    }

    public function isBooking() {
        return is_page('book-now');
    }
}

function isPageWithForm() {
    return isBooking();
}

function isBooking() {
    return is_page('book-now');
}

/**
 * change display of values after form submit
 */
function hide_form_values_scripts() {
    if (!isPageWithForm()) {
        return;
    }

    wp_enqueue_script('hide-form-values-script', get_stylesheet_directory_uri() . '/js/hide-form-values.js', array('jquery'));
}
add_action('wp_footer', 'hide_form_values_scripts');

function load_gruseltour_styles() {
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/css/twentytwelve-dark.css');
    wp_enqueue_style('theme-style', get_stylesheet_directory_uri() . '/css/main.css');
}
add_action('wp_enqueue_scripts', 'load_gruseltour_styles');

function load_jquery_ui_style_and_i18n() {
    // Let's enqueue a script only to be used on a specific page of the site
    if (!isBooking()) {
       return;
    }

    wp_enqueue_style('jquery-style', '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css', false, '1.11.4');
    wp_enqueue_style('datepicker-style', get_stylesheet_directory_uri() . '/css/datepicker.css', array('jquery-style'));
}
add_action('wp_enqueue_scripts', 'load_jquery_ui_style_and_i18n');

function load_font_awesome() {
	wp_enqueue_style('prefix-font-awesome', get_stylesheet_directory_uri() . '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', array(), '4.7.0');
}
add_action('wp_enqueue_scripts', 'load_font_awesome');

// Change form confirmation message
function change_grunion_success_message($msg) {
	return "<h3>"."Thanks for your request.<br />We will answer all the requests within some hours. If you don't get a message from us after one day, please check your spam folder. Sometimes we end up in your spam folder."."</h3>";
}
add_filter('grunion_contact_form_success_message', 'change_grunion_success_message');
