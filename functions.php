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

// OpenGraph Images for the frontpage, the ones from YOAST via the Post are not correct
function add_ogimages_for_frontpage() {
	if (!is_front_page()) {
        return;
    }
    
	$output = '<meta property="og:image" content="http://gruseltour-leipzig.de/wordpress/wp-content/uploads/2013/05/button-scary.png" /><meta property="og:image" content="http://gruseltour-leipzig.de/wordpress/wp-content/uploads/2014/05/cropped-grusel-poster-a3.jpg" /><meta property="og:image" content="http://gruseltour-leipzig.de/wordpress/wp-content/uploads/2014/06/1.jpg" />';
	echo $output;	
}
add_action('wp_head','add_ogimages_for_frontpage');

// function add_cookie_warning() {
// 	$output = '<!-- Begin Cookie Consent plugin by Silktide - http://silktide.com/cookieconsent --><script type="text/javascript">    window.cookieconsent_options = {"message":"Diese Webseite benutzt Cookies, denn auf der dunklen Seite gibt es immer Kekse.","dismiss":"Okay","learnMore":"Mehr Informationen","link":"//gruseltour-leipzig.de/datenschutz/","theme":"dark-top"};</script><script type="text/javascript" src="//s3.amazonaws.com/cc.silktide.com/cookieconsent.latest.min.js"></script><!-- End Cookie Consent plugin -->';
// 	echo $output;	
// }
// add_action('wp_head','add_cookie_warning');

function load_datepicker_scripts() {
	// Use `get_stylesheet_directoy_uri() if your script is inside your theme or child theme.
	wp_register_script('dateutil-script', get_stylesheet_directory_uri() . '/js/dateutil.js');
    wp_register_script('datepicker-script', get_stylesheet_directory_uri() . '/js/datepicker.js');

    // Let's enqueue a script only to be used on a specific page of the site
    if (!is_page('anmeldung')) { 
        return;
    }

    // Enqueue a script that has both jQuery (automatically registered by WordPress)
    // and my-script (registered earlier) as dependencies.
    wp_enqueue_script('style-datepicker-script', get_stylesheet_directory_uri() . '/js/style-datepicker.js', array('jquery', 'jquery-ui-datepicker', 'dateutil-script', 'datepicker-script'), true);

    // TODO: add noscript with dates
}
add_action('wp_footer', 'load_datepicker_scripts');

/**
 * change display of values after form submit
 */
function isPageWithForm() {
	return is_page('anmeldung') 
        || is_page('wave-gotik-treffen-2015-wgt') 
        || is_page('geschenkgutschein') 
        || is_page('wir-erwarten-euch-an-halloween-2015');
}

function hide_form_values_scripts() {
    // Let's enqueue a script only to be used on a specific page of the site
    if (!isPageWithForm()) {
        return;
    }

    // Enqueue a script that has both jQuery (automatically registered by WordPress)
    wp_enqueue_script('hide-form-values-script', get_stylesheet_directory_uri() . '/js/hide-form-values.js', array('jquery'));
}
add_action('wp_footer', 'hide_form_values_scripts');

function load_gruseltour_styles() {
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/css/twentytwelve-dark.css');
    wp_enqueue_style('theme-style', get_stylesheet_directory_uri() . '/css/gruseltour.css');
}
add_action('wp_enqueue_scripts', 'load_gruseltour_styles');

function load_jquery_ui_style_and_i18n() {
    // Let's enqueue a script only to be used on a specific page of the site
    if (!is_page('anmeldung')) { 
        return;
    }

    wp_enqueue_style('jquery-ui-style', '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css', ('jquery'), '1.11.4');
    wp_enqueue_style('datepicker-style', get_stylesheet_directory_uri() . '/css/datepicker.css');
    wp_enqueue_script('jquery-ui-i18n-de', '//github.com/jquery/jquery-ui/raw/master/ui/i18n/datepicker-de.js', ('jquery'));
}
add_action('wp_enqueue_scripts', 'load_jquery_ui_style_and_i18n');

function load_font_awesome() {
	wp_enqueue_style('prefix-font-awesome', get_stylesheet_directory_uri() . '/font-awesome-4.5.0/css/font-awesome.min.css', false, '4.5.0');
}
add_action('wp_enqueue_scripts', 'load_font_awesome');

// Exclude Posts with following id
function bwp_gxs_exclude_posts($excluded_posts, $post_type)
{
	// old halloween, wgt and information page
	return array(12,157,1356,1846);
}
add_filter('bwp_gxs_excluded_posts', 'bwp_gxs_exclude_posts', 10, 2);

// Change form confirmation message
function change_grunion_success_message($msg) {
	return '<h3>' . 'Vielen Dank für deine Anfrage.<br />Wir beantworten jede Anfrage innerhalb weniger Stunden. Solltest du dennoch nach 1 Tag keine Antwort von uns erhalten, schau bitte in deinem Spam-Ordner nach.<br />Besonders bei Web.de und GMX-Mailadressen landen wir leider häufig im Spam-Ordner. ' . '</h3>';
}
add_filter('grunion_contact_form_success_message', 'change_grunion_success_message');
