<?php /* Template Name: Compliace & Privacy Page Template */
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
<div class="resources-links">
	<div class="icon-secondary-container">
		<i class="fa fa-calendar" aria-hidden="true"></i>
		<h2>Compliance Training Dates</h2>
</div>
<ul id="compliance-dates" class="dates-list">
	<div style="text-align:center">
<i class="fa fa-circle-o-notch spinning" aria-hidden="true"></i>
</div>
</ul>
</div>

<div class="resources-links">
	<div class="icon-secondary-container">
		<i class="fa fa-calendar" aria-hidden="true"></i>
		<h2>Privacy Training Dates</h2>
</div>
<ul id="privacy-dates" class="dates-list">
	<div style="text-align:center">
<i class="fa fa-circle-o-notch spinning" aria-hidden="true"></i>
</div>
</ul>
</div>

<div class="resources-links">
	<div class="icon-secondary-container">
		<i class="fa fa-file-text" aria-hidden="true"></i>
		<h2>Relevant Documents</h2>
</div>
<ul>
	<a href="#!"><li>False Claims Act</li></a>
	<a href="#!"><li>Privacy Policy</li></a>
	<a href="#!"><li>The Stark Law</li></a>
</ul>
</div>
</div>
<?php
get_footer(); ?>
<?php } ?>
