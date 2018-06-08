<?php
/**
 * The template for displaying the portal docs
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
  <div id="documentation">
    <h1><?php the_title(); ?></h1>
    <?php if ( have_posts() ) while ( have_posts() )  the_post(); ?>

    <?php the_content(); ?>
  </div>
   	</div><!-- #primary -->
       <div id="secondary">
        <div class="resources-links">
          <h2>Basic Training</h2>
          <?php
				wp_nav_menu( array(
					'theme_location' => 'basic_training',
					'menu_id'        => 'secondary-menu',
				) );
			?>
        </div>
        <div class="resources-links">
         <h2>Advanced Training</h2>
         <?php
				wp_nav_menu( array(
					'theme_location' => 'advanced_training',
					'menu_id'        => 'secondary-menu',
				) );
			?>
        </div>
        <div class="resources-links">
          <h2>Developer Documentation</h2>
          <?php
				wp_nav_menu( array(
					'theme_location' => 'developer_guide',
					'menu_id'        => 'secondary-menu',
				) );
			?>
        </div>
       </div>
<?php
get_footer(); ?>
<?php } ?>
