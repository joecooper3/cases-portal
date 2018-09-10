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
else {
	$perm_slug = get_field('editing_slug');
	$fullRole = "check_".$perm_slug;
?>

	<div id="primary" 
	class="content-area"
	data-id="resources"
	page-name="<?php the_title();?>"
	perm="<?php if(current_user_can('administrator') || current_user_can($fullRole)){echo "sure";} else {echo "nah";} ?>"
	>
			<div>
		<h1 id="dept-title"><?php the_title();?></h1>
		<div class="entry-content">
			<?php
			$catKing = get_the_title();
			$currentDate = date('Ymd');
			$args2 = array(
  		'post_type' 	=> 'post' ,
  		'category_name' => $catKing,
			);
			$q = new WP_Query($args2);
			if ( $q->have_posts() ) {
			  while ( $q->have_posts() ) {
			    $q->the_post();
					$expDate = get_field('expiration_date');
					if (!$expDate) {
						$postDate = get_the_date('Ymd');
						$expDate = $postDate + 7;
					}; ?>
					<?php if ($currentDate < $expDate) : ?>
		<div class="resc-alert">
			<div class="alert-container">
				<h4 class="alert">Alert</h4>
			<div class="entry-meta">
						<?php the_date() ?> by <?php the_author() ?>
					</div><!-- .entry-meta -->
				</div>
			<h2><?php the_title(); ?></h2>

		<p><?php the_content(); ?></p>
		<?php if(current_user_can('administrator') || current_user_can($fullRole)) : ?>
		<div class="edit-button"><?php
		$editLink = get_edit_post_link(); ?><a href="<?php echo $editLink; ?>">Edit <strong><?php the_title(); ?></strong>
			<i class="fa fa-long-arrow-right" aria-hidden="true"></i><br/>
</a></div>
		<div class="edit-button"><?php
		$editLink = get_edit_post_link(); ?>
		<a href="http://portal.cases.org/wp-admin/post-new.php">
		<strong>+</strong> Write <strong>New Post</strong>
</a></div>
<?php
$alertPresent = true;
endif; ?>
	</div>
<?php endif; ?>
		<?php
					  }
					}
					?>
							<?php
					      if ( have_posts() ) : while ( have_posts() ) : the_post();
					  			the_content(); ?>
							<?php 	
								$task_buttons = get_field('task_buttons'); 
								$tb1_image = $task_buttons['button_1_image'];
								$tb1_text = $task_buttons['button_1_text'];
								$tb1_url = $task_buttons['button_1_url'];
								$tb2_image = $task_buttons['button_2_image'];
								$tb2_text = $task_buttons['button_2_text'];
								$tb2_url = $task_buttons['button_2_url'];
								$below_content = $task_buttons['content_below_buttons'];
								if (($tb1_text && $tb1_url) || ($tb2_text && $tb2_url)) : ?>
									<div class="task-button-container">
								<?php endif; ?>
								<?php if ($tb1_text && $tb1_url) : ?>
									
											<a class="task-button" href="<?php echo $tb1_url; ?> " target="_blank">
												<?php if ($tb1_image) : ?>
													<div class="circle-icon">
														<?php echo wp_get_attachment_image( $tb1_image['id']); ?>
													</div>
												<?php endif; ?>
												<div class="button-is">
													<?php echo $tb1_text; ?> <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
												</div>
											</a>
									<?php endif; ?>
									<?php if ($tb2_text && $tb2_url) : ?>
											<a class="task-button" href="<?php echo $tb2_url; ?>" target="_blank">
												<?php if ($tb2_image) : ?>
													<div class="circle-icon">
														<?php echo wp_get_attachment_image( $tb2_image['id']); ?>
													</div>
												<?php endif; ?>
												<div class="button-is">
													<?php echo $tb2_text; ?> <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
												</div>
											</a>
									<?php endif; ?>
									<?php if (($tb1_text && $tb1_url) || ($tb2_text && $tb2_url)) : ?>
										</div>
									<?php endif; ?>
									<?php if ($task_buttons['content_below_buttons']) : ?>
									<?php echo $below_content; ?>
									<?php endif; ?>
									<?php if(current_user_can('administrator') || current_user_can($fullRole)) : ?>
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
			<?php if( get_field('staff_directory_page') ): ?>
		<a class="staff-directory-referral" href="<?php the_field('staff_directory_page') ?>">
			<i class="fa fa-address-book-o" aria-hidden="true"></i>
			<p>For staff	and contact information, visit the <strong><?php the_title(); ?> staff
				directory page</strong>. <i class="fa fa-long-arrow-right" aria-hidden="true"></i></p></a>
			<?php endif; ?>
		<?php if(current_user_can('administrator') || current_user_can($fullRole)) : ?>
		<div id="admin-area" class="resources-links">
			<div class="individual-sidenav-container">
				<div class="icon-secondary-container">
					<i class="fa fa-lock" aria-hidden="true"></i>
				<h2><?php the_title(); ?> Page Admin</h2>
			</div>
			<ul>
				<a href="<?php echo $editLink; ?>"><li><i class="fa fa-pencil-square" aria-hidden="true"></i>
					Edit <?php the_title(); ?> Page</li></a>
				</li>
				<a href="http://portal.cases.org/wp-admin/post-new.php"><li><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
					Write New Post/Alert</li></a>
				<a href="http://portal.cases.org/wp-admin/post-new.php?post_type=sidenav"><li><i class="fa fa-bars" aria-hidden="true"></i>
					Create New Side Navigation</li></a>
				<a href="<?php the_field('sharepoint') ?>" target="_blank"><li><i class="fa fa-windows" aria-hidden="true"></i>
					<?php the_title(); ?> Sharepoint</li></a>
			</ul>
	</div>
</div>
		<?php endif; ?>

		<span id="sidenav-container">
		</span>
		<?php
			$catKing = get_the_title();
			if($alertPresent) {
				$offsetNo = 1;
			}
			else {
				$offsetNo = 0;
			}
			$args3 = array(
			'post_type' 	=> 'post' ,
			'category_name' => $catKing,
			'posts_per_page' => 3,
			'offset' => $offsetNo
		);
			$q2 = new WP_Query($args3);
			$count = $q2->post_count;
			if ($count > 0) : ?>
		<div class="past-updates">
			<h2>Past <?php the_title(); ?> Updates</h2>
			<ul>
				<?php	if ( $q2->have_posts() ) {
			while ( $q2->have_posts() ) {
				$q2->the_post(); ?>
				<a href="<?php the_permalink(); ?>">
				<li>
					<?php the_title(); ?>
					<div class="date">
					<?php $bah = get_the_date();
					echo $bah;
				 ?>
				</div>
				</li>
			</a>

			<?php			}
					}
			?>
		</ul>
</div>
		<?php endif; ?>
	</div>
<?php
get_footer(); ?>
<?php } ?>
