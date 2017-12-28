<?php
/**
 * The template for displaying all single sections
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package CASES_Portal
 */

get_header(); ?>

	<div id="primary" class="content-area">
			<div>
		<h1 id="dept-title" data-id="<?php the_title();?>"><?php the_title();?></h1>
		<div id="itititme">hey</div>
	</div>
	</div><!-- #primary -->
	<div id="secondary">
<div id="cases-website-stories"></div>
</div>
<?php
get_footer();
