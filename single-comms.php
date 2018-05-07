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
	<?php $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ) );
	$pdfUrl = str_replace("-pdf-150x150.jpg", ".pdf", $thumbnail[0]); ?>
	<div id="primary" class="content-area" category="staff">
		<div class="comms-piece">
			<h1><?php the_title(); ?></h1>
		<div class="thumbnail-container">
			<a href="<?php echo $pdfUrl ?>" target="_blank"><?php the_post_thumbnail(); ?></a>
		</div>
		<a href="<?php echo $pdfUrl ?>" target="_blank" class="download">Download as PDF</a>
	</div>
	</div><!-- #primary -->

<?php
get_footer(); ?>

<?php } ?>
