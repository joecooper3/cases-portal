<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CASES_Portal
 */

get_header(); ?>
	<div id="primary" class="content-area">
		<div id="news" class="site-main">


		<?php	/* Start the Loop */
			while ( have_posts() ) : the_post();

				/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
				 */
				get_template_part( 'template-parts/content', get_post_format() );

			endwhile; ?>

	</div><!-- #news -->
		<div id="new-hires">
			<h1>New Hires</h1>
			<?php	/* Start the Loop */
				/* while ( have_posts() ) : the_post();
					get_template_part( 'template-parts/content-newstaff', get_post_format() );
				endwhile; */ ?>
				<div id="new-staff-container"></div>
		</div>
	</div><!-- #primary -->

	<aside id="secondary">
		<div id="mission-statement">
			The mission of CASES is to increase public safety through innovative services
			that reduce crime and incarceration, improve behavioral health, promote
			recovery and rehabilitation, and create opportunities for success in the
			community.
		</div>
		<div id="quick-links">
			<h2>Quick Links</h2>
			<?php
				wp_nav_menu( array(
					'theme_location' => 'quick-links',
					'menu_id'        => 'secondary-menu',
				) );
			?>
		</div>
		<div id="cases-website-stories">
			<h2>CASES Website Stories</h2>
		</div>
	</aside>

<?php
get_footer();
