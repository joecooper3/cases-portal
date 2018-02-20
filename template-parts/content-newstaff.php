<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package CASES_Portal
 */

?>

<?php $args = array(
    'posts_per_page' => 8,
    'post_type' => 'staff'
);
$query = new WP_Query($args);
while ($query->have_posts()) :
    $query->the_post();
?>

<?php
if ( is_front_page()): ?>
<div class="staff-container">
  <a href="<?php the_permalink(); ?>">
<div class="portrait" style="background-image:url('<?php the_post_thumbnail_url(); ?>')"></div>
<h2 class="name"><?php the_title(); ?></h2></a>
<h3 class="meta">
Start Date: <?php the_field("start_date"); ?></h3>
<div class="fun-facts">
  <?php the_field("fun_facts"); ?>
</div>
	<footer class="entry-footer">
		<?php cases_portal_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</div>
<?php endif; ?>

<?php endwhile;
wp_reset_postdata();
?>
