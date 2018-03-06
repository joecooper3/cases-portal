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

	<div id="primary" class="content-area">
			<div>
		<div id="itititme">
			<?php while ( have_posts() ) : the_post();
			get_template_part( 'template-parts/content-single', get_post_type() );
			the_post_navigation();
		endwhile; // End of the loop.
		?>
	</div>
	</div><!-- #primary -->
<?php
get_footer(); ?>

<?php } ?>
