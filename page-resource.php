<?php /* Template Name: Resources Page Template */
/**
 * The template for displaying all resources pages
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
		<h1 id="dept-title" data-id="<?php the_title();?>"><?php the_title();?></h1>
		<div class="entry-content">
				<?php
		      if ( have_posts() ) : while ( have_posts() ) : the_post();
		  			the_content();
		        endwhile;        endif;
		  		?>
				</div>
	</div>
	</div><!-- #primary -->
	<div id="secondary">
<div>not as impressive</div>
</div>
<?php
get_footer(); ?>
<?php } ?>
