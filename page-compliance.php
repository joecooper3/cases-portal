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
		<h1 id="dept-title" data-id="<?php the_title();?>"
			perm="<?php if(current_user_can('administrator') || current_user_can('edit_trainings')){echo "sure";} else {echo "nah";} ?>"><?php the_title();?></h1>
		<div class="entry-content">
				<?php
		      if ( have_posts() ) : while ( have_posts() ) : the_post();
		  			the_content();
						if(current_user_can('administrator') || current_user_can('edit_trainings')) : ?>
						<div class="edit-button"><?php
						$editLink = get_edit_post_link(); ?><a href="<?php echo $editLink; ?>">Edit <strong><?php the_title(); ?></strong> blurbs
							<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
				</a></div>
				<?php endif; ?>
			<?php endwhile;        endif;
		  		?>
				</div>
	</div>
	  <?php if( get_field('box_2_title') ): ?>
			<div>
				<h1><?php the_field('box_2_title') ?></h1>
				<?php the_field('box_2_content') ?>
			</div>
			<?php endif; ?>
	  <?php if( get_field('box_3_title') ): ?>
			<div>
				<h1><?php the_field('box_3_title') ?></h1>
				<?php the_field('box_3_content') ?>
			</div>
			<?php endif; ?>
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
<?php if(current_user_can('administrator') || current_user_can('edit_trainings')) : ?>
<div class="edit-sidenav lone-edit-button">
	<a href="http://portal.cases.org/wp-admin/edit.php?post_type=training">
	Edit <strong>Training Dates</strong> <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
	</a>
</div>
<?php endif; ?>

<span id="sidenav-container">
</span>
<?php
get_footer(); ?>
<?php } ?>
