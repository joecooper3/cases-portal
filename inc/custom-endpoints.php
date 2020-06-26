<?php

function big_staff( $data ) {
  $posts = get_posts( array(
		'numberposts' => -1,
		'post_type' => 'staff',
  ) );
  $depts = get_posts( array(
		'numberposts' => -1,
		'post_type' => 'department',
  ) );
  $progs = get_posts( array(
		'numberposts' => -1,
		'post_type' => 'program',
  ) );

  if ( empty( $posts ) ) {
    return 'doooh';
  }
		$data = [];

		foreach ($posts as $post) {
			$api_content = [
				'id' => $post->ID,
				'name' => $post->post_title,
				'type' => 'staff',
				'email' => strtolower(get_field('email', $post->ID)),
				'start_date' => get_field('start_date', $post->ID),
				'fun_facts' => get_field('fun_facts', $post->ID),
				'url' => get_permalink($post->ID),
				'image' => get_the_post_thumbnail_url($post->ID)
			];
			$data[] = $api_content;
		}
		foreach ($depts as $dept) {
			$api_content = [
				'id' => $dept->ID,
				'name' => $dept->post_title,
				'type' => 'dept',
				'url' => get_permalink($dept->ID),
				'acronym' => get_field('acronym', $dept->ID),
				'icon' => get_field('department_icon', $dept->ID),
				'director' => get_field('director', $dept->ID)
			];
			$data[] = $api_content;
		}
		foreach ($progs as $prog) {
			$api_content = [
				'id' => $prog->ID,
				'name' => $prog->post_title,
				'type' => 'program',
				'url' => get_permalink($prog->ID),
				'acronym' => get_field('acronym', $prog->ID),
				'director' => get_field('director', $prog->ID),
				'parent_dept_id' => get_field('parent_department', $prog->ID)[0]->ID,
				'parent_dept_name' => get_field('parent_department', $prog->ID)[0]->post_title
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
				'url' => get_permalink($post->ID),
				'type' => get_the_terms($post->ID, 'commstax')[0]->slug,
				'image' => wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'medium'),
				'tinyImage' => wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID )),
				'related' => get_field('related_programs', $post->ID),
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

function users_pull( $data ) {
$users = new WP_User_Query(  array(
	'order'          => 'ASC',
	'orderby'        => 'user_name',
	'count_total'    => 'true',
	'number'		 => '-1'
) );

  if ( empty( $users ) ) {
    return 'daaaah';
  }
		$data = [];

		return $data;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'portal/v2', '/users/', array(
    'methods' => 'GET',
    'callback' => 'users_pull',
  ) );
} );