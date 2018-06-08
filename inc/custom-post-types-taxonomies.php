<?php
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
	$docs_labels = array(
		'name'                  => _x( 'Portal Documentation', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Portal Document', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Portal Documentation', 'text_domain' ),
		'name_admin_bar'        => __( 'Portal Docs', 'text_domain' ),
		'add_new_item'          => __( 'Add New Portal Doc', 'text_domain' ),
		'new_item'              => __( 'New Portal Doc', 'text_domain' ),
		'edit_item'             => __( 'Edit Portal Doc', 'text_domain' ),
		'update_item'           => __( 'Update Portal Doc', 'text_domain' ),
	);
	$args_docs = array(
		'label'                 => __( 'Portal Documentation', 'text_domain' ),
		'description'           => __( 'Resources for editing and updating the portal', 'text_domain' ),
		'labels'                => $docs_labels,
		'supports'              => array( 'title', 'editor', 'revisions'),
		'hierarchical'          => true,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-book-alt',
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
	register_post_type( 'documents', $args_docs );
}

// Register Custom Taxonomies
function custom_taxonomies() {
	$comms_tax_args = array(
		'labels' => array(
			'name' => 'Comms Categories',
			'singular_name' => 'Comms Category'
		),
		'show_in_rest' => true,
		'hierarchical' => true,
		'capabilities' => array(
			'manage_terms' => 'manage_categories',
			'edit_terms' => 'manage_categories',
			'delete_terms' => 'manage_categories',
			'assign_terms' => 'edit_posts'
		)
		);
	$docs_tax_args = array(
		'labels' => array(
			'name' => 'Portal Docs Categories',
			'singular_name' => 'Portal Doc Category'
		),
		'show_in_rest' => true,
		'hierarchical' => true,
		'capabilities' => array(
			'manage_terms' => 'manage_categories',
			'edit_terms' => 'manage_categories',
			'delete_terms' => 'manage_categories',
			'assign_terms' => 'edit_posts'
		)
		);

	register_taxonomy( 'commstax', 'comms', $comms_tax_args );
	register_taxonomy( 'docs', 'documents', $docs_tax_args );
}
add_action( 'init', 'custom_post_type', 0 );
add_action( 'init', 'custom_taxonomies', 0 );
register_taxonomy_for_object_type( 'comms_taxonomy', 'comms' );
register_taxonomy_for_object_type( 'docs_taxonomy', 'documents' );