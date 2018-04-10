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
    'posts_per_page' => 5
);
$query = new WP_Query($args);
while ($query->have_posts()) :
    $query->the_post();
?>

<?php
if ($query->current_post === 0 && !is_paged() & is_front_page()): ?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php
        if (is_singular()) :
            the_title('<h1 class="entry-title">', '</h1>');
        else :
            the_title('<h1 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h1>');
        endif;

        if ('post' === get_post_type()) : ?>
		<div class="entry-meta">
			<?php cases_portal_posted_on();
      $cat = get_the_category();
      $catName = $cat[0]->name;
      $catIcon = get_field('icon', $cat[0]);
      $catColor = get_field('color', $cat[0]);
      $catUrl = get_field('parent_page', $cat[0]);
      ?>
      <a href="<?php echo $catName; ?>">
        <span class="category" style="background-color: <?php echo $catColor; ?>">
          <i class="fa <?php echo $catIcon; ?>" aria-hidden="true"></i><?php echo $catName; ?>
        </span>
      </a>
		</div><!-- .entry-meta -->
		<?php
        endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php
            the_content(sprintf(
                wp_kses(
                    /* translators: %s: Name of current post. Only visible to screen readers */
                    __('Continue reading<span class="screen-reader-text"> "%s"</span>', 'cases_portal'),
                    array(
                        'span' => array(
                            'class' => array(),
                        ),
                    )
                ),
                get_the_title()
            )); ?>
	</div><!-- .entry-content -->
</article><!-- #post-<?php the_ID(); ?> -->

<?php elseif ('post' == get_post_type()) :?>
  <aside class="old-entries">
  <?php the_title('<h3><a href="' . esc_url(get_permalink()) . '" rel="bookmark">','</a></h3>') ?>
  <p>Posted by <?php the_author();?> &bull; <?php the_date();?> &bull; 
    <?php
          $cat = get_the_category();
          $catName = $cat[0]->name;
          $catIcon = get_field('icon', $cat[0]);
          $catColor = get_field('color', $cat[0]);
          $catUrl = get_field('parent_page', $cat[0]); ?>
    <span class="category" style="color: <?php echo $catColor; ?>">
      <?php echo $catName; ?>
        </span></p>
  </aside>
<?php endif; ?>

<?php endwhile;
wp_reset_postdata();
?>
