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
		<div class="most-the-post">
			<?php while ( have_posts() ) : the_post();
			get_template_part( 'template-parts/content-single', get_post_type() );
		endwhile; // End of the loop.
		?>
		<div class="post-navigation">
		<?php previous_post_link( '<div class="nav-previous"><div class="title">Previous Post</div>%link</div>', '<span class="meta-nav">' . _x( '←', 'Previous post link', 'vantage' ) . '</span> %title' ); ?>
		<?php next_post_link( '<div class="nav-next"><div class="title">Next Post</div>%link</div>', '%title <span class="meta-nav">' . _x( '→', 'Next post link', 'vantage' ) . '</span>' ); ?>
	</div>
	</div>
	</div><!-- #primary -->
<?php
get_footer(); ?>

<?php } ?>
