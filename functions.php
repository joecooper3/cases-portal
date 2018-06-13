<?php
/**
 * CASES Portal functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package CASES_Portal
 */

if ( ! function_exists( 'cases_portal_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function cases_portal_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on CASES Portal, use a find and replace
		 * to change 'cases_portal' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'cases_portal', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// Menus
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'cases_portal' ),
			'quick-links' => esc_html__( 'Quick Links', 'cases_portal'),
			'footer_menu' => esc_html__( 'Footer Menu', 'cases_portal'),
			'basic_training' => esc_html__( 'Basic Training', 'cases_portal'),
			'advanced_training' => esc_html__( 'Advanced Training', 'cases_portal'),
			'developer_guide' => esc_html__( 'Developer Guide', 'cases_portal'),
			'account-settings' => esc_html__( 'Account Settings', 'cases_portal'),
		) );
		add_filter('wp_nav_menu_objects', 'my_wp_nav_menu_objects', 10, 2);
		function my_wp_nav_menu_objects( $items, $args ) {
		// loop
		foreach( $items as &$item ) {
			// vars
			$icon = get_field('icon', $item);
			// append icon
			if( $icon ) {
				$item->title = $icon . "<span>" . $item->title . "</span>";
			}
		}
		// return
		return $items;
		}

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'cases_portal_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
		/**
		* Removes the per_page limit of 100
		*/
	}
endif;
add_action( 'after_setup_theme', 'cases_portal_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function cases_portal_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'cases_portal_content_width', 640 );
}
add_action( 'after_setup_theme', 'cases_portal_content_width', 0 );

// Custom post types and taxonomies
require_once get_template_directory() . '/inc/custom-post-types-taxonomies.php';

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function cases_portal_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'cases_portal' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'cases_portal' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'cases_portal_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function cases_portal_scripts() {
	wp_enqueue_style( 'cases_portal-style', get_stylesheet_uri() );

	wp_enqueue_style( 'fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

	wp_enqueue_script( 'cases_portal-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'cases_portal-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	wp_enqueue_script( 'react', 'https://cdnjs.cloudflare.com/ajax/libs/react/16.0.0/umd/react.production.min.js');

	wp_enqueue_script( 'react-dom', 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.0.0/umd/react-dom.production.min.js');

	wp_enqueue_script( 'babel', 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser' . $suffix . '.js', array(), null );

	wp_enqueue_script( 'master-js', get_template_directory_uri() . '/dist/master.js', array('react', 'react-dom', 'babel'), '1.0.0', true);
}
add_action( 'wp_enqueue_scripts', 'cases_portal_scripts' );

add_action('after_setup_theme', 'remove_admin_bar');

/**
* Remove admin bar for non-administrators
*/

function remove_admin_bar(){
	if (!current_user_can('administrator') &&
	!is_admin() && !current_user_can('editor')) {
		show_admin_bar(false);
	}
}

// Block Access to /wp-admin for most staff.
function custom_blockusers_init() {
  if ( is_user_logged_in() && is_admin() && current_user_can( 'subscriber' ) ) {
    wp_redirect( home_url() );
    exit;
  }
}
add_action( 'init', 'custom_blockusers_init' );


//Custom login stuff (thanks WordPress!)
function my_custom_login() {
echo '<link rel="stylesheet" type="text/css" href="' . get_bloginfo('stylesheet_directory') . '/login/style.css" />';
}
add_action('login_head', 'my_custom_login');

function my_login_logo_url() {
return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
return 'CASES Portal';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );

//Custom endpoints
require_once get_template_directory() . '/inc/custom-endpoints.php';

//Custom user types! It never ends!
function add_compliance_privacy_role() {
 add_role('compliance_privacy',
            'Compliance & Privacy',
            array(
                'read' => true,
                'edit_posts' => false,
                'delete_posts' => false,
                'publish_posts' => false,
                'upload_files' => true,
            )
        );
   }
add_action(init, 'add_compliance_privacy_role' );

add_filter( 'rest_user_query', 'prefix_remove_has_published_posts_from_wp_api_user_query', 10, 2 );
/**
 * Removes `has_published_posts` from the query args so even users who have not
 * published content are returned by the request.
 *
 * @see https://developer.wordpress.org/reference/classes/wp_user_query/
 *
 * @param array           $prepared_args Array of arguments for WP_User_Query.
 * @param WP_REST_Request $request       The current request.
 *
 * @return array
 */
function prefix_remove_has_published_posts_from_wp_api_user_query( $prepared_args, $request ) {
	unset( $prepared_args['has_published_posts'] );

	return $prepared_args;
}

function modify_read_more_link() {
    return '<div class="more-link-container"><a class="more-link" href="' . get_permalink() . '">Read More <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
</a></div>';
}
add_filter( 'the_content_more_link', 'modify_read_more_link' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

define('ACF_EARLY_ACCESS', '5');
