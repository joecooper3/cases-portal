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

	<div id="primary" class="content-area">
			<div>
		<h1 id="dept-title" data-id="<?php the_title();?>"
perm="<?php if(current_user_can('administrator') || current_user_can($fullRole)){echo "sure";} else {echo "nah";} ?>">
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
		<?php if(current_user_can('administrator') || current_user_can($fullRole)) : ?>
		<div class="edit-button"><?php
		$editLink = get_edit_post_link(); ?><a href="<?php echo $editLink; ?>">Edit <strong><?php the_title(); ?></strong>
			<i class="fa fa-long-arrow-right" aria-hidden="true"></i><br/>
</a></div>
		<div class="edit-button"><?php
		$editLink = get_edit_post_link(); ?><a href="http://portal.cases.org/wp-admin/post-new.php"><strong>+</strong> Write <strong>New Post</strong>
</a></div>
<?php endif; ?>
	</div>
		<?php
					  }
					}
					?>
							<?php
					      if ( have_posts() ) : while ( have_posts() ) : the_post();
					  			the_content(); ?>
									<?php if ($catKing == 'Information Services') : ?>
										<div class="task-button-container">
											<a class="task-button" href="https://groups.google.com/a/cases.org/forum/?utm_medium=email&utm_source=footer#!forum/ishelpdesk_bb" target="_blank">
												<div class="circle-icon">
													<img src="http://portal.cases.org/wp-content/themes/cases_portal/images/laptop.svg">
												</div>
												<div class="button-is">
													Post a ticket for <br/>the IS Helpdesk <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
												</div>
											</a>
											<a class="task-button" href="https://groups.google.com/a/cases.org/forum/?utm_medium=email&utm_source=footer#!forum/database.helpdesk.bb" target="_blank">
												<div class="circle-icon">
													<img src="http://portal.cases.org/wp-content/themes/cases_portal/images/database.svg" style="width:125px">
												</div>
												<div class="button-is">
													Post a ticket for Salesforce help <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
												</div>
											</a>
										</div>
									<?php elseif ($catKing == 'Human Resources') : ?>
										<div class="task-button-container">
											<a class="task-button" href="https://secure3.entertimeonline.com/ta/6131594.login" target="_blank">
												<div class="circle-icon">
													<img src="http://portal.cases.org/wp-content/themes/cases_portal/images/clock.svg">
												</div>
												<div class="button-is">
													Submit Your <br/>Timesheet <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
												</div>
											</a>
											<a class="task-button" href="https://workforcenow.adp.com/public/index.htm" target="_blank">
												<div class="circle-icon">
													<img src="http://portal.cases.org/wp-content/themes/cases_portal/images/id.svg">
												</div>
												<div class="button-is">
													Update Your <br/>Records <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
												</div>
											</a>
										</div>
									<?php elseif ($catKing == 'Facilities') : ?>
										<div class="task-button-container">
											<a class="task-button" href="https://groups.google.com/a/cases.org/forum/?hl=en#!forum/facilities.requests_bb" target="_blank">
												<div class="circle-icon">
													<img src="http://portal.cases.org/wp-content/themes/cases_portal/images/wrench.svg">
												</div>
												<div class="button-is">
													Post a Task<br/> for Facilities <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
												</div>
											</a>
										</div>
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
				<a href="<?php the_field('sharepoint') ?>" target="_blank"><li><i class="fa fa-windows" aria-hidden="true"></i>
					<?php the_title(); ?> Sharepoint</li></a>
				<a href="http://portal.cases.org/wp-admin/post-new.php"><li><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
					Write New Post/Alert</li></a>
				<a href="http://portal.cases.org/wp-admin/post-new.php?post_type=sidenav"><li><i class="fa fa-bars" aria-hidden="true"></i>
					Create New Side Navigation</li></a>
			</ul>
	</div>
</div>
		<?php endif; ?>

		<span id="sidenav-container">
		</span>
		<?php
			$catKing = get_the_title();
			$args3 = array(
			'post_type' 	=> 'post' ,
			'category_name' => $catKing,
			'posts_per_page' => 3,
			'offset' => 1
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
<?php
get_footer(); ?>
<?php } ?>
