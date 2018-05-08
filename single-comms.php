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
	$pdfUrl = str_replace("-pdf-150x150.jpg", ".pdf", $thumbnail[0]);
	$relatedPrograms = get_field('related_programs'); ?>
	<div id="primary" class="content-area" category="staff">
		<div class="comms-piece">
			<h1><?php the_title(); ?></h1>
		<div class="thumbnail-container">
			<a href="<?php echo $pdfUrl ?>" target="_blank"><?php the_post_thumbnail(); ?></a>
		</div>
		<div class="meta-details">
			Last Updated: <strong><?php echo get_the_date(); ?></strong><br/>
			Number of Pages: <strong><?php the_field('no_of_pages'); ?></strong><br/>
			Related Program(s): <strong><ul><?php foreach($relatedPrograms as $program)
			{
				$progLink = get_permalink($program->ID);
				echo '<li><a href="'.$progLink.'">'.$program->post_title.'</a></li>';
			}
			 ?></ul></strong>
		</div>
		<a href="<?php echo $pdfUrl ?>" target="_blank" class="download">
			Download as PDF <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
		</a>
	</div>
	</div><!-- #primary -->

<?php
get_footer(); ?>

<?php } ?>
