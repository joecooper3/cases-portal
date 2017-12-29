<?php
/**
 * The template for displaying the program pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package CASES_Portal
 */

get_header(); ?>

	<div id="primary" class="content-area">
			<div class="dept-container">
		<h1 id="dept-title" data-id="<?php the_title();?>" supervisor-id="<?php the_field('director'); ?>">
			<?php the_title();?></h1>
		<div id="app-area">I got to be content with what I got</div>
	</div>
	</div><!-- #primary -->
	<!--
	We'll add this when we have more program information
	<div id="secondary">
<div id="cases-website-stories"></div>
</div> -->
<?php
get_footer();
