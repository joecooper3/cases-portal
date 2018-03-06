<?php
/**
 * The template for displaying the program pages
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
			<div class="dept-container">
		<h1 id="dept-title" data-id="<?php the_title();?>" supervisor-id="<?php the_field('director'); ?>" page-type="program">
			<?php the_title();?></h1>
		<div id="app-area"></div>
	</div>
	</div><!-- #primary -->
	<div id="secondary">
		<span id="sec-holder-one" class="sec-blank-holder"></span>
</div>
<?php
get_footer(); ?>

<?php } ?>
