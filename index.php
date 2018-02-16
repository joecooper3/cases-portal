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
			<div class="staff-container">
				<?php	/* Start the Loop */
					while ( have_posts() ) : the_post();

						/*
						 * Include the Post-Format-specific template for the content.
						 * If you want to override this in a child theme, then include a file
						 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
						 */
						get_template_part( 'template-parts/content-newstaff', get_post_format() );

					endwhile; ?>
				<div class="portrait tgreen"></div>
				<h2 class="name">Takiera Green</h2>
				<h3 class="meta">Program Assistant, Nathaniel ACT<br/>
				Start Date: 11/06/17</h3>
				<div class="fun-facts">
					<ul>
						<li>I love listening to music</li>
						<li>My favorite color is burgundy</li>
						<li>I am passionate about the NYS criminal justice system</li>
						<li>I have two brothers and a sister</li>
						<li>I love to travel</li>
					</ul>
				</div>
			</div>
			<div class="staff-container">
				<div class="portrait jrodriguez"></div>
				<h2 class="name">Jessica Rodriguez</h2>
				<h3 class="meta"> Program Assistant, Manhattan FACT II<br/>
				Start Date: 10/30/17</h3>
				<div class="fun-facts">
					<ul>
						<li>I am a mom of two girls</li>
						<li>My favorite color is burgundy</li>
						<li>I am a certified Medical Assistant</li>
						<li>I love coffee</li>
						<li>My favorite color is blue</li>
						<li>I enjoy baking</li>
					</ul>
				</div>
			</div>
			<div class="staff-container">
				<div class="portrait dhall"></div>
				<h2 class="name">Deshawn Hall</h2>
				<h3 class="meta">Mentor, Next STEPS<br/>
				Start Date: 10/10/17</h3>
				<div class="fun-facts">
					<ul>
						<li>Loves the color gray</li>
						<li>Likes hot chocolate</li>
						<li>Loves to help people who help themselves</li>
						<li>Loves bike riding</li>
						<li>World goal: peace</li>
					</ul>
				</div>
			</div>
			<div class="staff-container">
				<div class="portrait jholliday"></div>
				<h2 class="name">Joseph Holliday</h2>
				<h3 class="meta">Peer Specialist, newSTART<br/>
				Start Date: 07/10/17</h3>
				<div class="fun-facts">
					<ul>
						<li>I am a huge fan of horror movies</li>
						<li>I love all New York sports teams</li>
						<li>I prefer winter over summer</li>
						<li>I am a veteran of the US Army</li>
						<li>I love to ride motorcycles</li>
					</ul>
				</div>
			</div>
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
			<ul>
				<a href="#!"><li><i class="fa fa-sitemap" aria-hidden="true"></i>
					<span>CASES Directory</span></li></a>
				<a href="#!"><li><i class="fa fa-book" aria-hidden="true"></i>
					<span>Communications Materials</span></li></a>
				<a href="#!"><li><i class="fa fa-users" aria-hidden="true"></i>
					<span>Human Resources Policies and Forms</span></li></a>
				<a href="#!"><li><i class="fa fa-question-circle" aria-hidden="true"></i>
					<span>Report a Salesforce Issue</span></li></a>
				<a href="#!"><li><i class="fa fa-skype" aria-hidden="true"></i>
					<span>Video Conference Instructions</span></li></a>
			</ul>
		</div>
		<div id="cases-website-stories">
			<h2>CASES Website Stories</h2>
		</div>
	</aside>

<?php
get_footer();
