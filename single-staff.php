<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package CASES_Portal
 */

get_header(); ?>

	<div id="primary" class="content-area" category="staff">
		<div id="staff-title" class="single-staff-container"
			data-id="<?php the_title();?>" staff-email="<?php the_field('email'); ?>">
			<div id="staff-breadcrumbs">

			</div>
		<div id="app-area"></div>
	</div>
	</div><!-- #primary -->

<?php
get_footer();
