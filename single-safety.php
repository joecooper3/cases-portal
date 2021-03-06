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
 <?php 
 $postID = get_the_ID();
 $docCat = get_the_terms($postID, 'docs'); ?>
  <div id="primary" class="content-area" data-id="docs" cat="<?php echo $docCat[0]->slug; ?>" post-id="<?php echo $postID; ?>">
  <div id="documentation">
    <h1 id="dept-title"><?php the_title(); ?></h1>
    <?php if ( have_posts() ) while ( have_posts() )  the_post(); ?>

    <?php the_content(); ?>
    <div id="docs-nav"></div>
  </div>
   	</div><!-- #primary -->
       <div id="secondary">
          <div class="docs-links">
           <h2>Safety at CASES</h2>
           <?php
          wp_nav_menu( array(
            'theme_location' => 'safety_at_cases',
            'menu_id'        => 'safety-at-cases',
          ) );
        ?>
          </div>
        <div class="docs-links">
          <h2>Emergency Preparedness</h2>
          <?php
				wp_nav_menu( array(
					'theme_location' => 'emergency_preparedness',
					'menu_id'        => 'emergency-preparedness',
				) );
			?>
        </div>
       </div>
<?php
get_footer(); ?>
<?php } ?>
