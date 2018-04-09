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
		<h1 id="dept-title" data-id="<?php the_title();?>"
perm="<?php if(current_user_can('administrator')){echo "sure";} else {echo "nah";} ?>">
		<?php the_title();?></h1>
		<div class="entry-content">
			<?php
			$catKing = get_the_title();
			$args2 = array(
  		'post_type' 	=> 'post' ,
  		'category_name' => $catKing,
			);
			$q = new WP_Query($args2);
			if ( $q->have_posts() ) {
			  while ( $q->have_posts() ) {
			    $q->the_post();
?>
		<div class="resc-alert"><h4 class="alert">Alert</h4>
			<h2><?php the_title(); ?></h2>
			<div class="entry-meta">
				<?php cases_portal_posted_on(); ?>
			</div><!-- .entry-meta -->
		<p><?php the_content(); ?></p>
		<div><?php edit_post_link('edit the thing'); ?></div>
	</div>
		<?php
					  }
					}
					?>
							<?php
					      if ( have_posts() ) : while ( have_posts() ) : the_post();
					  			the_content();
					        endwhile;        endif;
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
		<span id="sidenav-container">
		</span>
		<div class="resources-links">
			<h2>Past <?php the_title(); ?> Updates</h2>
			<ul>
	<?php
		$catKing = get_the_title();
		$args3 = array(
		'post_type' 	=> 'post' ,
		'category_name' => $catKing,
		'posts_per_page' => 3,
		'offset' => 1
		);
		$q2 = new WP_Query($args3);
		if ( $q2->have_posts() ) {
			while ( $q2->have_posts() ) {
				$q2->the_post(); ?>
				<a href="<?php the_permalink(); ?>">
				<li>
					<?php the_title(); ?>
					<div class="date">
					<?php $bah = get_the_date();
					echo $bah;
					if(current_user_can('administrator'))
			 {echo 'admin is logged on';}
			 else {echo 'not quite';}
				 ?>
				</div>
				</li>
			</a>

			<?php			}
					}
			?>
		</ul>
</div>

<?php
get_footer(); ?>
<?php } ?>
