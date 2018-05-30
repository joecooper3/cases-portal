<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package CASES_Portal
 */

get_header(); ?>

<?php if ( !is_user_logged_in()) {
}
else { ?>

	<div id="primary" 
	class="content-area"
	data-id="staff"
	page-name="<?php the_title();?>"
	supervisor-id="<?php the_field('director'); ?>"
	staff-email="<?php the_field('email'); ?>"
	>
		<div id="staff-title" class="single-staff-container">
			<div id="staff-breadcrumbs">

			</div>
		<div id="app-area"></div>
	</div>
	<span id="related-staff" class="temp-span"></span>
	</div><!-- #primary -->

<?php
get_footer(); ?>

<?php } ?>
