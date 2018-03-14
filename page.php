<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CASES_Portal
 */

 get_header(); ?>


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
 <?php
 get_footer();
