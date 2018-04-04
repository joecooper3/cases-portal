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
<ul class="dates-list">
	<li><div class="date">May 12, 2018</div>
		<div class="location">Downtown Brooklyn, 3rd Floor</div>
		<div class="time">10:00 AM&ndash;11:00 AM</div>
	</li>
	<li><div class="date">June 18, 2018</div>
		<div class="location">Harlem, 8th Floor</div>
		<div class="time">1:00 PM&ndash;2:00 PM</div>
	</li>
<li><div class="date">August 1, 2018</div>
		<div class="location">Downtown Brooklyn, 3rd Floor</div>
		<div class="time">11:00 AM&ndash;12:00 PM</div>
	</li>
</ul>
</div>
<div class="resources-links">
	<div class="icon-secondary-container">
		<i class="fa fa-calendar" aria-hidden="true"></i>
		<h2>Privacy Training Dates</h2>
</div>
<ul class="dates-list">
		<li><div class="date">May 12, 2018</div>
		<div class="location">Downtown Brooklyn, 3rd Floor</div>
		<div class="time">10:00 AM&ndash;11:00 AM</div>
	</li>
	<li><div class="date">June 18, 2018</div>
		<div class="location">Harlem, 8th Floor</div>
		<div class="time">1:00 PM&ndash;2:00 PM</div>
	</li>
	<li><div class="date">August 1, 2018</div>
		<div class="location">Downtown Brooklyn, 3rd Floor</div>
		<div class="time">11:00 AM&ndash;12:00 PM</div>
	</li>
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
