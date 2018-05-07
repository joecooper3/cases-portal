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

// Register Custom Post Type
function custom_post_type() {

	$labels = array(
		'name'                  => _x( 'Staff Members', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Staff Member', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Staff Members', 'text_domain' ),
		'name_admin_bar'        => __( 'Staff Members', 'text_domain' ),
		'archives'              => __( 'Staff Member Archives', 'text_domain' ),
		'attributes'            => __( 'Staff Member Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Item:', 'text_domain' ),
		'all_items'             => __( 'All Staff Members', 'text_domain' ),
		'add_new_item'          => __( 'Add New Staff Member', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New Staff Member', 'text_domain' ),
		'edit_item'             => __( 'Edit Staff Member', 'text_domain' ),
		'update_item'           => __( 'Update Staff Member', 'text_domain' ),
		'view_item'             => __( 'View Item', 'text_domain' ),
		'view_items'            => __( 'View Items', 'text_domain' ),
		'search_items'          => __( 'Search Item', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Portrait', 'text_domain' ),
		'set_featured_image'    => __( 'Set portrait', 'text_domain' ),
		'remove_featured_image' => __( 'Remove portrait', 'text_domain' ),
		'use_featured_image'    => __( 'Use as portrait', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'text_domain' ),
		'items_list'            => __( 'Items list', 'text_domain' ),
		'items_list_navigation' => __( 'Items list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter items list', 'text_domain' ),
	);
	$args = array(
		'label'                 => __( 'Staff Member', 'text_domain' ),
		'description'           => __( 'Staff Members', 'text_domain' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'thumbnail', 'custom-fields', ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-id-alt',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
	);
	$dept_labels = array(
		'name'                  => _x( 'Departments', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Department', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Departments', 'text_domain' ),
		'name_admin_bar'        => __( 'Departments', 'text_domain' ),
		'add_new_item'          => __( 'Add New Department', 'text_domain' ),
		'new_item'              => __( 'New Department', 'text_domain' ),
		'edit_item'             => __( 'Edit Department', 'text_domain' ),
		'update_item'           => __( 'Update Department', 'text_domain' ),
	);
	$args_dept = array(
		'label'                 => __( 'Department', 'text_domain' ),
		'description'           => __( 'Departments', 'text_domain' ),
		'labels'                => $dept_labels,
		'supports'              => array( 'title'),
		'taxonomies'            => array( 'department' ),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-networking',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
		'query_var'							=> 'department',
    'rewrite' 							=> array( 'slug' => 'department'),
	);
	$program_labels = array(
		'name'                  => _x( 'Programs/Units', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Program/Unit', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Programs/Units', 'text_domain' ),
		'name_admin_bar'        => __( 'Programs/Units', 'text_domain' ),
		'add_new_item'          => __( 'Add New Program/Unit', 'text_domain' ),
		'new_item'              => __( 'New Program/Unit', 'text_domain' ),
		'edit_item'             => __( 'Edit Program/Unit', 'text_domain' ),
		'update_item'           => __( 'Update Program/Unit', 'text_domain' ),
	);
	$args_program = array(
		'label'                 => __( 'Program', 'text_domain' ),
		'description'           => __( 'Programs', 'text_domain' ),
		'labels'                => $program_labels,
		'supports'              => array( 'title' ),
		'taxonomies'            => array( 'program' ),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-tagcloud',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
	);
	$training_labels = array(
		'name'                  => _x( 'Trainings', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Training', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Trainings', 'text_domain' ),
		'name_admin_bar'        => __( 'Training', 'text_domain' ),
		'add_new_item'          => __( 'Add New Training', 'text_domain' ),
		'new_item'              => __( 'New Training', 'text_domain' ),
		'edit_item'             => __( 'Edit Training', 'text_domain' ),
		'update_item'           => __( 'Update Training', 'text_domain' ),
	);
	$args_training = array(
		'label'                 => __( 'Program', 'text_domain' ),
		'description'           => __( 'Programs', 'text_domain' ),
		'labels'                => $training_labels,
		'supports'              => array( 'title' ),
		'taxonomies'            => array( 'training' ),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 20,
		'menu_icon'             => 'dashicons-calendar-alt',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
	);
	$sidenav_labels = array(
		'name'                  => _x( 'Side Navigations', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Side Navigation', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Side Navigations', 'text_domain' ),
		'name_admin_bar'        => __( 'Side Navigation', 'text_domain' ),
		'add_new_item'          => __( 'Add New Side Navigation', 'text_domain' ),
		'new_item'              => __( 'New Side Navigation', 'text_domain' ),
		'edit_item'             => __( 'Edit Side Navigation', 'text_domain' ),
		'update_item'           => __( 'Update Side Navigation', 'text_domain' ),
	);
	$args_sidenav = array(
		'label'                 => __( 'Sidenav', 'text_domain' ),
		'description'           => __( 'Side Navs', 'text_domain' ),
		'labels'                => $sidenav_labels,
		'supports'              => array( 'title', 'editor' ),
		'taxonomies'            => array( 'sidenav' ),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 75,
		'menu_icon'             => 'dashicons-list-view',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
	);
	$comms_labels = array(
		'name'                  => _x( 'Communications Materials', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Communications Material', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Communications Materials', 'text_domain' ),
		'name_admin_bar'        => __( 'Comms Materials', 'text_domain' ),
		'add_new_item'          => __( 'Add New Communications Material', 'text_domain' ),
		'new_item'              => __( 'New Communications Material', 'text_domain' ),
		'edit_item'             => __( 'Edit Communications Material', 'text_domain' ),
		'update_item'           => __( 'Update Communication Material', 'text_domain' ),
	);
	$comms_sidenav = array(
		'label'                 => __( 'Communications Materials', 'text_domain' ),
		'description'           => __( 'Communications materials', 'text_domain' ),
		'labels'                => $comms_labels,
		'supports'              => array( 'title', 'thumbnail' ),
		'taxonomies'            => array( 'comms' ),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-images-alt2',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
	);
	register_post_type( 'staff', $args );
	register_post_type( 'department', $args_dept );
	register_post_type( 'program', $args_program );
	register_post_type( 'training', $args_training );
	register_post_type( 'sidenav', $args_sidenav );
	register_post_type( 'comms', $comms_sidenav );
}

add_action( 'init', 'custom_post_type', 0 );

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

	if ( is_singular('department') ) {
	wp_enqueue_script( 'department-js', get_template_directory_uri() . '/dist/department.js', array('react', 'react-dom', 'babel'), '1.0.0', true);
}
elseif (is_singular('program')) {
	wp_enqueue_script( 'program-js', get_template_directory_uri() . '/dist/program.js', array('react', 'react-dom', 'babel'), '1.0.0', true);
}
elseif (is_singular('staff')) {
	wp_enqueue_script( 'staff-js', get_template_directory_uri() . '/dist/staff.js', array('react', 'react-dom', 'babel'), '1.0.0', true);
}
elseif (is_page_template('page-directory.php')) {
	wp_enqueue_script( 'directory-js', get_template_directory_uri() . '/dist/directory.js', array('react', 'react-dom', 'babel'), '1.0.0', true);
}
elseif (is_page_template('page-compliance.php')) {
	wp_enqueue_script( 'compliance-js', get_template_directory_uri() . '/dist/compliance.js', array('react', 'react-dom', 'babel'), '1.0.0', true);
}
elseif (is_page_template('page-resources.php')) {
	wp_enqueue_script( 'resources-js', get_template_directory_uri() . '/dist/resources.js', array('react', 'react-dom', 'babel'), '1.0.0', true);
}
elseif (is_page_template('page-department-directory.php')) {
	wp_enqueue_script( 'department-directory-js', get_template_directory_uri() . '/dist/department-directory.js', array('react', 'react-dom', 'babel'), '1.0.0', true);
}
elseif (is_front_page()) {
	wp_enqueue_script( 'index-js', get_template_directory_uri() . '/dist/index.js', array('react', 'react-dom', 'babel'), '1.0.0', true);
}
else {
	wp_enqueue_script( 'default-js', get_template_directory_uri() . '/dist/search-only.js', array('react', 'react-dom', 'babel'), '1.0.0', true);
}
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

//Custom endpoints please kill me

function big_staff( $data ) {
  $posts = get_posts( array(
		'numberposts' => -1,
		'post_type' => 'staff',
  ) );

  if ( empty( $posts ) ) {
    return 'doooh';
  }
		$data = [];

		foreach ($posts as $post) {
			$api_content = [
				'name' => $post->post_title,
				'email' => get_field('email', $post->ID),
				'start_date' => get_field('start_date', $post->ID),
				'fun_facts' => get_field('fun_facts', $post->ID),
				'url' => get_permalink($post->ID),
				'image' => get_the_post_thumbnail_url($post->ID)
			];
			$data[] = $api_content;
		}
		return $data;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'portal/v2', '/bigstaff/', array(
    'methods' => 'GET',
    'callback' => 'big_staff',
  ) );
} );

function trainings_pull( $data ) {
  $posts = get_posts( array(
		'numberposts' => -1,
		'post_type' => 'training',
  ) );

  if ( empty( $posts ) ) {
    return 'doooh';
  }
		$data = [];

		foreach ($posts as $post) {
			$api_content = [
				'date' => get_field('date', $post->ID),
				'start_time' => get_field('start_time', $post->ID),
				'end_time' => get_field('end_time', $post->ID),
				'location' => get_field('location', $post->ID),
				'training_type' => get_field('training_type', $post->ID)
			];
			$data[] = $api_content;
		}
		return $data;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'portal/v2', '/trainings/', array(
    'methods' => 'GET',
    'callback' => 'trainings_pull',
  ) );
} );

function sidenavs_pull( $data ) {
  $posts = get_posts( array(
		'numberposts' => -1,
		'post_type' => 'sidenav',
  ) );

  if ( empty( $posts ) ) {
    return 'doooh';
  }
		$data = [];

		foreach ($posts as $post) {
			$api_content = [
				'id' => $post->ID,
				'name' => $post->post_title,
				'content' => $post->post_content,
				'icon' => get_field('icon', $post->ID),
				'category' => get_field('category', $post->ID),
				'position' => get_field('position', $post->ID),
				'edit_link' => get_edit_post_link(180)
			];
			$data[] = $api_content;
		}
		return $data;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'portal/v2', '/sidenavs/', array(
    'methods' => 'GET',
    'callback' => 'sidenavs_pull',
  ) );
} );

function comms_pull( $data ) {
  $posts = get_posts( array(
		'numberposts' => -1,
		'post_type' => ['comms'],
  ) );

  if ( empty( $posts ) ) {
    return 'doooh';
  }
		$data = [];

		foreach ($posts as $post) {
			$api_content = [
				'id' => $post->ID,
				'name' => $post->post_title,
				'type' => get_field('type_of_comms', $post->ID),
				'image' => wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'medium'),
				'tinyImage' => wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID )),
				'related' => get_field('related_programs', $post->ID)
			];
			$data[] = $api_content;
		}
		return $data;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'portal/v2', '/comms/', array(
    'methods' => 'GET',
    'callback' => 'comms_pull',
  ) );
} );

// END custom endpoints

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
