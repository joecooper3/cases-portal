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
		<?php if (get_field(resources_page_url) && get_field(resources_page_text)) : ?>
			<a class="staff-directory-referral" href="<?php the_field('resources_page_url') ?>">
				<i class="fa <?php the_field('resources_page_icon') ?>" aria-hidden="true"></i>
				<p><?php the_field('resources_page_text') ?>
					 <i class="fa fa-long-arrow-right" aria-hidden="true"></i></p></a>
		<?php endif; ?>
		<span id="sec-holder-one" class="sec-blank-holder"></span>
</div>
<?php
get_footer(); ?>

<?php } ?>
